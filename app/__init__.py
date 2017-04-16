from flask import Flask

import config
from app.python_modules.db import connector

app = Flask(__name__)
app.config.from_object('config')
db = connector.connect(config.DB_NAME, config.DATA_CSV_DIR_PATH, config.SUBJECTS_JSON_PATH)

from app import views, api
