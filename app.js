const FormEle = document.getElementById("form");
const inputEle = document.getElementById("input");
const body = document.getElementsByTagName("body");

let page=1;


FormEle.addEventListener("submit",function(e){
    e.preventDefault();

    if (page==1){
        getdata();
        page++;
        document.body.style.background = "linear-gradient(180deg, red 0%, red 50%, black 50%, black 55%, white 55%, white 100%)";
    } else {
        resetData();
        getdata();
        document.body.style.background = "linear-gradient(180deg, red 0%, red 50%, black 50%, black 55%, white 55%, white 100%)";
    }
    
})



const getdata = async ()=> {
    try {
        const Poke = inputEle.value;
        const Pokelower = Poke.toLowerCase();
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokelower}`);
        const data = await res.json();
        showPoke(data)   
    } catch (err){
        console.log(err);
        alert("Pokemon name or ID are invalid!!");
        document.body.style.background = "red";
    }
    
}

const showPoke = (data) => {
    try {
        const showPoke = document.getElementById("showPoke")
   
        const pokeType = data.types.map(
            (type) => type.type.name).join(', ');
    

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

        
        const Bzone = document.createElement("div")
        Bzone.classList.add("body-zone")

        pokeDetail.appendChild(Bzone)

        const pokeStat = document.createElement("div")
        pokeStat.classList.add("pokeStat")
        Bzone.appendChild(pokeStat)


        for (item in data.stats) {
            const statvalue = document.createElement("p");
            statvalue.innerHTML=`${data.stats[item].stat.name}: ${data.stats[item].base_stat}`;

            pokeStat.appendChild(statvalue);


            const statBar = document.createElement("div");
            statBar.classList.add("stat-bar");
            pokeStat.appendChild(statBar);

            const statpoint = document.createElement("div");
            statpoint.classList.add("stat");
            statBar.appendChild(statpoint);

            let num = ((data.stats[item].base_stat)/255)*100+"%";
            statpoint.style.width = num;

            }


        const Pokeimg = document.createElement("img");
        Pokeimg.src=`${data.sprites.front_default}`;
        Bzone.appendChild(Pokeimg);


        const Fzone = document.createElement("div");
        Fzone.classList.add("foot-zone");
        pokeDetail.appendChild(Fzone);
        Fzone.innerHTML += `<p class="hw">Height: ${data.height}, Weight: ${data.weight}</p>`;

        
    } catch (err) {
        console.log(err);
    }
}


const resetData= () => {
    const pokeshow = document.getElementById("showPoke");
    pokeshow.replaceChildren();
}


function firstCapital(string) {
    return string[0].toUpperCase() + string.slice(1);
}