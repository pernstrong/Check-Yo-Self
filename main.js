console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var numberOfLists = 0;
var numberOfTasks = 0;
var currentTasks = [];
var allToDoLists = []

aside.addEventListener('click', routeAsideFunctions)

function routeAsideFunctions(event) {
  // console.log(event.target)
  if (event.target.classList.contains('add-task-item-button-image')) {
    console.log('addTask!')
    createTask();
  } else if (event.target.classList.contains('make-task-list-button')) {
    console.log('createNewTask!')
    createToDoList()
  } else if (event.target.classList.contains('clear-all-button')) {
    console.log('clearAll!')
    } else if (event.target.classList.contains('filter-by-urgency-button')) {
    console.log('filterByUrgency!')
  }
}

function createToDoList() {
  numberOfLists++
  currentTasksString = JSON.stringify(currentTasks)
  var toDoList = new ToDoList(`${numberOfLists}`, `${toDoTitle.value}`, `${currentTasksString}`);
  // console.log(toDoList.id)
  // console.log(toDoList.title)
  // console.log(toDoTitle.value)
  allToDoLists.push(toDoList)
  displayLists()
  toDoList.saveToStorage();
  toDoTitle.value = '';

}

function createTask() {
  numberOfTasks++
  var task = new Task(`${numberOfTasks}`, `${taskItem.value}`);
  console.log(task)
  currentTasks.push(task);
  taskItem.value = '';
}


function displayLists() {
  message = document.querySelector('.no-task-message')
  message.classList.add('hide')
  columnOne = document.querySelector('.column-one');
  columnTwo = document.querySelector('.column-two');
  for (var i = 0; i < allToDoLists.length; i++) {
    // currentTask = allToDoLists[i];
    // var targetColumn;
    // if (i % 2 === 0) {
    //   targetColumn = columnOne;
    // } else {
    //   targetColumn = columnTwo;
    // }
    // debugger
    columnOne.insertAdjacentHTML('beforeend',
    `<div class="task-card">
      <h4 class="task-card-title">Task Title</h4>
      <ul class="task-card-list">
        <li><input type="image" src="assets/images/checkbox.svg">Don't ever play yourself.</li>
        <li><input type="image" src="assets/images/checkbox.svg">Every chance I get, I water the plants</li>
        <li><input type="image" src="assets/images/checkbox.svg">Lion! Cloth talk</li>
      </ul>
      <section class="urgent-button-section">
        <input type="image" src="assets/images/urgent.svg" class="task-card-urgent-button">
        <p>URGENT</p>
      </section>
      <section class="delete-button-section">
      <input type="image" src="assets/images/delete.svg" class="task-card-delete-button">
      <p>DELETE</p>
      </section>
    </div>`
    )
  }
}
