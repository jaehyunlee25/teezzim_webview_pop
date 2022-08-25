let ANDROID_MAIN_UUID;
let ac = false; 
try {
    ac = window.AndroidBridge || window.webkit.messageHandlers.iosController;
    ac.message = ac.message || window.webkit.messageHandlers.iosController.postMessage;
} catch(e) {
    ac = false;
}
function setAndroidMainUUID(uuid) {
    ANDROID_MAIN_UUID = uuid;
    /* elUUID.innerHTML = "UUID: " + ANDROID_MAIN_UUID; */
}
function setPopupMessage(str) {
    console.log("str", str, typeof str);
    const param = JSON.parse(str);
    console.log(param);
    /*
    const param = {
        total: 5,
        success: 3,
        fail: 1,
        none: 1,
        timeout: 1,
    };
    */
    msgPopup.innerHTML = str;
    console.log("setPopupMessage", param.success, param.fail, param.none, param.timeout, param.total);
    console.log(param.success + param.fail + param.none + param.timeout, param.total);
    console.log(param.success + param.fail + param.none + param.timeout == param.total);
    if(param.success + param.fail + param.none + param.timeout == param.total) {
        console.log("okay");
        console.log(ac);
        console.log(ac.message);
        if(ac) ac.message("REQUEST_END");
    }
}