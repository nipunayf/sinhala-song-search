from elasticsearch import Elasticsearch
from elasticsearch.client import IndicesClient


def create_dictionary(f):
    word_dict = []
    for line in f:
        word_dict.append(line.rstrip().replace('\t', ' => '))
    return word_dict


# Configure elasticsearch
es = Elasticsearch('http://localhost:9200')
client = IndicesClient(es)

# Read the stop words
with open('stop_words.txt') as f:
    stop_words = [line.rstrip() for line in f.readlines()]

# Read the stem words
with open('stem_words.txt') as f:
    stem_words = create_dictionary(f)

# Read the synonym words
with open('synonym_words.txt') as f:
    synonym_words = create_dictionary(f)

# Define setting and mapping configurations
settings = {
    "index": {
        "number_of_shards": 1,
        "number_of_replicas": 1
    },
    "analysis": {
        "analyzer": {
            "sinhala_text_analyzer": {
                "type": "custom",
                "tokenizer": "standard",
                "filter": ["sinhala_stopword", "sinhala_synonym", "sinhala_stem"]
            }
        },
        "filter": {
            "sinhala_stopword": {
                "type": "stop",
                "stopwords": stop_words
                # "stopwords_path": "analyzer/stop_words.txt" # Use if you copy the analyzer to es config directory
            },
            'sinhala_stem': {
                "type": "stemmer_override",
                "rules": stem_words
                # 'rules_path': 'analyzer/stem.txt' # Use if you copy the analyzer to es config directory
            },
            "sinhala_synonym": {
                "type": "synonym",
                "synonyms": synonym_words,
                # "synonyms_path": "analysis/synonym.txt"  # Use if you copy the analyzer to es config directory
            }
        }
    }
}
mappings = {
    "properties": {
        "title": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        },
        "artist": {
            "type": "text",
            "analyzer": "standard",
            "fields": {
                "keyword": {
                    "type": "keyword"
                }
            }
        },
        "composer": {
            "type": "text",
            "analyzer": "standard",
            "fields": {
                "keyword": {
                    "type": "keyword"
                }
            }
        },
        "genre": {
            "type": "keyword"
        },
        "writer": {
            "type": "text",
            "analyzer": "standard",
            "fields": {
                "keyword": {
                    "type": "keyword"
                }
            }
        },
        "views": {
            "type": "integer"
        },
        "metaphor": {
            "type": "nested",
            "properties": {
                "line": {
                    "type": "text",
                    "analyzer": "sinhala_text_analyzer"
                },
                "source": {
                    "type": "text",
                    "analyzer": "sinhala_text_analyzer"
                },
                "target": {
                    "type": "text",
                    "analyzer": "sinhala_text_analyzer"
                },
                "meaning": {
                    "type": "text",
                    "analyzer": "sinhala_text_analyzer"
                }
            }
        }
    }
}

# Create the elastic search index
res = client.create(index='sinhala-songs', mappings=mappings, settings=settings)
print(res)
