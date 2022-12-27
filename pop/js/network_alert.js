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
function setPopupMessage(str) {}
imgPop.onclick = function () {
  if (ac) ac.message("REQUEST_END");
};
