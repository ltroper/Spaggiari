from flask import Blueprint
from app.forms.new_watchlist import NewWatchlistForm
from app.models import db, Watchlist

watchlist_routes = Blueprint("watchlist", __name__)

@watchlist_routes.route('/<int:id>', methods=["GET"])
def getWatchlist(id):
    watchlists = Watchlist.query.filter(Watchlist.user_id == id).all()
    return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}


@watchlist_routes.route('/new', methods=["POST"])
def newWatchlist():
    form = NewWatchlistForm()
    watchlist = Watchlist(
        name=form.data["name"],
        user_id=form.data["user_id"],
    )
    db.session.add(watchlist)
    db.session.commit()

    return watchlist.to_dict()
