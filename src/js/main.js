import "./_jquery-libraries.js";
import "../scss/main.scss";

function requireAll(context) {
  return context.keys().map(context);
}

requireAll(require.context("../partials/", true, /\.scss/));
requireAll(require.context("../partials/", true, /\.js/));
