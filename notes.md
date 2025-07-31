routing: implementing different actions for differernt url

## NPM packages

npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-ally eslint-plugin-react --save-dev

npm i nodemon --save-dev & using npm script | --global
npm i slugify for handling route ids
npm i morgan: for logging
npm i dotenv: for using enviroment variables

## NPM package versions

npm install packagename@1.0.0

npm outdated

npm update package
{
"package for all changes": "\*x.x.x",
"package for minor changes": "^x.x.x",
"package for minor changes and paches": "^~x.x.x",
"package for paches": "~x.x.x",
}

npm uninstall package
npm install // for installing packages back from package.json

## Node core modules

require("fs")
require("http") // giving networking capabilities, such as building http server
require("url") // parsing the query string into an object

## Middlewares

app.use(express.json()); //for reading the body of request
app.use(express.static(`${__dirname}/public`)); //for serving static files
