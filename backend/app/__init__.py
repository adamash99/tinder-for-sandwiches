from flask import Flask
from mongoengine import connect

app = Flask(__name__)

connect(db='tfw', host="mongodb+srv://adam:adam@cluster0.mr3ry.mongodb.net/tfw?authSource=admin&replicaSet=atlas-ubggmc-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")

from app import routes