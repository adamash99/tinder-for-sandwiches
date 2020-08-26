from app import app
from flask import request, jsonify
from app.models import Sandwich


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/addwich', methods=['PUT'])
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


@app.route('/getwich', methods=['GET'])
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


@app.route('/votewich/<string:sand_id>/<string:vote>', methods=["PUT"])
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
