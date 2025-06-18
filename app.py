from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient

app = Flask(__name__)

# --------- Smart Budget Planner Functionality -----------
def suggest_cities(min_budget, max_budget):
    try:
        client = MongoClient("localhost:27017")
        db = client.smart_budget
        collection = db.planner

        query = {
            "Minimum Budget": {"$lte": max_budget},
            "Maximum Budget": {"$gte": min_budget}
        }

        cities = list(collection.find(query, {
            "_id": 0,
            "City Name": 1,
            "Minimum Budget": 1,
            "Maximum Budget": 1
        }))

        return cities

    except Exception as e:
        print(f"Error querying database: {e}")
        return []

# --------- Website Pages Routes ------------
@app.route('/')
def home():
    return render_template('index.html')  # your home page

# --------- Smart Budget Planner Route ------------
@app.route('/smart-budget', methods=['GET', 'POST'])
def smart_budget():
    suggestions = []
    error = None

    if request.method == 'POST':
        try:
            min_budget = float(request.form['min_budget'])
            max_budget = float(request.form['max_budget'])

            if min_budget <= max_budget:
                suggestions = suggest_cities(min_budget, max_budget)
            else:
                error = "Minimum budget must be less than or equal to maximum budget."

        except ValueError:
            error = "Please enter valid numbers."

    return render_template('budget.html', suggestions=suggestions, error=error)


# ------------- Running -------------
if __name__ == "__main__":
    app.run(debug=True)
