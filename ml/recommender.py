import sys
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_recommendations(criteria, all_songs_df):
    """
    Filters songs based on criteria and then finds recommendations if a title is provided.
    """
    
    # Start with the full DataFrame of all songs
    filtered_df = all_songs_df.copy()

    # --- 1. Filter the songs based on the provided criteria ---
    if 'mood' in criteria and criteria['mood']:
        filtered_df = filtered_df[filtered_df['mood'].str.lower() == criteria['mood'].lower()]

    if 'singer' in criteria and criteria['singer']:
        filtered_df = filtered_df[filtered_df['singer'].str.lower().str.contains(criteria['singer'].lower(), na=False)]

    if 'language' in criteria and criteria['language']:
        filtered_df = filtered_df[filtered_df['language'].str.lower() == criteria['language'].lower()]

    # --- ADDED: Filter by movie ---
    if 'movie' in criteria and criteria['movie']:
        # Use 'str.contains' for partial movie name matches
        filtered_df = filtered_df[filtered_df['movie'].str.lower().str.contains(criteria['movie'].lower(), na=False)]
    # --- END ADDED ---

    if filtered_df.empty:
        return []

    # --- 2. If a title is provided, find recommendations within the filtered list ---
    if 'title' in criteria and criteria['title']:
        if criteria['title'] not in filtered_df['title'].values:
            return []

        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(filtered_df['tags'].fillna(''))
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        indices = pd.Series(filtered_df.index, index=filtered_df['title']).drop_duplicates()
        
        try:
            idx = indices[criteria['title']]
            sim_scores = list(enumerate(cosine_sim[idx]))
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
            sim_scores = sim_scores[1:6] # Get top 5
            song_indices = [i[0] for i in sim_scores]
            return filtered_df.iloc[song_indices].to_dict(orient='records')
        except KeyError:
            return []

    # --- 3. If no title is provided, just return the filtered list of songs ---
    else:
        return filtered_df.head(20).to_dict(orient='records')


# Main execution block
if __name__ == '__main__':
    criteria = json.loads(sys.argv[1])
    all_songs_data = sys.stdin.read()
    songs_list = json.loads(all_songs_data)
    
    all_songs_df = pd.DataFrame(songs_list)

    # --- UPDATED: Add language and movie to the tags for the ML model ---
    # Ensure all columns are strings and fill missing values to prevent errors
    features = ['mood', 'genre', 'singer', 'language', 'movie']
    for feature in features:
        all_songs_df[feature] = all_songs_df[feature].astype(str).fillna('')

    all_songs_df['tags'] = all_songs_df['mood'] + ' ' + all_songs_df['genre'] + ' ' + all_songs_df['singer'] + ' ' + all_songs_df['language'] + ' ' + all_songs_df['movie']
    # --- END UPDATED ---

    recommendations = get_recommendations(criteria, all_songs_df)
    print(json.dumps(recommendations))
