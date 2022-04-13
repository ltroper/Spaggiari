from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class AddCashForm(FlaskForm):
    id = IntegerField("id")
    cash = IntegerField("cash", validators=[DataRequired()])
