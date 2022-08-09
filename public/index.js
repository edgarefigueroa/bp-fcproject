const form = document.querySelector('form')
const nameInput = document.querySelector('#name-input')
//const countrySelect = document.querySelector('#media-select')
const mediaList = document.querySelector('#media-list')
//const axios = require("axios");

function handleSubmit(e) {
    e.preventDefault()

    if (nameInput.value < 1) {
        alert ('You must enter a city name')
        return
    }

    let userRating = document.querySelector('input[name="rating"]:checked').value
    let body = {
        name: nameInput.value, 
        rating: +userRating, 
        countryId: +countrySelect.value
    }

    axios.post('http://localhost:4004/media', body)
        .then(() => {
            //countrySelect.value = 1
            nameInput.value = ''
            
            getMedia()
        })
}

function deleteCard(id) {
    axios.delete(`http://localhost:4004/media/${id}`)
        .then(() => getMedia())
        .catch(err => console.log(err))
}

// function getMedia() {
//     mediaList.innerHTML = ''
//     axios.get('http://localhost:4004/media')
//         .then(res => {
//             res.data.forEach(elem => {
//                 option.textContent = media.mediaName
//                 let mediaCard = `<div class="media-card">
//                 <h2>${elem.mediaName}, ${elem.mediaType}</h2>
                
//                 <button onclick="deleteCard(${elem['media_id']})">Delete</button>
//                 </div>
//             `  
//             mediaList.innerHTML += mediaCard
//             })
//         })
// }

function getMedia() {
    axios.get('http://localhost:4004/media')
        .then(res => {
            res.data.forEach(media => {
                const option = document.createElement('option')
                option.setAttribute('value', media['media_id'])
                option.textContent = country.mediaName
                countrySelect.appendChild(option)
            })
        })
}


getMedia()

form.addEventListener('submit', handleSubmit)