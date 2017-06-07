from flask import Flask, render_template, flash, request, redirect, url_for
from helpers.ContentManagement import Content
from helpers.login import login
from helpers.register_form import RegistrationForm
from flask_sqlalchemy import SQLAlchemy
from controllers import add_user

TOPIC_DICT = Content()

app = Flask(__name__)
app.secret_key = "kschepis"
app.debug = True


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://keith:goodhand@localhost/pythonprogramming'
db = SQLAlchemy(app)


@app.route('/')
def homepage():
        flash("test flash")
        return render_template("main.html")

@app.route('/login/', methods = ["GET", "POST"])
def login_page():
    return login()

@app.route('/register/', methods = ["GET", "POST"])
def register():
    form = RegistrationForm(request.form)

    if request.method == "POST" and form.validate():
        return add_user(form, db)

    return render_template("Register.html", form = form)

@app.route('/ocr/')
def ocrpage():
    return render_template("ocr.html")

@app.route('/dashboard/')
def dashboard():
    return render_template("dashboard.html", TOPIC_DICT=TOPIC_DICT)

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")

@app.route('/slashboard/')
def slashboard():
    return render_template("dashboard.html", TOPIC_DICT=shamwow)

if __name__ == "__main__":
    app.run()
