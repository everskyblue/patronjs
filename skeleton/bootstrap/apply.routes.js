import app from "./app.js";
import routes from "./routes.js";

for (const groupURL in routes.groups) {
    app.group.apply(app, [groupURL, ()=> each(routes.groups[groupURL])])
}

function applyHash(route) {
    app.hash.apply(app, [route.path].concat(route.option))
}

function each(paths) {
    paths.forEach(applyHash);
}

each(routes.paths);