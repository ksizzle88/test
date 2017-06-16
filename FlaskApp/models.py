from __init__ import db

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False  )
    email = db.Column(db.String(120), unique=True,nullable=False)
    password = db.Column(db.String(100),nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.username


class Invoice(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date(), unique=True, nullable=False  )
    amount = db.Column(db.Float(), unique=True, nullable=False)

    def __init__(self, date, amount):
        self.date = date
        self.amount = amount

    def __repr__(self):
        return '<date %r>' % self.date
