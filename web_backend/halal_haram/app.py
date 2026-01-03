from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # مهم جداً للسماح للـ frontend بالتواصل

IMG_SIZE = (224, 224)
model = load_model("HALAL_HARAM_model.keras")
print("✅ Model loaded successfully")

def predict_image(img_path):
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    pred = model.predict(img_array)[0][0]
    return "Haram" if pred > 0.5 else "Halal"

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    os.makedirs("uploads", exist_ok=True)
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    result = predict_image(file_path)
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
