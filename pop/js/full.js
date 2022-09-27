let ANDROID_MAIN_UUID;
let ac = false;
try {
  ac = window.AndroidBridge || window.webkit.messageHandlers.iosController;
  ac.message =
    ac.message || window.webkit.messageHandlers.iosController.postMessage;
} catch (e) {
  ac = false;
}

const locParam = (() => {
  const res = {};
  location.href
    .split("&")[1]
    .split("&")
    .forEach((str) => {
      const p = str.split("=");
      res[p[0]] = p[1];
    });
  return res;
})();
console.log(locParam);

const dictURL = {
  "https://m.map.kakao.com/": () => {
    const param = {
      command: "SHOW_SCRIPT_INFO",
      param: "javascript:alert('hello, kakao!!');",
    };
    if (ac) ac.message(JSON.stringify(param));
  },
};

function main() {
  const param = {
    command: "SHOW_URL_INFO",
    param: "https://m.map.kakao.com/",
  };
  if (ac) ac.message(JSON.stringify(param));
}

function webviewOnLoad(strURL) {
  dictURL[strURL]();
}

btnBack.onclick = function () {
  const param = {
    command: "SHOW_URL_INFO",
    param: "https://m.map.kakao.com/",
  };
  if (ac) ac.message(JSON.stringify(param));
};

/* function setPopupMessage(str) {
  console.log("str", str, typeof str);
  const param = JSON.parse(str);
  msgPopup.innerHTML = param.message;
  console.log(param);
  if (param.finish) {
    if (ac) ac.message("REQUEST_END");
  }
} */
