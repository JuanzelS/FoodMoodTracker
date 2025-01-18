from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/foodmood"
mongo = PyMongo(app)
CORS(app)

@app.route('/api/meals', methods=['GET'])
def get_meals():
    meals = mongo.db.meals.find()
    result = [{'name': meal['name'], 'time': meal['time'], 'mood': meal['mood']} for meal in meals]
    return jsonify(result)

@app.route('/api/meals', methods=['POST'])
def add_meal():
    meal = request.get_json()
    mongo.db.meals.insert_one(meal)
    return jsonify(message="Meal logged successfully!"), 201

if __name__ == '__main__':
    app.run(port=5001)
