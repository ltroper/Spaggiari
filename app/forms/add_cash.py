from flask_wtf import FlaskForm
from wtforms import IntegerField, FloatField
from wtforms.validators import DataRequired


class AddCashForm(FlaskForm):
    id = IntegerField("id")
    cash = FloatField("cash", validators=[DataRequired()])
