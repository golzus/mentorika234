globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": '"12aa-OBtqZ80q6xx6MA4lnc7X7NU2t+0"',
    "mtime": "2026-06-07T20:19:27.965Z",
    "size": 4778,
    "path": "../public/favicon.ico"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"18-pLng7pXvA7ADiGhKuhql5TbXEaA"',
    "mtime": "2026-06-08T11:43:21.611Z",
    "size": 24,
    "path": "../public/robots.txt"
  },
  "/assets/gauge-65-DzjpdfNC.svg": {
    "type": "image/svg+xml",
    "etag": '"2581-QYOypHanPdIAGBx2sHfqtjKk4wg"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 9601,
    "path": "../public/assets/gauge-65-DzjpdfNC.svg"
  },
  "/assets/heebo-hebrew-400-normal-CVTJgQVK.woff2": {
    "type": "font/woff2",
    "etag": '"13dc-phBu6ns5OPBCY3oSpvl9/JZR138"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 5084,
    "path": "../public/assets/heebo-hebrew-400-normal-CVTJgQVK.woff2"
  },
  "/assets/heebo-hebrew-400-normal-DoqplqF9.woff": {
    "type": "font/woff",
    "etag": '"1990-ffZwB6VXiLNA6FEiKoYY3UV1T9c"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 6544,
    "path": "../public/assets/heebo-hebrew-400-normal-DoqplqF9.woff"
  },
  "/assets/heebo-hebrew-500-normal-B1vvQVzc.woff": {
    "type": "font/woff",
    "etag": '"19d4-6YO9Wzzwa6XoWhI6KzMGMS561YI"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 6612,
    "path": "../public/assets/heebo-hebrew-500-normal-B1vvQVzc.woff"
  },
  "/assets/heebo-hebrew-500-normal-TEhwuRN-.woff2": {
    "type": "font/woff2",
    "etag": '"1428-uvmaJVdmp3rnqH3bMIrQ64XJqnk"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 5160,
    "path": "../public/assets/heebo-hebrew-500-normal-TEhwuRN-.woff2"
  },
  "/assets/heebo-hebrew-700-normal-BmueYKsA.woff2": {
    "type": "font/woff2",
    "etag": '"13fc-PYOOGISGR5mnpYQWtIszqc83Ws8"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 5116,
    "path": "../public/assets/heebo-hebrew-700-normal-BmueYKsA.woff2"
  },
  "/assets/heebo-hebrew-700-normal-C-m02vPD.woff": {
    "type": "font/woff",
    "etag": '"19d0-Y+jjwzJO5h/ofBRdzCtTQaLEvgM"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 6608,
    "path": "../public/assets/heebo-hebrew-700-normal-C-m02vPD.woff"
  },
  "/assets/heebo-hebrew-800-normal-CDdwy3LD.woff2": {
    "type": "font/woff2",
    "etag": '"1430-Tk+i7DmM4Glfo3KFwqNMFs++0H0"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 5168,
    "path": "../public/assets/heebo-hebrew-800-normal-CDdwy3LD.woff2"
  },
  "/assets/heebo-hebrew-800-normal-DvzqWKY1.woff": {
    "type": "font/woff",
    "etag": '"19d0-1kiShgDko4KwFDhrA2hYXQ6UXtk"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 6608,
    "path": "../public/assets/heebo-hebrew-800-normal-DvzqWKY1.woff"
  },
  "/assets/heebo-latin-400-normal-BVgBBEsj.woff": {
    "type": "font/woff",
    "etag": '"3d14-6ngd4DcmFR2swGeEHIr9wnOFjzc"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 15636,
    "path": "../public/assets/heebo-latin-400-normal-BVgBBEsj.woff"
  },
  "/assets/heebo-latin-400-normal-BGyEuwIV.woff2": {
    "type": "font/woff2",
    "etag": '"2eb4-7TOVph+oeO8CgBRZVDvidkiwG44"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 11956,
    "path": "../public/assets/heebo-latin-400-normal-BGyEuwIV.woff2"
  },
  "/assets/heebo-latin-500-normal-CRntKADR.woff2": {
    "type": "font/woff2",
    "etag": '"3018-viCy0f4MyDntOi4HlZXB+3iRY5U"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 12312,
    "path": "../public/assets/heebo-latin-500-normal-CRntKADR.woff2"
  },
  "/assets/heebo-latin-700-normal-DxB9_ClD.woff": {
    "type": "font/woff",
    "etag": '"3d80-j9FvFHWR2RxIHTrSs/EhKfcRFmA"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 15744,
    "path": "../public/assets/heebo-latin-700-normal-DxB9_ClD.woff"
  },
  "/assets/heebo-latin-500-normal-D9arPEGc.woff": {
    "type": "font/woff",
    "etag": '"3db8-ItZSsgprv1Z1nxyCiSCpAnh5Sb8"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 15800,
    "path": "../public/assets/heebo-latin-500-normal-D9arPEGc.woff"
  },
  "/assets/heebo-latin-700-normal-PoyjiH5f.woff2": {
    "type": "font/woff2",
    "etag": '"2fb8-0NH3I1XFVLBh9ZJbD+i2OSFExTk"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 12216,
    "path": "../public/assets/heebo-latin-700-normal-PoyjiH5f.woff2"
  },
  "/assets/heebo-latin-800-normal-CXX3wFtI.woff2": {
    "type": "font/woff2",
    "etag": '"2f64-br6OIsZOLd6kVLKKMAw4zVoF5/0"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 12132,
    "path": "../public/assets/heebo-latin-800-normal-CXX3wFtI.woff2"
  },
  "/assets/heebo-latin-800-normal-jzg0ZXtx.woff": {
    "type": "font/woff",
    "etag": '"3d5c-SFDGkCsOA+CLs/MACGoQ1QxWk6g"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 15708,
    "path": "../public/assets/heebo-latin-800-normal-jzg0ZXtx.woff"
  },
  "/assets/heebo-latin-ext-400-normal-DXPdCX6a.woff": {
    "type": "font/woff",
    "etag": '"2174-pR+6+Txm8J344OeYCzcrl5evSIU"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 8564,
    "path": "../public/assets/heebo-latin-ext-400-normal-DXPdCX6a.woff"
  },
  "/assets/heebo-latin-ext-400-normal-DRmJUxQB.woff2": {
    "type": "font/woff2",
    "etag": '"18cc-w6QiWG7U0+uYVU/nahOntRmQBIo"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 6348,
    "path": "../public/assets/heebo-latin-ext-400-normal-DRmJUxQB.woff2"
  },
  "/assets/heebo-latin-ext-500-normal-BxM-et3U.woff": {
    "type": "font/woff",
    "etag": '"21d4-v3Jucaiz4VyZtvE2exzv/fhLJeg"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 8660,
    "path": "../public/assets/heebo-latin-ext-500-normal-BxM-et3U.woff"
  },
  "/assets/heebo-latin-ext-500-normal-i0ou_jpq.woff2": {
    "type": "font/woff2",
    "etag": '"1978-QpmL4MqrGxruh5yAYKWzbYUu0w8"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 6520,
    "path": "../public/assets/heebo-latin-ext-500-normal-i0ou_jpq.woff2"
  },
  "/assets/heebo-latin-ext-700-normal-qhovM35d.woff2": {
    "type": "font/woff2",
    "etag": '"19a4-gHm7Q/t2K7uqd/GYTicgVc5Gcmk"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 6564,
    "path": "../public/assets/heebo-latin-ext-700-normal-qhovM35d.woff2"
  },
  "/assets/heebo-latin-ext-700-normal-uPTFHbI6.woff": {
    "type": "font/woff",
    "etag": '"21d8-JJe7ikMC4kGSqpDrnTVY6wQJIFY"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 8664,
    "path": "../public/assets/heebo-latin-ext-700-normal-uPTFHbI6.woff"
  },
  "/assets/heebo-latin-ext-800-normal-CaKn05T8.woff": {
    "type": "font/woff",
    "etag": '"21d8-R4YFPT3A74kx1K09G/ZRIMhbItM"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 8664,
    "path": "../public/assets/heebo-latin-ext-800-normal-CaKn05T8.woff"
  },
  "/assets/heebo-math-400-normal-B7IFZoQI.woff2": {
    "type": "font/woff2",
    "etag": '"251c-UilsdwQ9YUEt6vNsgSTM2goZNu8"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 9500,
    "path": "../public/assets/heebo-math-400-normal-B7IFZoQI.woff2"
  },
  "/assets/heebo-latin-ext-800-normal-BXXnkLdf.woff2": {
    "type": "font/woff2",
    "etag": '"199c-XQ+mJsDJ4MkNvvNPI3PcsL8jcqY"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 6556,
    "path": "../public/assets/heebo-latin-ext-800-normal-BXXnkLdf.woff2"
  },
  "/assets/heebo-math-400-normal-BZIH-XlF.woff": {
    "type": "font/woff",
    "etag": '"2f44-RO7blR2L1SNqd+v87cPBH9+ZyFs"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 12100,
    "path": "../public/assets/heebo-math-400-normal-BZIH-XlF.woff"
  },
  "/assets/heebo-math-500-normal-CriDK-QD.woff": {
    "type": "font/woff",
    "etag": '"2f9c-YVkgKLg2/00zazV2JW1JjyOOSBc"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 12188,
    "path": "../public/assets/heebo-math-500-normal-CriDK-QD.woff"
  },
  "/assets/heebo-math-500-normal-DRhwLwt2.woff2": {
    "type": "font/woff2",
    "etag": '"25d4-Mg6QCR4TwQLwVAQ+upodLBbVjsg"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 9684,
    "path": "../public/assets/heebo-math-500-normal-DRhwLwt2.woff2"
  },
  "/assets/heebo-math-700-normal-CPsTiLVd.woff2": {
    "type": "font/woff2",
    "etag": '"25c8-o34qRQOp+H7ts/09PHglsU4z2bs"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 9672,
    "path": "../public/assets/heebo-math-700-normal-CPsTiLVd.woff2"
  },
  "/assets/heebo-math-800-normal-BsL7yxmb.woff2": {
    "type": "font/woff2",
    "etag": '"25a0-1o4fuYnKfPQCfvO12bq8fZnbKDw"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 9632,
    "path": "../public/assets/heebo-math-800-normal-BsL7yxmb.woff2"
  },
  "/assets/heebo-math-700-normal-DYoC40KU.woff": {
    "type": "font/woff",
    "etag": '"2f7c-ppmA7sXC7jStYi6L8miORMFmsWI"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 12156,
    "path": "../public/assets/heebo-math-700-normal-DYoC40KU.woff"
  },
  "/assets/heebo-math-800-normal-CkZgLaga.woff": {
    "type": "font/woff",
    "etag": '"2f70-Zk3syPdq5KzZF0KD/f7/vFxIc1Y"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 12144,
    "path": "../public/assets/heebo-math-800-normal-CkZgLaga.woff"
  },
  "/assets/heebo-symbols-400-normal-5E_VKyNT.woff": {
    "type": "font/woff",
    "etag": '"1bd0-HGos7BRgVQ5JSdnS0rD+ARjgNis"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 7120,
    "path": "../public/assets/heebo-symbols-400-normal-5E_VKyNT.woff"
  },
  "/assets/heebo-symbols-400-normal-DYSXrd5A.woff2": {
    "type": "font/woff2",
    "etag": '"15a8-z9NqTtBE9umCwaD9VgV/dv6PNCg"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 5544,
    "path": "../public/assets/heebo-symbols-400-normal-DYSXrd5A.woff2"
  },
  "/assets/heebo-symbols-500-normal-BHV7NI0G.woff": {
    "type": "font/woff",
    "etag": '"1c14-Mcw0wcNGKjqum/ZLumS+wbVIKgk"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 7188,
    "path": "../public/assets/heebo-symbols-500-normal-BHV7NI0G.woff"
  },
  "/assets/heebo-symbols-500-normal-DH-fW6iB.woff2": {
    "type": "font/woff2",
    "etag": '"1640-acvYDCM3V0dYo75Frz4Ia4k4eKc"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 5696,
    "path": "../public/assets/heebo-symbols-500-normal-DH-fW6iB.woff2"
  },
  "/assets/heebo-symbols-700-normal-Bez4Ifx8.woff": {
    "type": "font/woff",
    "etag": '"1bec-RSUwtq7gka/d3eafnuLufL7yMvc"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 7148,
    "path": "../public/assets/heebo-symbols-700-normal-Bez4Ifx8.woff"
  },
  "/assets/heebo-symbols-700-normal-DjMVWKhZ.woff2": {
    "type": "font/woff2",
    "etag": '"1624-dOehvs0sFmNw+N62e2aMOPxQlOA"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 5668,
    "path": "../public/assets/heebo-symbols-700-normal-DjMVWKhZ.woff2"
  },
  "/assets/heebo-symbols-800-normal-BkpivR9G.woff": {
    "type": "font/woff",
    "etag": '"1be0-5VQC/A1M23+yQtJgg+gFZGdG/y8"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 7136,
    "path": "../public/assets/heebo-symbols-800-normal-BkpivR9G.woff"
  },
  "/assets/heebo-symbols-800-normal-FYIx6Vl3.woff2": {
    "type": "font/woff2",
    "etag": '"1630-RWOK3ZjGcVzx210cR9PxK0dVojM"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 5680,
    "path": "../public/assets/heebo-symbols-800-normal-FYIx6Vl3.woff2"
  },
  "/assets/index-H3SrNBcn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4494-iG4iEThGeba6omhgUyh+yCnhYJg"',
    "mtime": "2026-10-24T21:41:35.505Z",
    "size": 17556,
    "path": "../public/assets/index-H3SrNBcn.js"
  },
  "/assets/leads-CV973HK6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"32b7-d0Bx3bq35813el/ZON9dXrKV0lQ"',
    "mtime": "2026-10-24T21:41:35.502Z",
    "size": 12983,
    "path": "../public/assets/leads-CV973HK6.js"
  },
  "/assets/login-h1rt0L9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"916-3kOpKezSjg5suvSzRxciNX9L5GE"',
    "mtime": "2026-10-24T21:41:35.502Z",
    "size": 2326,
    "path": "../public/assets/login-h1rt0L9V.js"
  },
  "/assets/logo-mentorika-full-C-RE1PBZ.png": {
    "type": "image/png",
    "etag": '"12aa-OBtqZ80q6xx6MA4lnc7X7NU2t+0"',
    "mtime": "2026-10-24T21:41:35.472Z",
    "size": 4778,
    "path": "../public/assets/logo-mentorika-full-C-RE1PBZ.png"
  },
  "/assets/marketing-CsqQi_6p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3688-W60NtbAJEdPVniCrleta89T6B6I"',
    "mtime": "2026-10-24T21:41:35.502Z",
    "size": 13960,
    "path": "../public/assets/marketing-CsqQi_6p.js"
  },
  "/assets/logo-zahavi-C2XomYaF.png": {
    "type": "image/png",
    "etag": '"1994-9kFK5dMDHWCWZeaQn52Ch7e/M9Q"',
    "mtime": "2026-10-24T21:41:35.497Z",
    "size": 6548,
    "path": "../public/assets/logo-zahavi-C2XomYaF.png"
  },
  "/assets/index-DKPbA-Br.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"9b825-vm3VIR8J63AwymxV/ebMtQ0Zqlk"',
    "mtime": "2026-10-24T21:41:35.507Z",
    "size": 636965,
    "path": "../public/assets/index-DKPbA-Br.js"
  },
  "/assets/pagination-99onp1vG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d7-4w6niKjQ0aXCQfqVT9mqPh8+aKo"',
    "mtime": "2026-10-24T21:41:35.503Z",
    "size": 1239,
    "path": "../public/assets/pagination-99onp1vG.js"
  },
  "/assets/profile-B2hjr368.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1b66-o7OvV0JCgmd0+wK+iRkaudKVXUY"',
    "mtime": "2026-10-24T21:41:35.502Z",
    "size": 7014,
    "path": "../public/assets/profile-B2hjr368.js"
  },
  "/assets/use-leads-B7hduipu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4d86-dW+WEk6vs2PRb7cIP5eXHrpekCc"',
    "mtime": "2026-10-24T21:41:35.503Z",
    "size": 19846,
    "path": "../public/assets/use-leads-B7hduipu.js"
  },
  "/assets/use-marketing-Bjh1J9M3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a2e-rpiRYxPEo2Vx3iMTIRjhYCmxyiM"',
    "mtime": "2026-10-24T21:41:35.502Z",
    "size": 2606,
    "path": "../public/assets/use-marketing-Bjh1J9M3.js"
  },
  "/assets/styles-DeTFDnwL.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"19436-jlhOmFX9BezXtILtNBD0qJmim68"',
    "mtime": "2026-10-24T21:41:35.499Z",
    "size": 103478,
    "path": "../public/assets/styles-DeTFDnwL.css"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _Re5IKu = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_MpHCdh = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_MpHCdh };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_Re5IKu)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
