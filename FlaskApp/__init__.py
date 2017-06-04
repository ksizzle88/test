from flask import Flask,render_template
from ContentManagement import Content

TOPIC_DICT = Content()

app = Flask(__name__)
app.debug = True

@app.route('/')
def homepage():
	try:
		return render_template("main.html")
	except Exception as e:
		return str(e)
    

@app.route('/ocr/')
def ocrpage():
    return render_template("ocr.html")

@app.route('/dashboard/')
def dashboard():
    return render_template("dashboard.html", TOPIC_DICT = TOPIC_DICT)

@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html")

@app.route('/slashboard/')		
def slashboard():
    try:
        return render_template("dashboard.html", TOPIC_DICT = shamwow)
    except Exception as e:
	    return render_template("error.html", error = str(e))

if __name__ == "__main__":
    app.run()
