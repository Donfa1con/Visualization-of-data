from flask import jsonify, request

from app import app, db
from app.modules.data import get_years, get_subjects, get_trend_score, get_exam_types, \
    get_trends


def init():
    @app.route('/api/get_years', methods=['POST'])
    def api_get_years():
        return jsonify(get_years.execute(db))

    @app.route('/api/get_exam_types', methods=['POST'])
    def api_get_exam_types():
        return jsonify(get_exam_types.execute(db))

    @app.route('/api/get_subjects', methods=['POST'])
    def api_get_subjects():
        return jsonify(get_subjects.execute(db, request.form.getlist('years[]')))

    @app.route('/api/get_trends', methods=['POST'])
    def api_get_trends():
        return jsonify(get_trends.execute(db))

    @app.route('/api/get_trend_score', methods=['POST'])
    def api_get_trend_score():
        return jsonify(
            get_trend_score.execute(
                db,
                request.form.getlist('years[]'),
                request.form.getlist('subjects[]'),
                request.form.getlist('exam_types[]'),
                request.form['trend']
            )
        )
