from flask import jsonify

import app.api.get_schools
from app import app, db


@app.route('/api/get_schools', methods=['GET'])
def api_get_schools():
    return jsonify(get_schools.execute(db))
