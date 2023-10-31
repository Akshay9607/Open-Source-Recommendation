# import re
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# issue1 = "[Feature]: Create a page for \"Searching Algorithms\" resource page under competitive programming"
# issue2 = "[Feature]: add other option in cloud section of devops page and a separate page for aws"

# def preprocess_text(text):
#     text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
#     text = re.sub(r'[^A-Za-z]+', ' ', text)
#     text = text.lower()
#     return text

# issue1 = preprocess_text(issue1)
# issue2 = preprocess_text(issue2)

# print("Issue 1 => ",issue1)
# print("Issue 2 => ",issue2)

# tfidf_vectorizer = TfidfVectorizer()
# tfidf_matrix = tfidf_vectorizer.fit_transform([issue1, issue2])

# similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])

# print("Similarity between the two issues:", similarity[0][0])

from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import re

issue1 = "[Feature]: Create a page for \"Searching Algorithms\" resource page under competitive programming"
issue2 = "[Feature]: add other option in cloud section of devops page and a separate page for aws"

def preprocess_text(text):
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE)
    text = re.sub(r'[^A-Za-z]+', ' ', text)
    text = text.lower()
    words = word_tokenize(text)
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in words if word not in stopwords.words('english')]
    text = ' '.join(stemmed_words)
    return text

issue1 = preprocess_text(issue1)
issue2 = preprocess_text(issue2)
print(issue1)
print(issue2)
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
model = BertModel.from_pretrained("bert-base-uncased")

def preprocess_and_tokenize(text):
    text = text.lower()
    words = word_tokenize(text)
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in words if word not in stopwords.words('english')]
    lemmatizer = WordNetLemmatizer()
    lemmatized_words = [lemmatizer.lemmatize(word) for word in stemmed_words]
    text = ' '.join(lemmatized_words)
    tokens = tokenizer(text, padding=True, truncation=True, return_tensors="pt")
    return tokens

tokens1 = preprocess_and_tokenize(issue1)
tokens2 = preprocess_and_tokenize(issue2)

with torch.no_grad():
    embeddings1 = model(**tokens1)["last_hidden_state"]
    embeddings2 = model(**tokens2)["last_hidden_state"]

embeddings1 = embeddings1.squeeze(0)
embeddings2 = embeddings2.squeeze(0)

similarity = cosine_similarity(embeddings1, embeddings2)
print("Similarity between the two issues (BERT with Lemmatization and Stemming):", similarity[0][0])