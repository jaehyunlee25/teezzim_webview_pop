let ANDROID_MAIN_UUID;
let ac = false;
try {
  ac = window.AndroidBridge || window.webkit.messageHandlers.iosController;
  ac.message =
    ac.message || window.webkit.messageHandlers.iosController.postMessage;
} catch (e) {
  ac = false;
}
function setAndroidMainUUID(uuid) {
  ANDROID_MAIN_UUID = uuid;
  /* elUUID.innerHTML = "UUID: " + ANDROID_MAIN_UUID; */
}
function setPopupMessage(str) {
  console.log("str", str, typeof str);
  const param = JSON.parse(str);
  msgPopup.innerHTML = param.message;
  if (param.opt == "date") {
    imgPop.src = "publish/images/main/date.png";
  } else if (param.opt == "time") {
    imgPop.src = "publish/images/main/time.png";
  } else {
    imgPop.src = "publish/images/main/info.png";
  }
  imgPop.onload = function () {
    this.style.display = "inline-block";
  };
  console.log(param);
  /*
    const param = {
        total: 5,
        success: 3,
        fail: 1,
        none: 1,
        timeout: 1,
        finish: false,
    };
    */
  if (param.finish) {
    if (ac) ac.message("REQUEST_END");
  }
}
