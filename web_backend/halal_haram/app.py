from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
CORS(app)

model = load_model("HALAL_HARAM_model.keras")
IMG_SIZE = (224, 224)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "no file"}), 400

    file = request.files["file"]
    path = "temp.jpg"
    file.save(path)

    img = image.load_img(path, target_size=IMG_SIZE)
    img = image.img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    pred = model.predict(img)[0][0]
    result = "Haram" if pred > 0.5 else "Halal"

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(port=5000)
