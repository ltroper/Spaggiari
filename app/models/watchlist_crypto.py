from .db import db
from flask_login import UserMixin


class Watchlist_crypto(db.Model, UserMixin):
    __tablename__ = 'watchlist_cryptos'

    id = db.Column(db.Integer, primary_key=True)
    crypto_id = db.Column(db.String(50), nullable=False)
    watchlist_id = db.Column(db.Integer, db.ForeignKey("watchlists.id", ondelete="CASCADE"), nullable=False)

    user = db.relationship("Watchlist", back_populates="watchlist_cryptos")

    def to_dict(self):
        return {
            'id': self.id,
            'crypto_id': self.crypto_id,
            'watchlist_id': self.watchlist_id,
        }
