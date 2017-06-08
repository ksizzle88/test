from passlib.hash import sha256_crypt
from flask import flash


def add_user(form, db):
    from models import User

    username = form.username.data
    password = sha256_crypt.encrypt(str(form.password.data))
    email = form.email.data

    # If username is taken flash a message and redirect back to register
    if User.query.filter_by(username=username).first():
        flash("Sorry that username is taken")
        return

    db.session.add(User(username, email, password))
    db.session.commit()
    flash("thankyou for signing up")

def check_login(form, db):
    from models import User

    username = form.username.data
    password = form.password.data
    user_data = User.query.filter_by(username=username).first()
    if user_data and sha256_crypt.verify(password, user_data.password):
        flash("you are logged in")
        return True
    else:
        flash("login failure")
        return False
# # def login(form, db):
#     from models import User
#
#
#     if request.method == "POST":
#         aun = str(request.form["username"])
#         apw = str(request.form["password"])
#         if aun == un and apw == pw:
#             return redirect(url_for("dashboard"))
#         else:
#             return render_template("login.html")
#             flash("incorrect username and password combo")
#     return render_template("Login.html")
