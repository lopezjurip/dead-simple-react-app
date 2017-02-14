# Dead-Simple React App

How to easily integrate [Express.js](http://expressjs.com/) and MongoDB with [create-react-app](https://github.com/facebookincubator/create-react-app/).

## Development

Install dependencies:

```sh
yarn
```

While developing, two servers must be run at the same time:

* Server _server_: Express.js connected to the database at port `4000`.
* Client _server_: `create-react-app` development server with hot reloading.

Both can be started with the single command:

```sh
yarn run dev
```

Go visit [localhost:3000](http://localhost:3000/) and query the server with relative paths like:

```sh
// Good
fetch('/api/v1/').then(...);
// -> Request is automatically proxied.

// Bad
fetch('localhost:4000/api/v1/').then(...);
// -> Real server address, but you will have problems with CORS.
```


## Production

On production the app must be built once and then only run Express.js server:

```sh
# Automatically builds optimized react-app
yarn start
```

## Production with [Docker](http://docker.com/)

First create data volume:

```sh
docker volume create --name=deadsimple-data
```

Then run with docker-compose and PM2 with (also update with):

```sh
docker-compose up -d --build
```

See the logs

```sh
docker-compose logs --follow app
```
