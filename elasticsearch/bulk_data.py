from elasticsearch import Elasticsearch, helpers
import json


def gen_data(song_array):
    for json_obj in song_array:
        yield {
            "_index": "sinhala-songs",
            "_source": {
                "title": json_obj['title'],
                "artist": json_obj['artist'],
                "composer": json_obj['composer'],
                "genre": json_obj['genre'],
                "writer": json_obj['writer'],
                "views": json_obj['views'],
                "metaphor": json_obj['metaphor']
            },
        }


with open('../corpus/annotated_song_lyrics.json') as f:
    es = Elasticsearch('http://localhost:9200')
    json_array = json.load(f)
    helpers.bulk(es, gen_data(json_array))
