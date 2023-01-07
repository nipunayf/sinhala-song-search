from json import load, dump

with open('../crawler/output.json') as f:
    data = load(f)

with open('./song_lyrics.json', 'w') as f:
    dump(data, f, ensure_ascii=False)
