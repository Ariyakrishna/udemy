from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up MongoDB client and database
client = MongoClient("mongodb://mongo:27017/")
db = client['userdb']
users_collection = db['usercollection']

# API route for login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Search for the user in MongoDB
    user = users_collection.find_one({"username": username, "password": password})

    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
