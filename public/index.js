const form = document.querySelector('form')
const mediaType = document.querySelector('#media-type')
const mediaName = document.querySelector('#media-name')
const mediaCreator = document.querySelector('#media-creator')
const mediaImg = document.querySelector('#media-img')
const mediaList = document.querySelector('#mediaList')
const videoGameList = document.getElementById('btnVG')
const boardGameList = document.getElementById('btnBG')
const bookList = document.getElementById('btnBk')

// form function to add entry media
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

// displays media
function getMedia() {
    mediaList.innerHTML = ''
    axios.get('http://localhost:4004/media/')
        .then(res => {
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

function getVideoGames(){
    mediaList.innerHTML = ''
    axios.get('http://localhost:4004/videoGames/')
        .then(res => {
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

function getBoardGames(){
    mediaList.innerHTML = ''
    axios.get('http://localhost:4004/boardGames/')
        .then(res => {
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

function getBooks(){
    mediaList.innerHTML = ''
    axios.get('http://localhost:4004/books/')
        .then(res => {
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

document.getElementById('btnVG').addEventListener("click", getVideoGames)
document.getElementById('btnBG').addEventListener("click", getBoardGames)
document.getElementById('btnBk').addEventListener("click", getBooks)
document.getElementById('btnAM').addEventListener("click", getMedia)