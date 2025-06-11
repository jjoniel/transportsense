import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv(".env.local")

df = pd.read_csv("data/urbanized_area_delay_growth.csv")
print(f"Read {len(df)} rows from CSV")

client = MongoClient(os.getenv("MONGODB_CONNECTION"))
db = client["database"]
collection = db["delay_growth"]

# Clear existing documents
collection.delete_many({})

documents = df.to_dict(orient="records")
collection.insert_many(documents)

print(f"Inserted {collection.count_documents({})} documents")
print("Sample document:", collection.find_one())