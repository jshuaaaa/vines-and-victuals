const loader = document.querySelector('.loader');

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = 'none';

    window.location.assign("./results.html")
    setTimeout(() => (main.style.opacity = 1), 50);
  }, 3000);
}

init();
