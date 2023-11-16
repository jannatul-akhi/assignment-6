const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
}

const displayData = (hubs, dataLimit)=>{
    // console.log(hubs);
    const container = document.getElementById('container');
    toggleSpinner(true);
    container.innerHTML = '';
    

    const showAll = document.getElementById('see-more');
    if(dataLimit && hubs.length > 8){
        hubs = hubs.slice(0,6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    hubs.forEach(hub => {
        // console.log(hub);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card text-start p-4">
            <img src="${hub.image ? hub.image : "https://random.imagecdn.app/500/150"}" class="card-img-top" alt="...">
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
                <button onclick="loadHubDetails(${hub.id})" style="background-color: cornsilk;" class="py-3 px-4 border-0 rounded-5" data-bs-toggle="modal" data-bs-target="#hubModal"><i class="fa-solid fa-arrow-right" style="color: #f57070;"></i></button>
                
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    });
    toggleSpinner(false);
}

const dataLoading = (dataLimit) =>{
    toggleSpinner(true);
    loadData(dataLimit);
}

const toggleSpinner = (isLoading) =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}

document.getElementById('btn-see-more').addEventListener('click', function(){
    dataLoading();
})

const loadHubDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayHubDetails(data);
}

const displayHubDetails = data => {
    console.log(data);
}




loadData(6);