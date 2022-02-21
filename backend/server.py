from flask import Flask, request, jsonify
from mongoengine import connect
from .constants import MONGO_KEY
import os
from models import Sandwich


app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    
connect(db='tfw', host=MONGO_KEY)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/test')
def test():
    return "hello world"

@app.route('/api/addwich', methods=['PUT'])
def add_sandwich():
    data = request.get_json()
    sandwich = Sandwich(
        mains=data['mains'],
        condiments=data['condiments'],
        bread=data['bread'],
        yes_votes=0,
        no_votes=0
    )
    try:
        saved = sandwich.save(force_insert=True)
    except:
        return "Error"
    return "Sandwich added to DB"


@app.route('/api/getwich', methods=['GET'])
def get_sandwiches():
    wiches = []
    for wich in Sandwich.objects:
        wiches.append({
            "id": str(wich.id),
            "mains": wich['mains'],
            "condiments": wich['condiments'],
            "bread": wich['bread'],
            "yes_votes": wich['yes_votes'],
            "no_votes": wich['no_votes']
        })
    import random
    random.shuffle(wiches)
    return jsonify(wiches)


@app.route('/api/votewich/<string:sand_id>/<string:vote>', methods=["PUT"])
def vote_sandwiches(sand_id, vote):
    sands = Sandwich.objects(id=sand_id)
    if len(sands) > 1:
        return "error"

    sandwich = sands[0]
    sandwich[vote + "_votes"] = sandwich[vote + "_votes"] + 1
    try:
        saved = sandwich.save()
    except:
        return "Error"
    return "Sandwich added to DB"

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))