from flask import Flask, request, send_file, render_template
from rembg import remove
from PIL import Image
import io

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'file' not in request.files:
        return "No file uploaded", 400

    file = request.files['file']
    input_image = Image.open(file.stream)
    output = io.BytesIO()

    # Remove background
    output_image = remove(input_image)
    output_image.save(output, format='PNG')
    output.seek(0)

    return send_file(output, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
