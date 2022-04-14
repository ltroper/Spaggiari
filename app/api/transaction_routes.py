from flask import Blueprint
from app.models import db, User, Transaction
from app.forms.add_transaction import AddTransactionForm

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/add', methods=["POST"])
def addTransaction():
    form = AddTransactionForm()
    new_trans = Transaction(
        crypto_id=form.data["crypto_id"],
        user_id=form.data["user_id"],
        type=form.data["type"],
        price=form.data["price"],
        quantity=form.data["quantity"]
    )
    db.session.add(new_trans)
    db.session.commit()

    return new_trans.to_dict()
