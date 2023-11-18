# triplit test

Trying [triplit](https://www.triplit.dev/)

[See the docs here](https://www.triplit.dev/docs/getting-started)

-------

## develop
Start a localhost triplit server and frontend server

```sh
npm run start-local
```

## frontend architecture

Create application state & a triplit client instance in the file [./src/state.ts](./src/state.ts). This is where we subscribe to triplit, and create methods that are called by the view.

The view is made with [preact](https://preactjs.com/).
