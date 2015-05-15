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

let app = new Fluxible({
    component: require('./mainRoutes.jsx') // your routes component goes here
})

app.plug(reactRouter(Router.create({
    routes: app.getComponent(),
    location: url // this is an isomorphic pivot, act accordingly!
})))

```
