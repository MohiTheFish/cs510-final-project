import json
import time
import flask

# import metapy
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from rank_bm25 import *
import re

class Searcher:
    """
    Wraps the MeTA search engine and its rankers.
    """
    def __init__(self):
        pass

    def readFile(self, fileName):
        fileObj = open(fileName, "r") #opens the file in read mode
        words = fileObj.read().splitlines() #puts the file into an array
        fileObj.close()
        return words

    def getAllPosts(self):
        metadatalinks = []
        json_file_path = "metadata.json"
        with open(json_file_path, 'r') as j:
            metadatalinks = json.loads(j.read())
        resp = flask.Response(json.dumps(metadatalinks))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

    def search(self, query):
        """
        Accept a JSON request and run the provided query with the specified
        ranker.
        """
        start = time.time()
        corpus = []
        with open('./data/data.dat', 'r') as f:
            corpus = f.readlines()
        metadatalinks = []
        json_file_path = "metadata.json"
        with open(json_file_path, 'r') as j:
            metadatalinks = json.loads(j.read())

        # Only keep letters, numbers, spaces. TODO Handle MATH Mode (stuff in double $$)
        for i, doc in enumerate(corpus):
            new_str = re.sub("[^0-9a-zA-Z\s]", "", doc)
            print(new_str)
            corpus[i] = new_str

        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        for i, doc in enumerate(corpus):
            text_tokens = word_tokenize(doc)
            tokens_without_sw = [word for word in text_tokens if not word.lower() in stop_words]
            new_str = " ".join(tokens_without_sw)
            corpus[i] = new_str


        tokenized_corpus = [doc.split(" ") for doc in corpus]
        bm25 = BM25Okapi(tokenized_corpus)
        tokenized_query = query.split(" ")
        docs = bm25.get_top_n(tokenized_query, metadatalinks, n=5)

        resp = flask.Response(json.dumps(docs))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

