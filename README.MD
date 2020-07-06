# Superheroes API (Typescript)

Typescript app to manage superheroes data using the [Superhero API](https://superheroapi.com/).

## Overview

![System design](/superheroes_ts.png)

## Project Structure

The goal here is to keep the project struture very simple, thinking in medium size web applications.

```
.
├── dist                          # Compiled files
└── src
    ├── superheroes               # Superheroes Module
        ├── index.ts              # Module entrypoint
        ├── controller.ts         # Controller
        ├── model.ts              # Model
        ├── dao.ts                # Data Access Object
        ├── router.ts             # Module Routes
        ├── exceptions.ts         # Custom exceptions
        ├── service
            ├── index.ts
            ├── schema.ts         # JSON schema (API Response)
            ├── service.ts        # Fetch API data
    ├── app.ts                    # Express application
    ├── config.ts                 # Dotenv environment variables
    ├── db.ts                     # Mongo connection
    ├── error.ts                  # Error middleware and custom HTTP Exception
    ├── index.ts                  # Entrypoint file
    └── test
        ├── fixtures
            ├── api.json          # Sample superheroes api JSON for tests
            ├── superheroes.json  # Sample superheroes data model for tests
        ├── json-server
            ├── db.json           # JSON Server mock database
            ├── routes.json       # JSON Server custom routes
```

## Setup

1. Requirements

   - [NodeJS](https://nodejs.org/en/download/)
   - [Docker](https://www.docker.com/products/docker-desktop)
   - [Mongo](https://www.mongodb.com/try/download/community)

2. Configure local environment

   - Create a `.env` and `.env.test` files on project root folder (sample configuration below).

3. Install

   ```
   npm install
   ```

4. Run the tests

   ```
   npm test
   ```

5. Run the app

   ```
   npm start
   ```

6. Run the app (Docker)

   ```
   docker-compose up
   ```

## Environments

.env

```
SERVER_PORT=3000
MONGO_URI=mongodb://localhost:27017
MONGO_DBNAME=superheroes
API_ENDPOINT=https://www.superheroapi.com/api.php/<YOUR_KEY_HERE>
```

.env.test

```
SERVER_PORT=3001
MONGO_URI=mongodb://localhost:27017
MONGO_DBNAME=superheroes-test
API_ENDPOINT=http://localhost:3004
```

## Resources

> `GET /superheroes`

```
# Return all superheroes on database
# Response 200 OK
[
  {
    "_id": "1eaad202-19e4-4dea-9ebb-e4398e7016c2",
    "createdAt": "2020-07-06T13:59:40-03:00",
    "updatedAt": "2020-07-06T13:59:40-03:00",
    "name": "Deadpool",
    "fullName": "Wade Wilson",
    "alignment": 1,
    "intelligence": 69,
    "power": 100,
    "ocuppation": "Mercenary; former enforcer, government operative, sumo wrestler, soldier, assassin, anti-hero, others",
    "imageURL": "https://www.superherodb.com/pictures2/portraits/10/100/835.jpg",
    "totalRelatives": 0
  },
  {
    "_id": "b416ce00-da96-4ff3-8994-79b2b8372adf",
    "createdAt": "2020-07-06T13:59:47-03:00",
    "updatedAt": "2020-07-06T13:59:47-03:00",
    "name": "Wolverine",
    "fullName": "Logan",
    "alignment": 0,
    "intelligence": 63,
    "power": 89,
    "ocuppation": "Adventurer, instructor, former bartender, bouncer, spy, government operative, mercenary, soldier, sailor, miner",
    "imageURL": "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg",
    "totalRelatives": 0
  }
]
```

> `GET /superheroes/b416ce00-da96-4ff3-8994-79b2b8372adf`

```
# Return superheros by UUID with the list of groups affiliation
# Response 200 OK
# Response 404 UUID Not Found
{
  "_id": "b416ce00-da96-4ff3-8994-79b2b8372adf",
  "createdAt": "2020-07-06T13:59:47-03:00",
  "updatedAt": "2020-07-06T13:59:47-03:00",
  "name": "Wolverine",
  "fullName": "Logan",
  "alignment": 0,
  "intelligence": 63,
  "power": 89,
  "ocuppation": "Adventurer, instructor, former bartender, bouncer, spy, government operative, mercenary, soldier, sailor, miner",
  "imageURL": "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg",
  "totalRelatives": 0
}
```

> `POST /superheroes`

```
# Body
{
  "name": "batman"
}
```

```
# Create and return deadpool or just return the database version
# Response 201 Created
# Response 409 Already exists
# Response 404 Not found on superheroapi service
# Response 400 Bad Request
{
  "_id": "58c5fc02-aba3-4050-adee-0a5528fd77ed",
  "createdAt": "2020-07-06T14:01:59-03:00",
  "updatedAt": "2020-07-06T14:01:59-03:00",
  "name": "Batman",
  "fullName": "Terry McGinnis",
  "alignment": 0,
  "intelligence": 81,
  "power": 63,
  "ocuppation": "-",
  "imageURL": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg",
  "totalRelatives": 0
}
```

> `DELETE /superheroes/58c5fc02-aba3-4050-adee-0a5528fd77ed`

```
# Delete superhero from the database
# Response 204 No content
# Response 404 UUID Not Found
```
