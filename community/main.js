function dark(id) {
  if (id == "dark") {
    document.body.classList.add("dark");
    document.getElementById("left-sidebar").style.backgroundColor = "#222531";

    document.getElementById("dark").classList.replace("d-inline", "d-none");
    document.getElementById("light").classList.replace("d-none", "d-inline");
  } else {
    document.body.classList.remove("dark");
    document.getElementById("light").classList.replace("d-inline", "d-none");
    document.getElementById("dark").classList.replace("d-none", "d-inline");
    document.getElementById("left-sidebar").style.backgroundColor = "white";
  }
}

let up = document.getElementById("up");

window.addEventListener("scroll", function () {
  if (scrollY > 50) {
    up.classList.replace("d-none", "d-block");
    up.onclick = function () {
      scroll({
        top: 0,
        behavior: "smooth",
      });
    };
    up.style.bottom = 30 + "px";
  } else {
    up.style.bottom = -100 + "px";
  }
});
