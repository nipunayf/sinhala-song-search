import json


def split_values(arr, named):
    for line in arr:
        words = line.strip().split(' ')
        for word in words:
            named.append(word)


artist_names = []
writer_names = []
composer_names = []
genre_names = []

with open('./annotated_song_lyrics.json') as f:
    songs = json.load(f)
    for song in songs:
        if song['artist']:
            split_values(song['artist'], artist_names)
        if song['writer']:
            split_values(song['writer'], writer_names)
        if song['composer']:
            split_values(song['composer'], composer_names)
        if song['genre']:
            split_values(song['genre'], genre_names)

name_dict = {
    'artist_names': list(set(artist_names)),
    'writer_names': list(set(writer_names)),
    'composer_names': list(set(composer_names)),
    'genre_names': list(set(genre_names))
}
with open('../backend/res/entities.json', 'w') as f:
    json.dump(name_dict, f, ensure_ascii=False)
