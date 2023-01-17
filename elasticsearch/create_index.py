import elasticsearch
from elasticsearch import Elasticsearch
from elasticsearch.client import IndicesClient

# Configure elasticsearch
client = IndicesClient(Elasticsearch('http://localhost:9200'))

# Define setting and mapping configurations
settings = {
    "analysis": {
        "analyzer": {
            "sinhala_text_analyzer": {
                "tokenizer": "standard",
                "filter": ["sinhala_stopword"]
            }
        },
        "filter": {
            "sinhala_stopword": {
                "type": "stop",
                "stopwords_path": "stopword/sinhala.txt"
            },
            'sinhala_stem': {
                "type": "stemmer_override",
                'rules_path': 'stemmer/sinhala.txt'
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
            "analyzer": "sinhala_text_analyzer"
        },
        "composer": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        },
        "genre": {
            "type": "keyword"
        },
        "writer": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        },
        "views": {
            "type": "integer"
        },
        "metaphor.line": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        },
        "metaphor.source": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        },
        "metaphor.target": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        },
        "metaphor.meaning": {
            "type": "text",
            "analyzer": "sinhala_text_analyzer"
        }
    }
}

# Create the elastic search index
res = client.create(index='sinhala-songs', mappings=mappings, settings=settings)
print(res)
