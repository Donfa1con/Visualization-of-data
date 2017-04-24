from flask import jsonify, request

from app import app, db
from app.api import get_years, \
    get_year_info, \
    get_subjects, \
    get_trends, \
    get_trend_score, \
    get_trends_info


@app.route('/api/get_years', methods=['POST'])
def api_get_years():
    return jsonify(get_years.execute(db))


@app.route('/api/get_subjects', methods=['POST'])
def api_get_subjects():
    return jsonify(get_subjects.execute(db, request.form.getlist('years[]')))


@app.route('/api/get_trends', methods=['POST'])
def api_get_trends():
    return jsonify(get_trends.execute(db))


@app.route('/api/get_trend_score', methods=['POST'])
def api_get_trend_score():
    return jsonify(get_trend_score.execute(
        db,
        request.form.getlist('years[]'),
        request.form.getlist('subjects[]'),
        request.form['trend']
    )
    )


@app.route('/api/get_year_info', methods=['POST'])
def api_get_year_info():
    return jsonify(get_year_info.execute(db,
                                         request.form['trend'],
                                         int(request.form['year']),
                                         request.form['exam_type'],
                                         request.form['subjects']))


@app.route('/api/get_trends_info', methods=['POST'])
def api_get_trends_info():
    return jsonify(get_trends_info.execute(db,
                                           request.form['trend'],
                                           request.form['subjects']))
