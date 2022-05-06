import json
import time
import flask

import metapy

class Searcher:
    """
    Wraps the MeTA search engine and its rankers.
    """
    def __init__(self, cfg):
        """
        Create/load a MeTA inverted index based on the provided config file and
        set the default ranking algorithm to Okapi BM25.
        """
        self.idx = metapy.index.make_inverted_index(cfg)
        self.default_ranker = metapy.index.OkapiBM25()

    def readFile(self, fileName):
        fileObj = open(fileName, "r") #opens the file in read mode
        words = fileObj.read().splitlines() #puts the file into an array
        fileObj.close()
        return words

    def search(self, request):
        """
        Accept a JSON request and run the provided query with the specified
        ranker.
        """
        start = time.time()
        query = metapy.index.Document()
        query.content(request)
        # ranker_id = request['ranker']
        # try:
        #     ranker = getattr(metapy.index, ranker_id)()
        # except:
        #     print("Couldn't make '{}' ranker, using default.".format(ranker_id))
        #     ranker = self.default_ranker
        ranker = metapy.index.OkapiBM25()
        response = {'query': request, 'results': []}
        top_docs = ranker.score(self.idx, query, num_results=5)

        metadatalinks = self.readFile("metadata.txt")
        for num, (d_id, _) in enumerate(top_docs):
            content = self.idx.metadata(d_id).get('content')
            print("{}. {}\n".format(d_id, content))
            response['results'].append({
                'name': metadatalinks[d_id],
                'content': content
            })
        response['elapsed_time'] = time.time() - start
        resp = flask.Response(json.dumps(response, indent=2))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

