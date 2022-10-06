javascript: (() => {
  /* const el = document.getElementsByClassName("btn_set mctr_realtraffic");
  if (el[0].innerText != "선택") el[0].click(); */
  let cnt = 0;
  if (departArriveForm.startLoc.value == "")
    location.href = "https://m.map.kakao.com/";

  /* const t = setInterval(() => {
    cnt++;
    console.log("stand by", cnt);
    if (cnt > 200) {
      clearInterval(t);
      let ac = false;
      try {
        ac =
          window.AndroidBridge || window.webkit.messageHandlers.iosController;
        ac.message =
          ac.message || window.webkit.messageHandlers.iosController.postMessage;
      } catch (e) {
        ac = false;
      }
      if (ac) ac.message("REQUEST_END");
    }
    if (departArriveForm.startLoc.value == "") return;
    clearInterval(t);
    location.href = getAddr({
      startLoc: departArriveForm.startLoc.value,
      sxEnc: departArriveForm.sxEnc.value,
      syEnc: departArriveForm.syEnc.value,
      endLoc: "${endLoc}",
      exEnc: "${exEnc}",
      eyEnc: "${eyEnc}",
      ids: "${ids}",
      service: "",
    });
  }, 200); */

  /*
  location.href = getAddr({
    startLoc: "서울 영등포구 여의도동 8-1",
    sxEnc: "LWMNTTHWNXRSPQLOLM",
    syEnc: "QNOTTSLIYOOMSSNMQ",
    endLoc: "동촌GC 클럽하우스",
    exEnc: "NQSPQU",
    eyEnc: "YWVTLM",
    ids: ",P18323369",
    service: "",
  });
  */
  function getAddr(obj) {
    console.log("parameter");
    Object.keys(obj).forEach((key) => {
      console.log(key, obj[key], typeof obj[key]);
    });
    const header = "https://m.map.kakao.com/actions/carRoute?";
    const res = [];
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      res.push(key + "=" + val);
    });
    return header + res.join("&");
  }
})();
