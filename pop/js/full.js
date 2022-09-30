String.prototype.dp = function (param) {
  let self = this;
  const keys = Object.keys(param);
  keys.forEach((key) => {
    const regex = new RegExp("\\$\\{".add(key).add("\\}"), "g");
    const val = param[key];
    self = self.replace(regex, val);
  });
  return self;
};
String.prototype.add = function add(str) {
  return [this, str].join("");
};
let ANDROID_MAIN_UUID;
let ac = false;
try {
  ac = window.AndroidBridge || window.webkit.messageHandlers.iosController;
  ac.message =
    ac.message || window.webkit.messageHandlers.iosController.postMessage;
} catch (e) {
  ac = false;
}

let OuterInfo;
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
const dictScript = {
  showTrafficInfo: () => {
    get("/pop/js/getTraffic.js", {}, {}, (str) => {
      console.log(str);
      const param = {
        command: "SHOW_SCRIPT_INFO",
        param: str,
      };
      if (ac) ac.message(JSON.stringify(param));
    });
  },
  showWeatherInfo: () => {
    get("/pop/js/getWeather.js", {}, {}, (str) => {
      const { weather_location_id: locId } = OuterInfo[0];
      str = str.dp({ locId });
      const param = {
        command: "SHOW_SCRIPT_INFO",
        param: str,
      };
      if (ac) ac.message(JSON.stringify(param));
    });
  },
};
const dictUrl = {
  showTrafficInfo: () => {
    const { kakao_location_id: locId, name } = OuterInfo[0];
    const param = {
      command: "SHOW_URL_INFO",
      param:
        "https://m.map.kakao.com/actions/searchView?q=" +
        name +
        "#!/" +
        locId +
        "/map/place",
    };
    if (ac) ac.message(JSON.stringify(param));
  },
  showWeatherInfo: () => {
    const param = {
      command: "SHOW_URL_INFO",
      param: "https://www.weather.go.kr/w/index.do",
    };
    if (ac) ac.message(JSON.stringify(param));
  },
  showNearbyRestaurantInfo: () => {
    const { name } = OuterInfo[0];
    const param = {
      command: "SHOW_URL_INFO",
      param:
        "https://m.search.naver.com/search.naver?sm=mtp_sly.hst&where=m&query=" +
        (name + "+맛집") +
        "&acr=1",
    };
    if (ac) ac.message(JSON.stringify(param));
  },
};

main();

function main() {
  console.log(locParam);
  const { club_id: clubId, opt: option } = locParam;
  console.log(clubId, option);

  post(
    "https://dev.mnemosyne.co.kr/api/crawler/getOuterInfo",
    { club_id: clubId },
    { "Content-Type": "application/json" },
    (data) => {
      console.log(data);
      OuterInfo = JSON.parse(data).data;
      console.log(OuterInfo);
      if (dictUrl[option]) dictUrl[option]();
    }
  );
}
function webviewOnLoad(option) {
  if (dictScript[option]) dictScript[option]();
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
btnBack.onclick = function () {};

/* function setPopupMessage(str) {
  console.log("str", str, typeof str);
  const param = JSON.parse(str);
  msgPopup.innerHTML = param.message;
  console.log(param);
  if (param.finish) {
    if (ac) ac.message("REQUEST_END");
  }
} */
