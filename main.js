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

document.getElementById("toglle").onclick = () => {
  document.getElementById("cards").classList.toggle("d-none");
};

let tbody = document.getElementById("tbody");

let req = new XMLHttpRequest();

req.open("GET", "https://api.binance.com/api/v3/ticker/price");
req.send();
req.responseType = "json";
req.addEventListener("readystatechange", () => {
  if (req.status == 200 && req.readyState == 4) {
    console.log(req.response[0]);
    let ws = new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr");

    ws.onmessage = (event) => {
      let result = JSON.parse(event.data);
      // console.log(result);
      let table = "";
      for (let i = 1; i <= 10; i++) {
        table += `
      <tr>
      <td>${i}</td>
      <td><img src="imag/${i}.png">${req.response[i].symbol}</td>
      <td>${result[i].h}</td>
      <td>${result[i].E}</td>
      <td>${result[i].o}</td>
      <td>${result[i].v}</td>
      <td>${req.response[i].price}</td>
      <td>${req.response[i].price}</td>
      <td colspan="2"><img class="char" id="img${i}" src="imag/${i}.svg"></td>
      </tr>
      
      
      `;
      }
      tbody.innerHTML = table;
    };
  }
});

let ws = new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr");

ws.onmessage = (event) => {
  let result = JSON.parse(event.data);
  let card = "";
  // console.log(result);
  for (let i = 1; i < 4; i++) {
    card += `

<div class="card">
<div>
  <div class="image">
    <img src="imag/TrendingIcon.png" alt="" />
    <p>treanding</p>
  </div>
  <a href="#">more > </a>
</div>

<div>
  <div class="image">
    <img src="imag/2.png" alt="" />
    <p>pepe</p>
  </div>
  <a href="#" class="text-success"> <i class="fa-solid fa-angle-up"></i> ${Math.floor(
    result[i].v * 0.00001
  )} % </a>
</div>

<div>
  <div class="image">
    <img src="imag/3.png" alt="" />
    <p>Dogecoin</p>
  </div>
  <a href="#" class="text-danger"> <i class="fa-solid fa-angle-down"></i> ${Math.floor(
    result[i].o * 0.001
  )} % </a>
</div>

<div>
  <div class="image">
    <img src="imag/4.png" alt="" />
    <p>siui</p>
  </div>
  <a href="#" class="text-danger"> <i class="fa-solid fa-angle-down"></i> ${Math.floor(
    result[i].o * 0.001
  )} %   </a>
</div>
</div>
`;
    document.getElementById("cards").innerHTML = card;
  }
};
