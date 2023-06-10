function dark(id) {
  if (id == "dark") {
    document.body.classList.add("dark");
    document.getElementById("header").classList.add("dark");
    document.getElementById("table").classList.add("dark");
    document.getElementById("first").classList.add("dark");
    document.getElementById("nav").classList.add("dark");
    document.getElementById("footer").classList.add("dark");
    document.getElementById("dark").classList.replace("d-inline", "d-none");
    document.getElementById("light").classList.replace("d-none", "d-inline");
    document.getElementById("lighImg").style.display = "none";
    document.getElementById("darkImg").style.display = "block";
  } else {
    document.body.classList.remove("dark");
    document.getElementById("header").classList.remove("dark");
    document.getElementById("table").classList.remove("dark");
    document.getElementById("first").classList.remove("dark");
    document.getElementById("nav").classList.remove("dark");
    document.getElementById("footer").classList.remove("dark");
    document.getElementById("light").classList.replace("d-inline", "d-none");
    document.getElementById("dark").classList.replace("d-none", "d-inline");
    document.getElementById("lighImg").style.display = "block";
    document.getElementById("darkImg").style.display = "none";
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

let req = new XMLHttpRequest();

req.open("GET", "https://api.binance.com/api/v3/ticker/price");

req.send();
req.responseType = "json";

req.addEventListener("readystatechange", () => {
  if (req.readyState == 4 && req.status == 200) {
    console.log(req.response[0]);

    let tbody = document.getElementById("tbody");
    let ws = new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr");

    ws.onmessage = (event) => {
      let result = JSON.parse(event.data);
      // console.log(result);
      let table = "";
      for (let i = 1; i <= 10; i++) {
        table += `
<tr>
<td>${i}</td>
<td><img src="../imag/${i}.png">${result[i].s}</td>
<td><span class="rate">${Math.ceil(req.response[i].price)}</span></td>
<td>${result[i].h}</td>
<td>${result[i].E}</td>
<td>${result[i].o}</td>
<td>${result[i].v}</td>
<td>${result[i].v}</td>
<td>${result[i].v}</td>
<td><img class="char" src="../imag/${i}.svg"></td>
</tr>


`;
      }
      tbody.innerHTML = table;
    };
  }
});
