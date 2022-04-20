from flask import Blueprint, jsonify
from flask_login import login_required
from app.forms.add_cash import AddCashForm
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/edit', methods=["PUT"])
@login_required
def addCash():
    form = AddCashForm()
    user = User.query.get(form.data["id"])
    if user.cash > 0:
        user.cash += form.data["cash"]
    else:
        user.cash = form.data["cash"]

    db.session.add(user)
    db.session.commit()
    return user.to_dict()
