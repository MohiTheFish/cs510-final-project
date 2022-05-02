from flask import Flask, request
app = Flask(__name__, static_url_path='')
import json
import sys


from searcher import Searcher

@app.route('/results', methods=['GET'])
def getsearch():
    name = request.args.get('query')
    print(name)
    return app.searcher.search(name)

def server(config):
    app.searcher = Searcher(config)
    return app

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: {} config.toml".format(sys.argv[0]))
        sys.exit(1)

    server(sys.argv[1]).run(debug=True)
