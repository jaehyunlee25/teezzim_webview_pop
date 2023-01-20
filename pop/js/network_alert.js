let ANDROID_MAIN_UUID;
let ac = false;
const log = console.log;
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
  if (ac) {
    if (window.AndroidBridge) {
      ac.message(
        JSON.stringify({
          type: "REQUEST_END",
          check: !!elNotAgain.check,
        })
      );
    } else {
      ac.message("REQUEST_END");
    }
  }
};
elNotAgain.onclick = function () {
  if (this.check == undefined) this.check = false;
  if (this.check) {
    this.check = false;
    this.src = "publish/images/main/check_off.png";
  } else {
    this.check = true;
    this.src = "publish/images/main/check_on.png";
  }
};
