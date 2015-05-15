module.exports = function (router) {

  if (!router) {
    throw new Error('Please provide an instance of the react router.')
  }

  function provideRouter (context) {
    context.router = router
  }

  return {
    name: 'ReactRouterPlugin',
    plugContext: function plugContext () {
      return {
        /**
         * Provides full access to the router in the action
         */
        plugActionContext: provideRouter,
      }
    },
  }
}
