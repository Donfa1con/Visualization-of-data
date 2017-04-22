from flask import jsonify, request

from app.api import get_years, get_year_info, get_subjects, get_average_score
from app import app, db


@app.route('/api/get_years', methods=['POST'])
def api_get_years():
    return jsonify(get_years.execute(db))


@app.route('/api/get_subjects', methods=['POST'])
def api_get_subjects():
    return jsonify(get_subjects.execute(db, int(request.form['year'])))


@app.route('/api/get_year_info', methods=['POST'])
def api_get_year_info():
    return jsonify(get_year_info.execute(db,
                                request.form['trend'],
                                int(request.form['year']),
                                request.form['subjects']))
