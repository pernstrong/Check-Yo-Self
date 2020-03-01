console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var numberOfLists = -1;
var numberOfTasks = -1;
var currentTasks = [];
var allToDoLists = [];

window.addEventListener('load', loadFromStorage)
aside.addEventListener('click', routeAsideFunctions)

function routeAsideFunctions(event) {
  if (event.target.classList.contains('add-task-item-button-image')) {
    checkTaskInputValue()
  } else if (event.target.classList.contains('make-task-list-button')) {
    console.log('createNewTask!')
    checkTitleInputValue()
  } else if (event.target.classList.contains('clear-all-button')) {
    console.log('clearAll!')
    clearTasksOnAside(event)
    } else if (event.target.classList.contains('filter-by-urgency-button')) {
    console.log('filterByUrgency!')
  } else if (event.target.classList.contains('task-aside')) {
    deleteTaskOnAside(event)
  }
  }

  function checkTaskInputValue() {
    if (taskItem.value === '') {
      return
    } else {
      createTask()
    }
  }

  function checkTitleInputValue() {
    if ((toDoTitle.value === '') || (currentTasks.length == 0)) {
      return
    } else {
      createToDoList()
    }
  }

function createToDoList() {
  currentTasksString = JSON.stringify(currentTasks)
  var toDoList = new ToDoList(Date.now(), `${toDoTitle.value}`, `${currentTasksString}`);
  allToDoLists.push(toDoList)
  var currentList = toDoList
  toDoList.saveToStorage();
  displayList(currentList)
  toDoTitle.value = '';
}

function createTask() {
  numberOfTasks++
  var task = new Task(`${numberOfTasks}`, `${taskItem.value}`);
  currentTasks.push(task);
  displayTaskOnAside()
  taskItem.value = '';
}

function displayTaskOnAside() {
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = '';
  for (var i = 0; i < currentTasks.length; i++) {
    asideTaskListArea.insertAdjacentHTML('beforeend',
    `<li data-linum="${[i]}"><input type="image" class="task-aside" src="assets/images/delete.svg" data-tasknum="${[i]}">${currentTasks[i].objective}</li>
    `)
  }
}

function deleteTaskOnAside(event) {
  buttonSelectedIndex = event.target.dataset.tasknum
  currentTasks.splice(buttonSelectedIndex, 1)
  displayTaskOnAside()
}

function clearTasksOnAside(event) {
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = '';
  toDoTitle.value = '';
  taskItem.value = '';
  currentTasks = [];
}

function displayList(currentList, i) {
    columnOne = document.querySelector('.column-one');
    columnTwo = document.querySelector('.column-two');
    noTaskMessage = document.querySelector('.no-task-message')
    var toDoList = currentList
    var indexOfList = allToDoLists.indexOf(currentList)
      var targetColumn;
      if (allToDoLists.length > 0) {
        noTaskMessage.innerHTML = ''
      }
      if (indexOfList % 2 === 0){
        targetColumn = columnOne;
      } else {
        targetColumn = columnTwo;
      }
      targetColumn.insertAdjacentHTML('afterbegin',
      `<div class="task-card">
        <h4 class="task-card-title">${toDoList.title}</h4>
        <ul class="task-card-list${toDoList.id}">
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
    displayTasksInCards(currentList);
  }


  function displayTasksInCards(currentList) {
    taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
    taskCardList.innerHTML = ''
    for (var i = 0; i < currentTasks.length; i++) {
      var task = currentTasks[i]
      taskCardList.insertAdjacentHTML('beforeend',
      `<li><input type="image" src="assets/images/checkbox.svg">${task.objective}</li>
      `
    )
    asideTaskListArea = document.querySelector('.aside-task-list-area')
    asideTaskListArea.innerHTML = ''
    }
    currentTasks = []
}


function loadFromStorage() {
  var listsFromStorage = JSON.parse(localStorage.getItem('allToDoLists'))
  allToDoLists = listsFromStorage
  if (allToDoLists === null) {
    allToDoLists = []
  }
  formatListsToDisplay()
}

function formatListsToDisplay() {
  for (var i = 0; i < allToDoLists.length; i++) {
    currentList = allToDoLists[i]
    displayList(currentList, i)
    displayTasksFromStorage(currentList)
  }
}

function displayTasksFromStorage(currentList){
  taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
  taskCardList.innerHTML = ''
    taskIndArray = JSON.parse(currentList.tasks)
  for (var i = 0; i < taskIndArray.length; i++) {
    var task = taskIndArray[i]
    taskCardList.insertAdjacentHTML('beforeend',
    `<li><input type="image" src="assets/images/checkbox.svg">${task.objective}</li>
    `
  )
}
}
