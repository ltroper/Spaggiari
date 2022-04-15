from flask import Blueprint
from app.models import db, User, Portfolio
from app.forms.add_portfolio import AddPortfolioForm

portfolio_routes = Blueprint('portfolio', __name__)

@portfolio_routes.route('/<int:id>', methods=["GET"])
def getPortfolio(id):
    portfolios = Portfolio.query.filter(Portfolio.user_id == id).all()
    return {"portfolios": [portfolio.to_dict() for portfolio in portfolios]}


@portfolio_routes.route('/add', methods=["POST"])
def addPortfolio():
    form = AddPortfolioForm()
    new_port = Portfolio(
        crypto_id=form.data["crypto_id"],
        user_id=form.data["user_id"],
        total_price=form.data["total_price"],
        quantity=form.data["quantity"]
    )
    db.session.add(new_port)
    db.session.commit()

    return new_port.to_dict()
