from flask import Flask, render_template, flash, request, redirect, url_for, session, jsonify
from helpers.ContentManagement import Content
from helpers.login import login, LoginForm
from helpers.register_form import RegistrationForm
from flask_sqlalchemy import SQLAlchemy
from controllers import add_user, check_login, add_invoice
from mlb_db_models import *
from sqlalchemy.orm import sessionmaker, scoped_session
import  matplotlib
matplotlib.use("agg")
from matplotlib import pylab as plt
from matplotlib import patches

import pandas
import mpld3
import base64
import io


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


@app.route('/', methods= ['GET','POST'])
def homepage():
    from mlb_db_models import *
    from sqlalchemy.orm import sessionmaker, scoped_session

    engine = create_engine("mysql://keith:goodhand@localhost/mlb_data")
    # db = engine.connect()
    session = scoped_session(sessionmaker(engine, autoflush=False))
    players = session.query(Player).all()

    return render("MLB.html", players=players)


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

@app.route('/details/')
def detailspage():
    return render("Details.html")

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
    return jsonify(result=a + b)


@app.route('/sidebar/')
def side():
    return render_template("sidebar.html")


@app.route('/_save_data')
def save_data():
    add_invoice(request, db);
    return "completed"

@app.route('/_get_player_data')
def get_player_data():
    engine = create_engine("mysql://keith:goodhand@localhost/mlb_data")
    # db = engine.connect()
    session = scoped_session(sessionmaker(engine, autoflush=False))

    n = request.args.get('player', 'fail', type=str)
    n = n.split(' ', 1)
    first_name = n[0]
    last_name = n[1]
    p = session.query(Player).filter(Player.first_name == first_name).filter(Player.last_name == last_name).first()


    def get_plot(player_id):

        atbats = session.query(At_bat).filter(At_bat.batter == player_id).all()
        ab_list = [x.id for x in atbats]
        query = session.query(Pitch).filter(Pitch.at_bat.in_(ab_list))
        df = pandas.read_sql(query.statement, query.session.bind)

        strikes = df[(df.des == "Called Strike")]
        balls = df[(df.des == 'Ball') | (df.des == "Intent Ball")]
        xs = strikes.px
        ys = strikes.pz
        xb = balls.px
        yb = balls.pz
        szt = df.sz_top.mean()
        szb = df.sz_bot.mean()
        plate_edge = 17.0 / 2.0 / 12.0
        bl = (-plate_edge, szb)
        h = float(szt - szb)
        w = float(plate_edge * 2)
        fig = plt.figure()
        ax1 = fig.add_subplot(111, aspect='equal')
        ax1.add_patch(patches.Rectangle(bl, w, h, fill=False))
        plt.scatter(xb, yb, s=1, marker=u'x', c='blue')
        plt.scatter(xs, ys, s=1, marker=u'o', c='red')
        f = io.BytesIO()
        plt.savefig(f, format="png", facecolor=(0.95, 0.95, 0.95))
        encoded_img = base64.b64encode(f.getvalue()).decode('utf-8').replace('\n', '')
        f.close()

        return (encoded_img)
    plot = get_plot(p.id)
    plot = '<img src="data:image/png;base64,%s" />' % plot





    return jsonify(result=plot)





@app.route('/drop/')
def drop():
    return render("dropzone.html")

if __name__ == "__main__":
    app.run()

