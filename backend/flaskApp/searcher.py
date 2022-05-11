import json
import time
import flask
import os
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from rank_bm25 import *
from data_json_to_plaintext import data_json_to_plaintext

class Searcher:
    """
    Wraps the MeTA search engine and its rankers.
    """
    def __init__(self, input_json, data_file):
        self.input_json = input_json
        self.data_file = data_file
        if not os.path.exists(self.data_file) or os.path.getmtime(self.input_json) > os.path.getmtime(self.data_file):
            print(f'Creating {data_file}')
            data_json_to_plaintext(input_json, data_file)

    def getAllPosts(self):
        metadatalinks = []
        with open(self.input_json, 'r') as j:
            metadatalinks = json.loads(j.read())
        resp = flask.Response(json.dumps(metadatalinks))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

    def search(self, query):
        """
        Accept a JSON request and run the provided query with the specified
        ranker.
        """
        corpus = []
        with open(self.data_file, 'r') as f:
            corpus = f.readlines()
        metadatalinks = []
        with open(self.input_json, 'r') as j:
            metadatalinks = json.loads(j.read())

        # Only keep letters, numbers, spaces. TODO Handle MATH Mode (stuff in double $$)
        for i, doc in enumerate(corpus):
            new_str = re.sub("[^0-9a-zA-Z\s\-]", "", doc)
            corpus[i] = new_str

        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        for i, doc in enumerate(corpus):
            text_tokens = word_tokenize(doc)
            tokens_without_sw = [word.lower() for word in text_tokens if not word.lower() in stop_words]
            new_str = " ".join(tokens_without_sw)
            corpus[i] = new_str


        tokenized_corpus = [doc.split(" ") for doc in corpus]
        bm25 = BM25Okapi(tokenized_corpus)
        tokenized_query = query.lower().split(" ")
        docs = bm25.get_top_n(tokenized_query, metadatalinks, n=5)

        resp = flask.Response(json.dumps(docs))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

