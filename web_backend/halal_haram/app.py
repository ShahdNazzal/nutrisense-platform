from flask import Flask, request, render_template_string
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)

model = load_model("HALAL_HARAM_model.keras")
IMG_SIZE = (224, 224)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Result</title>
<style>
  body {{ display:flex; justify-content:center; align-items:center; height:100vh; font-size:5em; font-weight:bold; background-color:{bg}; color:white; }}
</style>
</head>
<body>{text}</body>
</html>
"""

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return "No file uploaded", 400

    file = request.files["file"]
    path = "temp.jpg"
    file.save(path)

    img = image.load_img(path, target_size=IMG_SIZE)
    img = image.img_to_array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    pred = model.predict(img)[0][0]
    if pred > 0.5:
        result_text = "Haram"
        bg_color = "#F44336"
    else:
        result_text = "Halal"
        bg_color = "#4CAF50"

    return render_template_string(HTML_TEMPLATE.format(bg=bg_color, text=result_text))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
