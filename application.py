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

@app.route('/availability/<eventName>', methods=["GET", "POST"])
def availability(eventName):
	if request.method == "POST":
		user = session['user']
		avail12 = request.form.getlist('12time')
		avail24 = request.form.getlist('24time')
		if len(avail24) == 0:
			avail = avail12
		else:
			avail = avail24
		usrData['events'].append({'event': eventName,'attending': user, 'availability': avail})
		with open('data.json', 'w') as f:
			json.dump(usrData, f, indent=2)
		return redirect('/add')
	else:
		return render_template("availability.html", eventName=eventName)

@app.route('/eventstatus/<eventName>')
def eventstatus(eventName):
	attArray = []
	availArray = []
	user =  session['user']	
	with open('data.json', 'r') as output:
		data = json.load(output)
		if len(data['events']) == 0:
			return render_template("noattend.html")
		else:
			for info in data['users']:
				if info['username'] == user and info['event'] == eventName:
					myAvail = info['availability']
			for info in data['events']:
				if info['event'] == eventName:
					attArray.append(info['attending'])
					availArray.append(info['availability'])
	return render_template("eventstatus.html", eventName = eventName, attending = attArray, availability=availArray, myAvail=myAvail)

if __name__ == '__main__':
	app.run(debug=True)








