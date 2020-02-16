from flask import Flask, render_template, redirect, request

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def login():
	if request.method == "POST":
		username = request.form.get("username")
		database = open("data.txt", "a+")
		database.write(username)
		return redirect("/add")
	else:
		return render_template("login.html")

@app.route('/add', methods=["GET"])
def add():
	return render_template("add.html")

@app.route('/event', methods=["GET", "POST"])
def event():
	if request.method == "POST":
		eventName = request.form.get("eventName")
		date = request.form.get("datePicker")
		times_12 = request.form.getlist("12")
		times_24 = request.form.getlist("24")
		return redirect("/add")
	else:
		return render_template("event.html")

if __name__ == '__main__':
	app.run(debug=True)

