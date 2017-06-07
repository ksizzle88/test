from passlib.hash import sha256_crypt
from flask import flash, redirect,url_for


def add_user(form, db):
    from models import User

    username = form.username.data
    password = sha256_crypt.encrypt(str(form.password.data))
    email = form.email.data

    # If username is taken flash a message and redirect back to register
    if User.query.filter_by(username=username).first():
        flash("Sorry that username is taken")
        return redirect(url_for("register"))


    db.session.add(User(username, email, password))
    db.session.commit()
    flash("thankyou for signing up")
    return redirect(url_for("dashboard"))

def login(form, db):
