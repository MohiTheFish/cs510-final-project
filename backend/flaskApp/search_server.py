from flask import Flask, request
app = Flask(__name__, static_url_path='')
import argparse
from searcher import Searcher
import os

def parse_arguments(parser):
    parser.add_argument(
        "input_json", type=str, help='The json file consisting of the post information (title, body, comments, etc.)',
    )
    parser.add_argument(
        "--data_file", type=str, default='./data.dat',
        help="The output file after converting the input_json to plaintext. If data_file does not exist, or if input_json was modified more recently than data_file, the data_file will be updated"
    )
    args = parser.parse_args()
    
    if args.input_json:
        assert os.path.exists(args.input_json), f'input_json "{args.input_json}" not found. Check your file name'

    data_file = args.data_file
    input_json = args.input_json
    return input_json, data_file

@app.route('/results', methods=['GET'])
def getsearch():
    name = request.args.get('query')
    return app.searcher.search(name)

@app.route('/allposts', methods=['GET'])
def getallposts():
    return app.searcher.getAllPosts()

def server(input_json, data_file):
    app.searcher = Searcher(input_json, data_file)
    return app

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
		formatter_class=argparse.ArgumentDefaultsHelpFormatter
	)
    input_json, data_file = parse_arguments(parser)
    server(input_json, data_file).run(host="0.0.0.0", debug=True)
