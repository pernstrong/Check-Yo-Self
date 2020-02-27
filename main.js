console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input').value
var taskItem = document.querySelector('.task-item-input').value
var aside = document.querySelector('.aside')

aside.addEventListener('click', routeAsideFunctions)

function routeAsideFunctions(event) {
  // console.log(event.target)
  if (event.target.classList.contains('add-task-item-button-image')) {
    console.log('addTask!')
  } else if (event.target.classList.contains('make-task-list-button')) {
    console.log('makeTask!')
    makeTask()
  } else if (event.target.classList.contains('clear-all-button')) {
    console.log('clearAll!')
    } else if (event.target.classList.contains('filter-by-urgency-button')) {
    console.log('filterByUrgency!')
  }
}

function makeTask() {
  v
}
