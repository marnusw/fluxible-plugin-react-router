/**
 * @class ReactRouterPlugin
 *
 * Provides full access to the router on the action context.
 *
 * @param {Function} router A router created via `Router.create({routes, location})`.
 * @returns {Object} The ReactRouterPlugin instance.
 */
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
         * Provides full access to the router in the action.
         */
        plugActionContext: provideRouter
      }
    },

    /**
     * Run the router at the appropriate time via the plugin if the original router instance
     * is no longer available. Example usage:
     *
     * ```
     * // app.js
     * var router = Router.create({routes, location});
     * app.plug(ReactRouterPlugin(router));
     *
     * // server.js or client.js
     * app.getPlugin('ReactRouterPlugin').run(function(Root, state) {...});
     * ```
     *
     * @param callback `function(Root, state) {...}`, just like the standard `run` method.
     */
    run: function (callback) {
      router.run(callback);
    }
  }
};
