from json import load

with open('sinhala_lyrics_data/annotated_song_lyrics.json') as f:
    docs = load(f)
    print(len(docs))
