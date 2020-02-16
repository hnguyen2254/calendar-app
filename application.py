from flask import Flask, render_template, redirect, request

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])
def login():
	if request.method == "POST":
		username = request.form.get("username")
		print("TEST")
		return redirect("/add")
	else:
		return render_template("login.html")

@app.route('/add', methods=["POST"])
def add():
    return render_template("add.html")

if __name__ == '__main__':
    app.run(debug=True)
