javascript: (() => {
  console.log(11);
  console.log("test text");
  const el = document.getElementsByClassName("btn_set mctr_realtraffic");
  console.log("length", el.length);
  console.log(el[0].innerText);
  if (el[0].innerText == "해제") el[0].click();
})();
