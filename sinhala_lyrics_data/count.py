from json import load

with open('./annotated_song_lyrics.json') as f:
    docs = load(f)
    print(len(docs))
