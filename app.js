const FormEle = document.getElementById("form");
const inputEle = document.getElementById("input");
const body = document.getElementsByTagName("body");

let page = 1;

FormEle.addEventListener("submit", function (e) {
  e.preventDefault();
  if (page == 1) {
    getdata();
    page++;
  } else {
    resetData();
    getdata();
  }
});

const getdata = async () => {
  try {
    const Poke = inputEle.value;
    const Pokelower = Poke.toLowerCase();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokelower}`);
    const data = await res.json();
    document.body.style.background =
      "linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)),url(./images/success.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    showPoke(data);
  } catch (err) {
    document.body.style.background =
      "linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)),url(./images/Fail.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "20% 30%";
    alert("Pokemon name or ID are invalid!!");
  }
};

const showPoke = (data) => {
  try {
    const showPoke = document.getElementById("showPoke");

    const pokeType = data.types.map((type) => type.type.name).join(", ");

    const pokeDetail = document.createElement("div");
    pokeDetail.classList.add("pokeDetail");
    showPoke.appendChild(pokeDetail);

    const Hzone = document.createElement("div");
    Hzone.classList.add("head-zone");

    pokeDetail.appendChild(Hzone);

    Hzone.innerHTML += `
            <div>
                <p class="numid">#${data.id}</p>
                <p class="pokename">${firstCapital(data.name)}</p>
            </div>
            <p class="type">Type: ${pokeType}</p>
        `;

    const Bzone = document.createElement("div");
    Bzone.classList.add("body-zone");

    pokeDetail.appendChild(Bzone);

    const Pokeimg = document.createElement("img");

    const src1 = `${data.sprites.front_default}`;
    const src2 = `${data.sprites.back_default}`;

    Pokeimg.src = src1;

    Bzone.appendChild(Pokeimg);

    function imgChange(src1, src2) {
      const pic1 = src1;
      const pic2 = src2;

      let isSrc1 = true;

      const intervalfunc = setInterval(() => {
        Pokeimg.src = isSrc1 ? src1 : src2;
        isSrc1 = !isSrc1;
      }, 2000);

      Pokeimg.onmouseenter = function () {
        clearInterval(intervalfunc);
      };
    }

    imgChange(src1, src2);

    const pokeStat = document.createElement("div");
    pokeStat.classList.add("pokeStat");
    Bzone.appendChild(pokeStat);

    for (item in data.stats) {
      const statvalue = document.createElement("p");
      statvalue.innerHTML = `${data.stats[item].stat.name}: ${data.stats[item].base_stat}`;

      pokeStat.appendChild(statvalue);

      const statBar = document.createElement("div");
      statBar.classList.add("stat-bar");
      pokeStat.appendChild(statBar);

      const statpoint = document.createElement("div");
      statpoint.classList.add("stat");
      statBar.appendChild(statpoint);

      let num = (data.stats[item].base_stat / 255) * 100 + "%";
      statpoint.style.width = 0;
      statpoint.style.transition = "width 3s";
      setTimeout(() => {
        statpoint.style.width = num;
      }, 500);
    }

    const Fzone = document.createElement("div");
    Fzone.classList.add("foot-zone");
    pokeDetail.appendChild(Fzone);
    Fzone.innerHTML += `<p class="hw">Height: ${data.height}, Weight: ${data.weight}</p>`;
  } catch (err) {
    console.log(err);
  }
};

const resetData = () => {
  const pokeshow = document.getElementById("showPoke");
  pokeshow.replaceChildren();
};

function firstCapital(string) {
  return string[0].toUpperCase() + string.slice(1);
}
