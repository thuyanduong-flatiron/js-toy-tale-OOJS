const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    document.querySelector('.add-toy-form').addEventListener('submit', addNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})
fetchToys()

function fetchToys(){
  fetch(`http://localhost:3000/toys`)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(toy => render(toy))
  })
}

function addNewToy(event){
  event.preventDefault()
  let name = document.querySelector('#name').value
  let image = document.querySelector('#image').value
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }).then(response => response.json())
  .then(jsonData => render(jsonData))
}

function render(toy){
  let container = document.querySelector('#toy-collection')
  let toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyCard.id = toy.id
  toyCard.innerHTML =
    `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p><span class='like'>${toy.likes}</span> Likes <p>`
  let button = document.createElement('button')
  button.innerHTML = `Like`
  button.addEventListener('click', likeToy)
  button.dataset.toyId = toy.id
  toyCard.appendChild(button)
  container.appendChild(toyCard)
}

function likeToy(event){
  let toyId = event.target.dataset.toyId
  let likes = parseInt(document.getElementById(`${toyId}`).querySelector('span').innerHTML) + 1
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  }).then(response => response.json())
  .then(jsonData => {
    document.getElementById(`${toyId}`).querySelector('span').innerHTML = likes
  })
}
