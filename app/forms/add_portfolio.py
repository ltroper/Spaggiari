from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField
from wtforms.validators import DataRequired


class AddPortfolioForm(FlaskForm):
    crypto_id = StringField("crypto_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    total_price = FloatField("total_price", validators=[DataRequired()])
    quantity = FloatField("quantity", validators=[DataRequired()])
