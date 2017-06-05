from flask import Flask, render_template, flash, request, url_for, redirect
from Controllers.ContentManagement import Content
from Controllers.login import login


TOPIC_DICT = Content()

app = Flask(__name__)
app.debug = True
app.secret_key = "kschepis"


@app.route('/')
def homepage():
        flash("test flash")
        return render_template("main.html")

@app.route('/login/', methods = ["GET", "POST"])
def login_page():
    return login()

@app.route('/register/', methods = ["GET", "POST"])
def register():
        return render_template("Register.html")

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
