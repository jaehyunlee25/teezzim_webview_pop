javascript: (() => {
  const btnSearch = document.getElementsByClassName("sym-btn sch-b")[0];
  btnSearch.click();
  const ipt = document.getElementsByClassName("input")[1];
  ipt.value = "${locId}";
  $(ipt).keyup();
  let cnt = 0;
  const t = setInterval(() => {
    cnt++;
    const el = document.getElementsByClassName(
      "cmp-local-search-items on opened places"
    );
    if (el.length < 1) return;
    if (cnt > 20) {
      clearInterval(t);
      return;
    }
    console.log(cnt);
    clearInterval(t);
    const a = el[0].getElementsByTagName("li")[0].children[0];
    console.log(a);
    if (a instanceof Array) $(a)[0].click();
    else $(a).click();
  }, 200);
})();
