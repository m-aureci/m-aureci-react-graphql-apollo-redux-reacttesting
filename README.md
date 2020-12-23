<p style="text-align: center !important">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="200" />

# React + GraphQL + Apollo Client + Redux + React Testing Library + create-react-app + react-router-dom 👋

Demonstration: https://react-graphql-apollo-redux-reacttesting.vercel.app/
</p>


Installation

- You need to have NodeJS installed in your computer.
- yarn install # to install deps
- yarn start   # to run in dev mode
- yarn test    # to run tests



<hr>

## Project using React and the GraphCountries API

Demonstration: https://react-graphql-apollo-redux-reacttesting.vercel.app/

Consume the Graphql API [GraphCountries](https://github.com/lennertVanSever/graphcountries).

Using React and Apollo Client 3.0.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Used Redux to manage state.

React router used to switch pages.

React Testing Library used for testing.

<hr>


## Scripts

```sh
yarn install     # to install deps
yarn run start   # to run in dev mode
yarn run build   # to build for prod
yarn run test    # to run tests
```


## Layout

I tried to make it as clean as possible.


There are three pages: Home, Detail and Detail Editor:

1. Home:            Home.js    -> [ Search.js -> List.js -> Card.js ] -> 
2. Detail:          Details.js -> [ MapWorld.js -> Pointer.js       ] -> 
3. Detail Editor:   Edit.js    -> Form.js.

* Message.js is used by all pages.
* They are in the components folder.


The "queriesservice" folder is where graphql queries are located for the GraphCountries API.

There are two more folders that are the "tests" and "routes".


## State Management

Fields and the reactive variable of Apollo Client state management.