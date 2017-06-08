from flask import render_template, request, url_for, redirect
from flask_wtf import Form
from wtforms import StringField, PasswordField


class LoginForm(Form):
    username = StringField('Username')
    password = PasswordField('Password')




def login():
    aun = str(request.form["username"])
    apw = str(request.form["password"])
    if aun == un and apw == pw:
       return True
    else:
        flash("incorrect username and password combo")
        return False
    return render("Login.html")
