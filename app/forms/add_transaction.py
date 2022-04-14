from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField
from wtforms.validators import DataRequired


class AddTransactionForm(FlaskForm):
    crypto_id = StringField("crypto_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    type = StringField("type", validators=[DataRequired()])
    price = FloatField("price", validators=[DataRequired()])
    quantity = FloatField("quantity", validators=[DataRequired()])
