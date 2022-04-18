from flask import Blueprint
from app.forms.new_watchlist import NewWatchlistForm
from app.forms.add_watch_crypto import AddWatchCrypto
from app.models import db, Watchlist, Watchlist_crypto

watchlist_routes = Blueprint("watchlist", __name__)

@watchlist_routes.route('/<int:id>', methods=["GET"])
def getWatchlist(id):
    watchlists = Watchlist.query.filter(Watchlist.user_id == id).all()
    return {"watchlists": [watchlist.to_dict() for watchlist in watchlists]}

@watchlist_routes.route('/crypto/<int:id>', methods=["GET"])
def getWatchCrypto(id):
    watchCrypto = Watchlist_crypto.query.all()
    return {"watchCrypto": [watchlist.to_dict() for watchlist in watchCrypto]}


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

@watchlist_routes.route('/crypto', methods=["POST"])
def addWatchCrypto():
    form = AddWatchCrypto()
    watch_crypto = Watchlist_crypto(
        crypto_id=form.data["crypto_id"],
        watchlist_id=form.data["watchlist_id"]
    )
    db.session.add(watch_crypto)
    db.session.commit()

    return watch_crypto.to_dict()

@watchlist_routes.route("/edit", methods=["PUT"])
def edit_watchlist():
    form = NewWatchlistForm()
    watchlist = Watchlist.query.get(form.data["id"])
    watchlist.name = form.data["name"]
    watchlist.user_id = form.data["user_id"]


    db.session.add(watchlist)
    db.session.commit()
    return watchlist.to_dict()


@watchlist_routes.route('/delete/<int:id>', methods=["DELETE"])
def deleteWatchlist(id):
    deleted_watchlist = Watchlist.query.filter(Watchlist.id == id).first()
    Watchlist.query.filter(Watchlist.id == id).delete()
    db.session.commit()
    return {"deleted_watchlist": deleted_watchlist.to_dict()}
