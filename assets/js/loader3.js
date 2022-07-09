

function init() {
  setTimeout(() => {

    window.location.assign("./single.html")
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 7000);
}

init();
