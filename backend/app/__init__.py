from flask import Flask
from mongoengine import connect
import constants
import os

app = Flask(__name__, static_folder='./../../frontend/build', static_url_path='/')

app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

    
connect(db='tfw', host=constants.MONGO_KEY)

from app import routes