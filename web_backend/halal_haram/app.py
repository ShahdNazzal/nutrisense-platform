from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import requests

app = Flask(__name__)

# رابط موديل Dropbox
MODEL_URL = "https://www.dropbox.com/scl/fi/xwh1k4kfnre1s8xlqqgpe/HALAL_HARAM_model.keras?rlkey=sd3fc82dygizzt6w0g7ewxlc8&dl=1"
MODEL_PATH = "HALAL_HARAM_model.keras"

# تحميل الموديل إذا مش موجود محلياً
if not os.path.exists(MODEL_PATH):
    print("Downloading model from Dropbox...")
    r = requests.get(MODEL_URL)
    with open(MODEL_PATH, "wb") as f:
        f.write(r.content)
    print("Model downloaded!")

# تحميل الموديل
model = load_model(MODEL_PATH)
IMG_SIZE = (224, 224)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    path = "temp.jpg"
    file.save(path)

    img = image.load_img(path, target_size=IMG_SIZE)
    img = image.img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    pred = model.predict(img)[0][0]
    result = "Haram" if pred > 0.5 else "Halal"

    return jsonify({"result": result})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
