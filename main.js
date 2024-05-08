
//variables
let filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const todoUl=document.querySelector(".todolist")
const editInput=document.querySelector("#todoEdit")
const backDrop=document.querySelector(".backdrop")
const closeModalBtn = document.querySelector(".close-modal");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");


// events
todoForm.addEventListener("submit",addNewTodo)
selectFilter.addEventListener("change",(e)=>{
  filterValue=e.target.value
  filterTodo()
});
document.addEventListener("DOMContentLoaded",()=>{
  const todos= getAllTodos()
  console.log(todos);
  createTodo(todos)
});
closeModalBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.stopPropagation());


//functions

function addNewTodo(e){
  e.preventDefault()
  if (!todoInput.value) return null
  const newTodo={
    id:Date.now(),
    createdAt: new Date().toISOString(),
    isComplited:false,
    todoTitle:todoInput.value
  }
  saveTodos(newTodo)
  filterTodo()
}
function createTodo(todos){
let result=""
  todos.forEach(todo => {
    result+=`<li class="todo">
    <p class="todo__title">${todo.todoTitle}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa")}</span>
    <button class="todo__check ${todo.isComplited && "completed"}" data-todo-id=${todo.id}><i class="todo__check far fa-check-square"></i></button > 
    <button class="todo__remove" data-todo-id=${todo.id}><i class="todo__remove far fa-trash-alt"></i></button>
    <button class="todo__edit" data-todo-id=${todo.id}><i class="far fa-solid fa-edit"></i></button>
    `
});
todoList.innerHTML=result
todoInput.value=""
 const removeBtns=[... document.querySelectorAll(".todo__remove")]
 removeBtns.forEach((btn) => btn.addEventListener("click",removeTodo))
 const checkBtns=[... document.querySelectorAll(".todo__check")]
 checkBtns.forEach((btn) => btn.addEventListener("click",checkTodo))
 const editBtns=[... document.querySelectorAll(".todo__edit")]
 editBtns.forEach((btn) => btn.addEventListener("click",editTodo))
}
function filterTodo(){
 const todos= getAllTodos()
switch (filterValue){
  case "all" :{
    createTodo(todos);
    break
  }
  case "completed":{
    const filteredTodos=todos.filter((t) => t.isComplited)
    createTodo(filteredTodos);
    break;
  }
    case "uncompleted":{
      const filteredTodos=todos.filter((t) => !t.isComplited)
      createTodo(filteredTodos);
      break
    }
    default : createTodo(todos)
}}
function removeTodo(e){
  let todos= getAllTodos()
  const toDoId=Number(e.target.dataset.todoId)
  todos=todos.filter((t)=> t.id !== toDoId)
  saveAllTodos(todos)
  filterTodo()
}
function checkTodo(e){
  const todos= getAllTodos()
  const todoIds=e.target.dataset.todoId
  const todo= todos.find((t)=> t.id == todoIds)
  todo.isComplited = !todo.isComplited
  saveAllTodos(todos)
  filterTodo()
}
function editTodo(e){
  const todos= getAllTodos()
  const todoIds=e.target.dataset.todoId
  const todo= todos.find((t)=> t.id == todoIds)
  editInput.classList.remove("hide")
  backDrop.classList.remove("hide")
    editInput.focus()
    editInput.select()
   editInput.value=todo.todoTitle
   editInput.addEventListener("change",(e)=>{
     if (editInput.value !== ""){
    todo.todoTitle=e.target.value
 }else return null
    saveAllTodos(todos)
    filterTodo()
    editInput.classList.add("hide")
    backDrop.classList.add("hide")
  })
}
function closeModal(e) {
  backdrop.classList.add("hide");
}
function getAllTodos(){
    const savedTodos=JSON.parse(localStorage.getItem("todos")) || []
    console.log(savedTodos);
    return savedTodos
}
function saveTodos(todo){
  const savedTodos= getAllTodos()
  savedTodos.push(todo)
  localStorage.setItem("todos",JSON.stringify(savedTodos))
  return savedTodos
}
function saveAllTodos(todos){
  localStorage.setItem("todos",JSON.stringify(todos))
}
