# %% [markdown]
# Importing Libraries

# %%
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.pipeline import Pipeline
from sklearn.tree import DecisionTreeClassifier
import joblib

# %% [markdown]
# Reading Datasets

# %%
fake = pd.read_csv("./Fake.csv")
fake.shape

# %%
true = pd.read_csv("./True.csv")
true.shape

# %% [markdown]
# Data cleaning and Preprocessing

# %%
# Adding flag to track fake and real
fake['target'] = 'fake'
true['target'] = 'true'

# %%
# Concatenate dataframes
data = pd.concat([fake, true]).reset_index(drop = True)
data.shape

# %%
# Shuffling the data
from sklearn.utils import shuffle
data = shuffle(data)
data = data.reset_index(drop=True)

# %%
# Checking the data
data.head()

# %%
# Removing the date
data.drop(["date"],axis=1,inplace=True)
data.head()

# %%
# Removing the title
data.drop(["title"],axis=1,inplace=True)
data.head()

# %%
# Converting to lowercase

data['text'] = data['text'].apply(lambda x: x.lower())
data.head()

# %%
# Removing punctuation

import string
def punctuation_removal(text):
    all_list = [char for char in text if char not in string.punctuation]
    clean_str = ''.join(all_list)
    return clean_str
data['text'] = data['text'].apply(punctuation_removal)

data.head()

# %%
# Removing stopwords

import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
stop = stopwords.words('english')
data['text'] = data['text'].apply(lambda x: ' '.join([word for word in x.split() if word not in (stop)]))

data.head()

# %% [markdown]
# Data Exploration

# %% [markdown]
# Preprocessing Progress Check

# %% [markdown]
# Wordcloud for Fake News

# %%
# Most frequent words counter
from nltk import tokenize

token_space = tokenize.WhitespaceTokenizer()

def counter(text, column_text, quantity):
    all_words = ' '.join([text for text in text[column_text]])
    token_phrase = token_space.tokenize(all_words)
    frequency = nltk.FreqDist(token_phrase)
    df_frequency = pd.DataFrame({"Word": list(frequency.keys()),
                                   "Frequency": list(frequency.values())})
    df_frequency = df_frequency.nlargest(columns = "Frequency", n = quantity)
    plt.figure(figsize=(12,8))
    ax = sns.barplot(data = df_frequency, x = "Word", y = "Frequency", color = 'blue')
    ax.set(ylabel = "Count")
    plt.xticks(rotation='vertical')
    plt.show()

# %% [markdown]
# Modelling

# %% [markdown]
# Dimensionality Reduction (Splitting, Training and Testing)

# %%
# Split the data
X_train,X_test,y_train,y_test = train_test_split(data['text'], data.target, test_size=0.2, random_state=42)

# %% [markdown]
# Decision Tree

# %%
from sklearn.tree import DecisionTreeClassifier

# Vectorizing and applying TF-IDF
pipe = Pipeline([('vect', CountVectorizer()),
                 ('tfidf', TfidfTransformer()),
                 ('model', DecisionTreeClassifier(criterion= 'entropy',
                                           max_depth = 5,
                                           splitter='best',
                                           random_state=42))])
# Fitting the model
model = pipe.fit(X_train, y_train)

# Accuracy
prediction = model.predict(X_test)
print("accuracy: {}%".format(round(accuracy_score(y_test, prediction)*100,2)))

# %% [markdown]
# Save the model

# %%
joblib.dump(model, 'model.pkl')
print("Model saved as model.pkl")
# %%
