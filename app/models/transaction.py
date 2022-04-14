from .db import db
from flask_login import UserMixin


class Transaction(db.Model, UserMixin):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    crypto_id = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Float, nullable=False)


    user = db.relationship("User", back_populates="transactions")


    def to_dict(self):
        return {
            'id': self.id,
            'crypto_id': self.crypto_id,
            'user_id': self.user_id,
            'type': self.type,
            'price': self.price,
            'quantity': self.quantity
        }
