from flask import Flask, render_template, redirect, request, session
import json
from flask_session import Session

app = Flask(__name__)
usrData = {}
usrData['users'] = []
usrData['events'] = []
with open('data.json', 'w') as f:
 	json.dump(usrData, f)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

def searchjson(x):
    with open('data.json', 'r') as f:
        data = json.load(f)
        for i in data['users']:
            if i['username'] == x:
                return True
    return False

@app.route('/', methods=["GET", "POST"])
def login():
	session.clear()
	if request.method == "POST":
		username = request.form.get("username")
		session['user'] = username
		return redirect("/add")
	else:
		return render_template("login.html")

@app.route('/add', methods=["GET"])
def add():
	myEvents = []
	yourEvents = []
	with open('data.json', 'r') as output:
		data = json.load(output)
		user = session['user']
		for info in data['users']:
			if user == info['username']:
				myEvents.append(info['event'])
			else:
				yourEvents.append(info['event'])
	return render_template("add.html", myEvents=myEvents, yourEvents=yourEvents)

@app.route('/event', methods=["GET", "POST"])
def event():
	if request.method == "POST":
		eventName = request.form.get("eventName")
		date = request.form.get("datePicker")
		times_12 = request.form.getlist("12")
		times_24 = request.form.getlist("24")
		user = session['user']
		if len(times_24) == 0:
			time = times_12
		else:
			time = times_24 
		usrData['users'].append({'username': user, 'event': eventName, 'date': date, 'availability': time})
		with open('data.json', 'w') as f:
			json.dump(usrData, f, indent=2)
		return redirect("/add")
	else:
		return render_template("event.html")

if __name__ == '__main__':
	app.run(debug=True)








