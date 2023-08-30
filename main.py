# You can run this file to test the website locally

from flask import Flask, render_template
app = Flask(__name__, static_folder='', template_folder='')

@app.route('/')
def root():
    return render_template('index.html')

app.run(host='0.0.0.0')