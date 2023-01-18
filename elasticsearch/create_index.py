import elasticsearch
from elasticsearch import Elasticsearch
from elasticsearch.client import IndicesClient

# Configure elasticsearch
client = IndicesClient(Elasticsearch('http://localhost:9200'))

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
                "filter": ["sinhala_stopword", "sinhala_stem"]
            }
        },
        "filter": {
            "sinhala_stopword": {
                "type": "stop",
                "stopwords_path": "analyzer/stop.txt"
            },
            'sinhala_stem': {
                "type": "stemmer_override",
                'rules_path': 'analyzer/stem.txt'
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
            "analyzer": "standard"
        },
        "composer": {
            "type": "text",
            "analyzer": "standard"
        },
        "genre": {
            "type": "keyword"
        },
        "writer": {
            "type": "text",
            "analyzer": "standard"
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
