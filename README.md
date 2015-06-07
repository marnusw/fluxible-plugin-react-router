fluxible-plugin-react-router
============================

A fluxible plugin that provides react-router context to actions

```
npm install fluxible-plugin-react-router 
```

# Usage

```javascript

import Fluxible from 'fluxible'
import Router from 'react-router'
import reactRouter from 'fluxible-plugin-react-router'

const app = new Fluxible({
  component: require('./mainRoutes.jsx') // your routes component goes here
})

const router = Router.create({
  routes: app.getComponent(),
  location: url // this is an isomorphic pivot, act accordingly!
})

app.plug(reactRouter(router))

```

The router will be available on the action context.

```
function someAction(actionContext, payload, done) {
  actionContext.router.transitionTo('/')
}
```

# Handling Isomorphism

As noted above the location argument to `Router.create` is an isomorphic pivot.
When on the server side one will want to use `req.url` and on the client side,
`Router.HistoryLocation` or another Location implementation. This isomorphic 
trouble can be solved by abstracting the app into a function.

```javascript
function makeApp (location) {
  const app = new Fluxible({
    component: require('./mainRoutes.jsx') // your routes component goes here
  })

  const router = Router.create({
    routes: app.getComponent(),
    location: location
  })

  app.plug(reactRouter(router))

  return app
}
```

Now we can pass in the location using the appropriate semantics and then run
the router on the client

```javascript
const app = makeApp(Router.HistoryLocation)

app.getPlugin('ReactRouterPlugin').run((Root, state) => {
  // Render for the client...
}))
```

or the server

```javascript
const app = makeApp(req.url)

app.getPlugin('ReactRouterPlugin').run((Root, state) => {
  // Render for the server...
}))
```
