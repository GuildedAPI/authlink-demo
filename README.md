# Guilded Authlink Demo App

**[Live instance here](https://demo.authlink.app)**

You can find implementations of every available endpoint in [/app/authlink.server.js](https://github.com/GuildedAPI/authlink-demo/blob/master/app/authlink.server.js), although only a few are used in this app.

## Running

You will need the following keys in your `.env` file, the values of which can all be found, generated, or set on your [application's page](https://authlink.app/dev/apps): `CLIENT_ID`, `CLIENT_SECRET`, & `REDIRECT_URI`. Auth scopes are a constant of `identify` and `servers`.

For storing sessions persistently, you will also need to specify `COOKIE_SECRET` and `SESSION_STORAGE_PATH`.
