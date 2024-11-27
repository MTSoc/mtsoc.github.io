# This file has nothing to do with hosting the actual website on GitHub Pages
# It is just used to test the website locally on a development server
# Run this file and Flask will output the localhost URL where you can see view the page

from flask import Flask, render_template
app = Flask(__name__, static_folder='', template_folder='')

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/policy')
def policy():
    return render_template('policy.html')

@app.route('/tickets')
def tickets():
    return render_template('tickets.html')

app.run(host='0.0.0.0')