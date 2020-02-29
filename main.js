console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var numberOfLists = -1;
var numberOfTasks = -1;
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
  } else if (event.target.classList.contains('task-aside')) {
    deleteTaskOnAside(event)
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
  // console.log(task)
  currentTasks.push(task);
  displayTaskOnAside()
  taskItem.value = '';
}

function displayTaskOnAside() {
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  // console.log(currentTasks)
  asideTaskListArea.innerHTML = '';
  for (var i = 0; i < currentTasks.length; i++) {
    // console.log(currentTasks[i].objective)
    asideTaskListArea.insertAdjacentHTML('beforeend',
    `<li data-linum="${[i]}"><input type="image" class="task-aside" src="assets/images/delete.svg" data-tasknum="${[i]}">${currentTasks[i].objective}</li>
    `)
  }
  // asideTaskListArea.insertAdjacentHTML('beforeend',`
  // <li><input type="image" class="task-aside" src="assets/images/delete.svg">${task.objective}</li>
  // `)
}


function deleteTaskOnAside(event) {
  console.log(currentTasks)
  console.log(event.target)
  buttonSelectedIndex = event.target.dataset.tasknum
  console.log(buttonSelectedIndex)
  currentTasks.splice(buttonSelectedIndex, 1)
  console.log(currentTasks)
  displayTaskOnAside()
}

function displayLists() {
  // message = document.querySelector('.no-task-message')
  // message.classList.add('hide')
  columnOne = document.querySelector('.column-one');
  columnTwo = document.querySelector('.column-two');
  for (var i = 0; i < allToDoLists.length; i++) {
    currentList  = allToDoLists[i];
    // debugger
    console.log(currentList)
    // currentListFormatted = JSON.parse(currentList)
    // console.log(currentListFormatted)
    console.log(currentList.tasks[0])
    var targetColumn;
    if (i % 2 === 0) {
      targetColumn = columnOne;
    } else {
      targetColumn = columnTwo;
    }
    // debugger
    // columnOne.insertAdjacentHTML('beforeend',
    console.log(currentList.tasks[i])
    targetColumn.innerHTML =
    `<div class="task-card">
      <h4 class="task-card-title">${currentList.title}</h4>
      <ul class="task-card-list">
        <!-- <li><input type="image" src="assets/images/checkbox.svg">${currentList.tasks[i].objective}</li>
        <li><input type="image" src="assets/images/checkbox.svg">Every chance I get, I water the plants</li>
        <li><input type="image" src="assets/images/checkbox.svg">Lion! Cloth talk</li> -->
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
  // )
  }
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = ''
  // displayTasksOnList()
}

// function displayTasksOnList() {
//   // console.log(currentList.tasks.objective)
//   var taskCardList = document.querySelector('.task-card-list')
//   for (var i = 0; i < currentTasks.length; i++) {
//     // var currentTask = JSON.parse('currentList.tasks[i].objective')
//     taskCardList.innerHTML =
//     `<li>${currentTask}</li>
//     `
//
//   }
// }












// formatListToDisplay() {
//
// }
// function displayLists() {
//   // message = document.querySelector('.no-task-message')
//   // message.classList.add('hide')
//   columnOne = document.querySelector('.column-one');
//   columnTwo = document.querySelector('.column-two');
//   for (var i = 0; i < allToDoLists.length; i++) {
//     currentList = allToDoLists[i];
//     var targetColumn;
//     if (i % 2 === 0) {
//       targetColumn = columnOne;
//     } else {
//       targetColumn = columnTwo;
//     }
//     // debugger
//     // columnOne.insertAdjacentHTML('beforeend',
//
//     targetColumn.innerHTML =
//     `<div class="task-card">
//       <h4 class="task-card-title">${currentList.title}</h4>
//       <ul class="task-card-list">
//         <li><input type="image" src="assets/images/checkbox.svg">${currentList.tasks[i].objective}</li>
//         <li><input type="image" src="assets/images/checkbox.svg">Every chance I get, I water the plants</li>
//         <li><input type="image" src="assets/images/checkbox.svg">Lion! Cloth talk</li>
//       </ul>
//       <section class="urgent-button-section">
//         <input type="image" src="assets/images/urgent.svg" class="task-card-urgent-button">
//         <p>URGENT</p>
//       </section>
//       <section class="delete-button-section">
//       <input type="image" src="assets/images/delete.svg" class="task-card-delete-button">
//       <p>DELETE</p>
//       </section>
//     </div>`
//   // )
//   }
// }
