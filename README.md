
# Twitter Brand Enhancer

The inspiration for this project came from [Hypefury](https://hypefury.com), since I'm a avid twitter user, I wanted to work on an app that would enhance my use of it.

The app initially was supposed to allow the user to post / schedule / delete tweets, but since sheduling is now part of Twitter Web, I decided to focus on the delete feature and enhance it.

The backend of this app is built using Node/Express, and the frontend will be built using React.

Note: Twitter API v1.1 will be deprecated in the few upcoming months, with the switch to v2 there will be a limit on the number of delete requests sent (50 requests / 15 min) rendering the app not as useful.
## Features

- Delete the 3200 most recent tweets (API limitation) ✅
- Delete tweets older than a certain date ✅
- Delete only tweets containing a certain keyword ✅
- Delete all tweets in your tweets.js file (file can be found when you request your account archive) ⏳


## Installation
The backend is functional, to make use of it, `cd` into the server folder and create an `.env` file then paste the following and input the missing values

```env
  API_KEY=/* found in the settings of your twitter app */
  API_SECRET_KEY=/* found in the settings of your twitter app */
  HTTP_PORT=/* whatever port number you want to attribute */
  HTTPS_PORT=/* whatever port number you want to attribute */
  MONGODB_URL=/* your mongoDB connection url with username and password */
```
Then run
```bash
  npm install
```
Once the install finishes, you can run the project with `npm run watch`.

There are many more steps needed to set up and get this project running especially since it's still missing a UI.
I'm hoping I won't have to detail them here by the time I finish the app since the process will much more streamlined.
    
