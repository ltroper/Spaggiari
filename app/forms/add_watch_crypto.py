from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class AddWatchCrypto(FlaskForm):
    crypto_id = StringField("crypto_id", validators=[DataRequired()])
    watchlist_id = IntegerField("watchlist_id", validators=[DataRequired()])
