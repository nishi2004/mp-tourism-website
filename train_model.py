import pandas as pd
from pymongo import MongoClient
from sklearn.ensemble import RandomForestClassifier
import pickle

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['Heartofindiatours']
collection = db['smart_budget']['planner']

# Load data from MongoDB into a DataFrame
data = list(collection.find({}, {"_id": 0}))
df = pd.DataFrame(data)

# Clean column names by converting them to strings and stripping whitespace
df.columns = [str(col).strip() for col in df.columns]

# Check columns to debug
print("Columns:", df.columns)

# Feature and label - Use actual column names from the print output
x = df[['Minimum Budget', 'Maximum Budget']]  # Replace with actual names if different
y = df['City Name']  # Replace with actual name if different

# Train a Random Forest model
model = RandomForestClassifier()
model.fit(x, y)

# Save the model
with open("city_predictor.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as city_predictor.pkl")