import mixpanel from "mixpanel-browser";
mixpanel.init("3102fdb63392365bcf8bdedcad9201f4");

export function routeChange(route) {
  console.log(route);
  mixpanel.track("Route Changed", { route: route });
}
