from flask import render_template, request, url_for, redirect

def login():
    un = "admin"
    pw = "password"

    if request.method == "POST":
        aun = str(request.form["username"])
        apw = str(request.form["password"])
        if aun == un and apw == pw:
           return redirect(url_for("dashboard"))
        else:
            return render_template("login.html")
            flash("incorrect username and password combo")
    return render_template("Login.html")
