import config
from app import app
from app.python_modules.db import connector

cursor = connector.connect(config.DB_NAME, config.DATA_CSV_DIR_PATH, config.SUBJECTS_JSON_PATH)
app.run(debug=True)
