# ml/recommender.py
import sys
import json
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# --- Global cache for model ---
model = None

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

def load_model():
    global model
    if model is None:
        model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

def initialize_embeddings(songs_list):
    """MODE: init — prepare embeddings based on mood, singer, genre, movie."""
    load_model()
    df = pd.DataFrame(songs_list)

    required_cols = {'_id', 'mood', 'genre', 'singer', 'language', 'movie'}
    for col in required_cols:
        if col not in df.columns:
            df[col] = ''

    df.fillna('', inplace=True)

    # ✅ No title here — only mood, singer, genre, movie, language
    df['combined_tags'] = (
        "mood: " + df['mood'].astype(str) + " " +
        "genre: " + df['genre'].astype(str) + " " +
        "singer: " + df['singer'].astype(str) + " " +
        "movie: " + df['movie'].astype(str) + " " +
        "language: " + df['language'].astype(str)
    )

    embeddings = model.encode(df['combined_tags'].tolist(), show_progress_bar=False)
    embedding_map = {row['_id']: emb.tolist() for _, row, emb in zip(df.index, df.to_dict('records'), embeddings)}

    print(json.dumps(embedding_map, cls=NpEncoder))

def get_fast_recommendations(data):
    """MODE: recommend — recommend songs based on mood/singer/genre/movie similarity."""
    seed_songs = data.get('seedSongs', [])
    all_songs_df = pd.DataFrame(data['allSongs'])
    embeddings_map = data['embeddings']

    if not seed_songs:
        print(json.dumps([]))
        return

    all_songs_df['embedding'] = all_songs_df['_id'].map(embeddings_map)
    all_songs_df.dropna(subset=['embedding'], inplace=True)

    embeddings_matrix = np.array(all_songs_df['embedding'].tolist())

    seed_song_ids = {s['_id'] for s in seed_songs}
    seed_moods = {s.get('mood', '').lower() for s in seed_songs if s.get('mood')}
    seed_genres = {s.get('genre', '').lower() for s in seed_songs if s.get('genre')}
    seed_artists = {s.get('singer', '').lower() for s in seed_songs if s.get('singer')}
    seed_movies = {s.get('movie', '').lower() for s in seed_songs if s.get('movie')}

    all_recommendations = []

    for seed in seed_songs:
        seed_embedding = embeddings_map.get(seed['_id'])
        if not seed_embedding:
            continue

        sim_scores = cosine_similarity([seed_embedding], embeddings_matrix)[0]
        top_idx = np.argsort(sim_scores)[::-1][:80]  # Bigger pool for filtering

        recs = all_songs_df.iloc[top_idx].copy()
        recs['similarity'] = sim_scores[top_idx]
        all_recommendations.extend(recs.to_dict('records'))

    if not all_recommendations:
        print(json.dumps([]))
        return

    recs_df = pd.DataFrame(all_recommendations)

    # Remove seed songs themselves
    recs_df = recs_df[~recs_df['_id'].isin(seed_song_ids)]

    # ✅ Strict mood/genre/movie/singer filtering
    recs_df = recs_df[
        recs_df['mood'].str.lower().isin(seed_moods) |
        recs_df['genre'].str.lower().isin(seed_genres) |
        recs_df['singer'].str.lower().isin(seed_artists) |
        recs_df['movie'].str.lower().isin(seed_movies)
    ]

    # Keep up to 2 songs per singer
    recs_df = recs_df.groupby('singer').head(2)

    # Sort by similarity
    recs_df = recs_df.sort_values('similarity', ascending=False)

    # Keep best 35 matches
    recs_df = recs_df.head(35)

    # Clean NaN
    recs_df.replace({np.nan: None}, inplace=True)

    final_recs = recs_df.drop(columns=['embedding', 'similarity'], errors='ignore').to_dict(orient='records')

    print(json.dumps(final_recs, cls=NpEncoder))

if __name__ == '__main__':
    try:
        mode = sys.argv[1]
        input_str = sys.stdin.read()
        if not input_str:
            print(json.dumps({"error": "No input data received."}), file=sys.stderr)
            print(json.dumps([]))
            sys.exit()

        input_data = json.loads(input_str)

        if mode == 'init':
            initialize_embeddings(input_data)
        elif mode == 'recommend':
            get_fast_recommendations(input_data)
        else:
            print(json.dumps({"error": f"Invalid mode: {mode}"}), file=sys.stderr)
            print(json.dumps([]))

    except Exception as e:
        print(f"Python Script Error: {e}", file=sys.stderr)
        print(json.dumps([]))
