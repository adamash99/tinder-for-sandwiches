from flask import Flask
from mongoengine import connect
import constants

app = Flask(__name__)

connect(db='tfw', host= constants.MONGO_KEY)

from app import routes