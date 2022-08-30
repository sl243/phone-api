const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    // display show all button
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // display phone 20 items
    // phones = phones.slice(0, 20);

    // display no phone found
    const noPhone = document.getElementById('no-phone-search');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phone
    phones.forEach(phone => {
        // console.log(phone)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
            <div class="col">
                <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p>${phone.brand}</p>
                        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalPhoneDetail">Show Details</button>
                    </div>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })

    // no loader 
    toggleSpinner(false);
}

const showAllPhone = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhones(searchText, dataLimit);
}


document.getElementById('search-phones').addEventListener('click', function () {
    // start Loader
    showAllPhone(10);
})


// input field search even handler 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        showAllPhone(10);
    }
})

// show all button phone
document.getElementById('btn-show-all').addEventListener('click', function () {
    showAllPhone();
})

// loader spinner function 
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const modalPhoneTitle = document.getElementById('modalPhoneDetailLabel');
    modalPhoneTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p> Brand: ${phone.brand ? phone.brand : 'Phone Brand Not Found'} </p>
        <p> Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'Display Size Not Found'}
        <p> Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'Memory Not Found'}
        <p> Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'Memory Not Found'}
        <p> Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No Sensor'}
        <p> Release Date: ${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found'} </p>
    `;
}

loadPhones('a')