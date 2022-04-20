# Spaggiari

## Overview
Spaggiari, "buying and selling crypto at your fingertips", is a Robinhood clone, which allows users to buy and sell top cryptocurrencies with fake money. Spaggiari provides you a way to achieve financial freedom, and live happily ever after.

## Application Architecture

Spaggiari is built on a React frontend with a Flask backend, using PostgreSQL as a database. Spaggiari relies on Coingecko API to get the latest crypto market prices and Plotly charts for rendering historical charts.

## Technologies Used

### Frontend
- React
- Redux
- Javascript
- HTML
- CSS

### Backend
- Python
- Flask
- PostreSQL
- SQLAlchemy

### Crypto Data
- Coingecko API

## Spaggiari Setup

1. Clone this repository (https://github.com/ltroper/Spaggiari.git)
2. Install dependencies - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
3. Create a .env file based on the .env.example with proper settings required for the development environment
4. Setup PostgreSQL user, password and database and to make sure it matches the .env file
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
pipenv shell
flask db upgrade
flask seed all
flask run

## Features
### Portfolio and Watchlists
Users can view their portfolio chart when logged in that shows the movement of the assets in their portfolio. Users can also create a list in their watchlist and add cryptos that they want to keep track of to the list.

### Crytpo Detail
Users can view the historical chart, buy and sell that crypto from the stock detail page.

### Search
Users will be able to search for cryptos based on the name. The search bar drops suggestions for cryptos that the user may be searching for.

## Link to wiki
https://github.com/ltroper/Spaggiari/wiki
