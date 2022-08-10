//const { createMedia } = require("../server/controller")

const form = document.querySelector('form')
//const nameInput = document.querySelector('#name-input')
const mediaType = document.querySelector('#media-type')
const mediaName = document.querySelector('#media-name')
const mediaCreator = document.querySelector('#media-creator')
const mediaImg = document.querySelector('#media-img')
const mediaList = document.querySelector('#mediaList')
//const axios = require("axios");

function handleSubmit(e) {
    e.preventDefault()

    if (mediaType.value < 1) {
        alert ('You must enter a Media Type')
        return
    }
    if (mediaName.value < 1) {
        alert ('You must enter a Media Name')
        return
    }
    if (mediaCreator.value < 1) {
        alert ('You must enter a Media Creator')
        return
    } 
    if (mediaImg.value < 1) {
        alert ('You must enter a Media Image URL')
        return
    }

    let body = {
        mediaType: mediaType.value,
        mediaName: mediaName.value,
        mediaCreator: mediaCreator.value,
        mediaImg: mediaImg.value
    }

    //createMedia(body)

    axios.post('http://localhost:4004/media', body)
        .then(() => {
            mediaType.value = ''
            mediaName.value = ''
            mediaCreator.value = ''
            mediaImg.value = ''
            
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

//     axios.get('http://localhost:4004/media/')
//         .then(res => {
//             console.log(res.data[0].media_type)
//             let mediaCard = document.createElement('div')
//             res.data.forEach(elem => {
               
//                     mediaCard = `<div class="media-list">
                    
//                     <h2>${elem.media_type}, ${elem.media_name}, ${elem.media_creator}, ${elem.media_img}</h2>    
//                     </div>
//                 `  
//                 mediaList.innerHTML += mediaCard
//             })
//         })
// }

function getMedia() {
    mediaList.innerHTML = ''

    axios.get('http://localhost:4004/media/')
        .then(res => {
            //console.log(res.data[0].media_type)
            let mediaCard = document.createElement('div')
            mediaCard.classList.add('media-card')
            res.data.forEach(elem => {
               
                    mediaCard = `<div class="media-card"><img alt= 'media cover image' src=${elem.media_img} class="media-cover-image"/>
                    <p class="title">Media: ${elem.media_type}<br>Name: ${elem.media_name}<br>Creator: ${elem.media_creator}</p>
                    <div class "btns-cointainer">
                    <button onclick="deleteCard(${elem['media_id']})">Delete</button>
                    </div>
                    </div>
                `  
                
                mediaList.innerHTML += mediaCard
            })
        })
}

getMedia()
form.addEventListener('submit', handleSubmit)