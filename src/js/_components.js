function requireAll(context) {
  return context.keys().map(context);
}

requireAll(require.context("../partials/components/", true, /\.(js)$/));
