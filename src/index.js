//Two bugs exist
//1. The user can't seem to toggle the create new toy form
//2. The user can click a toy's like button to increase the like, but it doesn't presist when we reload the page


//This app uses MVC pattern
//Controller.js is the Controller
//Toy.js is the Model
//The DOM is the View


//On load of the page, we create a single controller object that is
//responsible or controlling the state and behavior of the app
document.addEventListener('DOMContentLoaded', function(){
  let controller = new Controller()
  document.querySelector('#new-toy-btn').addEventListener('click', controller.toggleForm.bind(controller))
  controller.fetchToys()
})
