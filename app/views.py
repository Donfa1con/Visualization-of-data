from flask import render_template
from app import app
from app.get_tables_data import read_the_file


@app.route('/')
def index():
    ege_data = read_the_file('app/static/Tables_data.json')
    return render_template("index.html",
    						ege_data=ege_data)

