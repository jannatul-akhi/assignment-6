let sorting = [];

const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
    sorting = data.data.tools;
}

const displayData = (hubs, dataLimit)=>{
    console.log(hubs);
    const container = document.getElementById('container');
    toggleSpinner(true);
    container.innerHTML = '';

    
    // Arr.sort(function (a, b) {
    //     return new Date(a.date) - new Date(b.date);
    // });

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
                <button onclick="loadHubDetails('${hub.id}')" style="background-color: cornsilk;" class="py-3 px-4 border-0 rounded-5" data-bs-toggle="modal" data-bs-target="#hubModal"><i class="fa-solid fa-arrow-right" style="color: #f57070;"></i></button>
                
                </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    });
    toggleSpinner(false);
}

const sortByDate = () =>{
    
    // console.log(JSON.stringify(hubs));
    const arr = sorting.sort(function(a,b){
        return new Date(a.published_in) - new Date(b.published_in);
    });
    displayData(arr);
}


document.getElementById('sort-date').addEventListener('click', function(){
    sortByDate();
})

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
    displayHubDetails(data.data);
}

const displayHubDetails = data => {
    console.log(data.accuracy.score);
    const leftModal = document.getElementById('left-modal');
    leftModal.innerHTML=`
    <h5 style="color: black;" class="text-start fw-bold p-4">${data.description}</h5>
    <div class="d-flex justify-content-evenly my-4 ">
        <div style="color: green;" class="px-3 pt-4 bg-white rounded-3 fw-semibold w-25">${data.pricing[0].price ? data.pricing[0].price: 'Free of cost'}<br>/Basic</div>
        <div style="color: orange;" class="px-3 pt-4 bg-white rounded-3 fw-semibold w-25">${data.pricing[1].price ? data.pricing[1].price: 'Free of cost'}<br>/Pro</div>
        <div style="color: red;" class="px-3 py-4 bg-white rounded-3 fw-semibold w-25">${data.pricing[2].price ? data.pricing[2].price: 'Free of cost'}<br>/Enterprise</div>
    </div>

    <div style="color: black;" class="d-flex text-start gap-2">
        <div class="w-50 pb-2 ps-5 pe-2">
            <h4 class="fw-bold">Features</h4>
            <ul>
                <li>${data.features['1'].feature_name}</li>
                <li>${data.features['2'].feature_name}</li>
                <li>${data.features['3'].feature_name}</li>
            </ul>
        </div>
        <div class="w-50 pb-2 ps-2 pe-5">
            <h4 class="fw-bold">Integrations</h4>
            <ul>
                <li>${data.integrations[0] ? data.integrations[0] : "No data found"}</li>
                <li>${data.integrations[1] ? data.integrations[1] : "No data found"}</li>
                <li>${data.integrations[2] ? data.integrations[2] : "No data found"}</li>
            </ul>
        </div>
    </div>
    `;

    const rightModal = document.getElementById('right-modal');
    rightModal.innerHTML = `
    <div class="position-relative">
        <img class="img-fluid" src="${data.image_link ? data.image_link[0] : 'No Image'}">
        <span style="bottom:200px; right:30px;background-color:#fb5200; padding:8px 15px; color:white;border-radius:10px"  class="position-absolute translate-middle badge rounded-pill bg-danger   ${data.accuracy.score ? 'd-block' : 'd-none'}">
     ${Math.round(data.accuracy.score * 100)} % accuacacy
     </span>
    </div>
    <div class="mt-3">
        <h4 class="fw-bold">${data.input_output_examples[0].input ? data.input_output_examples[0].input : data.input_output_examples[1].input}</h4>
        <p>${data.input_output_examples[0].output ? data.input_output_examples[0].output : data.input_output_examples[1].output}</p>
    </div>
    `;

    
}




loadData(6);