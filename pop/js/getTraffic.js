javascript: (() => {
  console.log(11);
  console.log("test text");
  if (
    document.getElementsByClassName("btn_set mctr_realtraffic")[0].innerText ==
    "해제"
  )
    document.getElementsByClassName("btn_set mctr_realtraffic")[0].click();
})();
