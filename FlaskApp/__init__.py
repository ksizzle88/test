from flask import Flask, render_template, flash, request, redirect, url_for, session, jsonify
from helpers.ContentManagement import Content
from helpers.login import login, LoginForm
from helpers.register_form import RegistrationForm
from flask_sqlalchemy import SQLAlchemy
from controllers import add_user, check_login, add_invoice
import sys

def render(url_path, **kwargs):
    stuff = {"reg_form": RegistrationForm(request.form),
             "login_form": LoginForm(request.form),}
    stuff.update(kwargs)

    # stuff.update(kwargs)
    return render_template(url_path, **stuff)


TOPIC_DICT = Content()

app = Flask(__name__)
app.secret_key = "kschepis"
app.debug = True


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://keith:goodhand@localhost/pythonprogramming'
db = SQLAlchemy(app)


@app.route('/')
def homepage():
        flash("test flash")
        return render("main.html")


@app.route('/login/', methods=["GET", "POST"])
def login_page():
    form = LoginForm()
    if request.method == "POST":
        if check_login(form, db):
            session["logged in"] = True
            session["username"] = form.username.data
            return render("dashboard.html", TOPIC_DICT=TOPIC_DICT)
    return render("Login.html")


@app.route('/register/', methods=["GET", "POST"])
def register():
    form = RegistrationForm(request.form)

    if request.method == "POST" and form.validate():
        add_user(form, db)
        return render("Register.html")

    return render("Register.html")


@app.route('/ocr/')
def ocrpage():
    return render("ocr.html")


@app.route('/dashboard/')
def dashboard():
    return render("dashboard.html", TOPIC_DICT=TOPIC_DICT)


@app.errorhandler(404)
def page_not_found(e):
    return render("404.html")


@app.route('/slashboard/')
def slashboard():
    return render_template("dashboard.html", TOPIC_DICT=shamwow)


@app.route('/session/')
def session_page():
    if "username" in session:
        return session["username"]
    else:
        return "you are not logged in"


@app.route('/logout/')
def logout():
    session.clear()
    return redirect("/")


@app.route('/ajax/')
def ajax_test():
    return render('ajax_test.html')


@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a * b)


@app.route('/sidebar/')
def side():
    return render_template("sidebar.html")


@app.route('/_save_data')
def save_data():
    add_invoice(request, db);
    return "completed"


@app.route('/drop/')
def drop():
    return render("dropzone.html")

if __name__ == "__main__":
    app.run()

