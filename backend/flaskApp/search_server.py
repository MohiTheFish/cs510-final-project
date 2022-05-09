from flask import Flask, request
app = Flask(__name__, static_url_path='')
import sys


from searcher import Searcher

@app.route('/results', methods=['GET'])
def getsearch():
    name = request.args.get('query')
    return app.searcher.search(name)

@app.route('/allposts', methods=['GET'])
def getallposts():
    return app.searcher.getAllPosts()

def server():
    app.searcher = Searcher()
    return app

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: {} config.toml".format(sys.argv[0]))
        sys.exit(1)

    server().run(host="0.0.0.0", debug=True)
