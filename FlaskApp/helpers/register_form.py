from flask_wtf import Form
from wtforms import TextField, PasswordField, BooleanField, StringField
from wtforms import validators
from passlib.hash import sha256_crypt


class RegistrationForm(Form):
    username = StringField('Username', [validators.Length(min=4, max=20)])
    email = StringField('Email Address', [validators.Length(min=6, max=50)])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')])

    confirm = PasswordField('Repeat Password')
    accept_tos = BooleanField('I accept the Terms of Service and Privacy Notice',
    [validators.DataRequired()])