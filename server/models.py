from mongoengine import (
    Document,
    ListField,
    StringField,
    IntField,
    ObjectIdField
)

class Sandwich(Document):
    mains = ListField(StringField())
    condiments = ListField(StringField())
    bread = StringField()
    yes_votes = IntField()
    no_votes = IntField()
    meta = {'collection': 'sandwiches'}