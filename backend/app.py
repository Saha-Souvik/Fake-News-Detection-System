from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["https://fake-news-detection-user-interface.vercel.app"], methods=["POST"], allow_headers=["Content-Type"])  # Enable CORS

# Load model
model = joblib.load("model.pkl")

# Route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        news_text = data.get("text", "")

        if not news_text:
            return jsonify({"error": "No text provided"}), 400

        prediction = model.predict([news_text])[0]
        return jsonify({"result": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
