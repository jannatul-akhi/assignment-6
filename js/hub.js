const loadData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools);
}

const displayData = hubs =>{
    // console.log(hubs);
    const container = document.getElementById('container');
    hubs.forEach(hub => {
        console.log(hub.published_in);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card text-start p-4">
            <img src="${hub.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold">Features</h5>
                <ol class="card-text">
                    <li>${hub.features[0]}</li>
                    <li>${hub.features[1]}</li>
                    <li>${hub.features[2]}</li>
                </ol>
            </div>
            <hr class="w-75 mx-auto">
            <div class="d-flex align-items-center">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${hub.name}</h5>
                    <p class="card-text"><i class="fa-solid fa-calendar-days" style="color: #969292;"></i> ${hub.published_in}</p>
                </div>
                <div>
                <button style="background-color: cornsilk;" class="py-3 px-4 border-0 rounded-5"><i class="fa-solid fa-arrow-right" style="color: #f57070;"></i></button>
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    });
}


loadData();