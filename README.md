# Twiginity

Initially this project was supposed to be a [Hypefury](https://hypefury.com) clone, but as many of the features ended up being available on Twitter Web (scheduling for instance) I decided to focus on the one true feature I always use, which is tweet deletion.

This is the first app I release after embarking on the self-taught coding journey.

**Note:** Twitter API v1.1 will be deprecated in the few upcoming months, with the switch to v2 there will be a limit on the number of delete requests sent (50 requests / 15 min) rendering the app not as useful.

With Twiginity, you can:

- [x] Delete the 3200 most recent tweets (API limitation)
- [x] Delete tweets older than a certain date
- [x] Delete only tweets containing a certain keyword
- [x] Delete all your account's tweets if you provide your **tweets.js** file

## Installation

Once you clone this repo, make sure your PWD is set to the project's root folder then run the following command to install all the dependencies inside the `client` and `server` folders as well as to build a production version of the React frontend and store it somewhere in the `server` folder.

```bash
  npm run heroku-postbuild
```

## Environment Variables

Before running this project, you will need to add the following environment variables to your .env file

- `API_KEY`: Your Twitter app's API key
- `API_SECRET_KEY`: Your Twitter app's API secret key
- `PORT`: the port number you want to assign to Twiginity
- `MONGODB_URL`: the URL containing your login and password to access the database
- `COOKIE_KEYS`: an array of two strings or more to sign the cookies
- `ENCRYPTION_KEY`: a key or passphrase used by Passport.js to encrypt your credentials before storing them in the database
- `REDIS_PASSWORD`: Redis databse password
- `REDIS_URL`: Redis database public url
- `REDIS_PORT`: Redis database public url

> You can create a Redis database for free by creating an account either on [Northflank](https://northflank.com) or [Redis](https://redis.com).

Store the resulting `.env` file in the root of the `server` directory.

## Run Locally

Make sure you're inside the project root folder then run

```bash
  npm start
```

or

```bash
  npm run watch
```

if you wish to bring some changes to the project and want nodemon to restart your server after these changes are saved.

> if you ever get SSL errors, make sure to run your browser with SSL checks disabled.

Hopefully by now, you should be able to open Twiginity on `http://127.00.1:WhateverPortYouChose`.

But to login with Twitter and use the app, you need to first add your localhost URL to your Twitter app. More about [Callback URLs](https://developer.twitter.com/en/docs/apps/callback-urls) here.

Your URL should look like this `http://127.0.0.1:WhateverPortYouChose/auth/twitter/redirect`

## Tech Stack and dependencies

### Client:

- React
- [MUI](https://mui.com)
- [Filepond](https://pqina.nl/filepond/)
- [Socket.IO](https://socket.io)

### Server:

- Node
- Express
- [Socket.IO](https://socket.io)
- [bee-queue](https://github.com/bee-queue/bee-queue)
- [bull-arena](https://github.com/bee-queue/arena#readme)
- [express-fileupload](https://github.com/richardgirges/express-fileupload#readme)
- [firstline](https://github.com/pensierinmusica/firstline)
- [line-replace](https://github.com/codealchemist/line-replace#readme)
- [passport](https://www.passportjs.org/)
- [redis](https://github.com/redis/node-redis)
- [twitter-api-v2](https://github.com/plhery/node-twitter-api-v2#readme)
