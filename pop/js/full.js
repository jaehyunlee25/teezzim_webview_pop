let ANDROID_MAIN_UUID;
let ac = false;
try {
  ac = window.AndroidBridge || window.webkit.messageHandlers.iosController;
  ac.message =
    ac.message || window.webkit.messageHandlers.iosController.postMessage;
} catch (e) {
  ac = false;
}

function post(addr, param, header, callback) {
  var a = new ajaxcallforgeneral(),
    str = [];
  if (header["Content-Type"] == "application/json") {
    str = JSON.stringify(param);
  } else {
    for (var el in param) str.push(el + "=" + encodeURIComponent(param[el]));
    str = str.join("&");
  }
  a.post(addr, str, header);
  a.ajaxcallback = callback;
}
function get(addr, param, header, callback) {
  var a = new ajaxcallforgeneral(),
    str = [];
  for (var el in param) {
    str.push(el + "=" + param[el]);
  }
  str = str.join("&");
  a.jAjax(addr + "?" + str, header);
  a.ajaxcallback = callback;
}
function ajaxcallforgeneral() {
  this.xmlHttp;
  var j = this;
  var HTTP = {};
  var ADDR;
  var PARAM;
  var HEADER;
  this.jAjax = function (address, header) {
    j.xmlHttp = new XMLHttpRequest();
    j.xmlHttp.onreadystatechange = on_ReadyStateChange;
    j.xmlHttp.onerror = onError;
    j.xmlHttp.open("GET", address, true);
    if (header) {
      Object.keys(header).forEach((key) => {
        var val = header[key];
        j.xmlHttp.setRequestHeader(key, val);
      });
    }
    j.xmlHttp.send(null);
  };
  this.post = function (addr, prm, header) {
    j.xmlHttp = new XMLHttpRequest();
    j.xmlHttp.onreadystatechange = on_ReadyStateChange;
    j.xmlHttp.onerror = onError;
    j.xmlHttp.open("POST", addr, true);

    if (header) {
      if (header["Content-Type"])
        Object.keys(header).forEach((key) => {
          var val = header[key];
          j.xmlHttp.setRequestHeader(key, val);
        });
      else
        j.xmlHttp.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
    } else {
      j.xmlHttp.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
    }

    ADDR = addr;
    PARAM = prm;
    HEADER = JSON.stringify(header);

    j.xmlHttp.send(prm);
  };
  this.file = function (addr, prm) {
    j.xmlHttp = new XMLHttpRequest();
    j.xmlHttp.onreadystatechange = on_ReadyStateChange;
    j.xmlHttp.open("POST", addr, true);
    j.xmlHttp.send(prm);
  };
  function onError() {}
  function on_ReadyStateChange() {
    if (j.xmlHttp.readyState == 4) {
      if (j.xmlHttp.status == 200) {
        var data = j.xmlHttp.responseText;
        j.ajaxcallback(data);
      } else {
      }
    }
  }
}
const locParam = (() => {
  const res = {};
  location.href
    .split("?")[1]
    .split("&")
    .forEach((str) => {
      const p = str.split("=");
      res[p[0]] = p[1];
    });
  return res;
})();

const dictURL = {
  showTrafficInfo: () => {
    const param = {
      command: "SHOW_SCRIPT_INFO",
      param:
        'javascript:if(document.getElementsByClassName("btn_set mctr_realtraffic")[0].innerText=="해제") document.getElementsByClassName("btn_set mctr_realtraffic")[0].click();',
    };
    if (ac) ac.message(JSON.stringify(param));
  },
};

main();

function main() {
  const { club_id, opt: option } = locParam;

  if (option == "showTrafficInfo") {
    post(
      "https://dev.mnemosyne.co.kr/api/crawler/getOuterInfo",
      { club_id },
      { "Content-Type": "application/json" },
      (data) => {
        const json = JSON.parse(data).data;
        console.log(json);
        const { kakao_location_id: locId, name } = json[0];
        const param = {
          command: "SHOW_URL_INFO",
          param:
            "https://m.map.kakao.com/actions/searchView?q=" +
            name +
            "#!/" +
            locId +
            "/map/place",
        };
        console.log(param);
        if (ac) ac.message(JSON.stringify(param));
      }
    );
  }
}

function webviewOnLoad(option) {
  dictURL[option]();
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
