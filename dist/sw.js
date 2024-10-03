if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let o = {};
    const d = (e) => n(e, r),
      l = { module: { uri: r }, exports: o, require: d };
    s[r] = Promise.all(i.map((e) => l[e] || d(e))).then((e) => (t(...e), o));
  };
}
define(["./workbox-3e911b1d"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "assets/index-DHMdGcta.css", revision: null },
        { url: "assets/index-DtjfCmPO.js", revision: null },
        { url: "index.html", revision: "49c6da3440fa41766ae34a51d5f3b60f" },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
        {
          url: "assets/entrenamientos2.png",
          revision: "f43b9df11c28ab371080298590a2075f",
        },
        {
          url: "assets/eventos.png",
          revision: "fccac627f2e9380000d956d9915be4de",
        },
        {
          url: "assets/gevpLogo.png",
          revision: "1506eaf918a98f52126a4c6280827529",
        },
        {
          url: "manifest.webmanifest",
          revision: "7b6b8eda8546b3949c869c8e98db6835",
        },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});
