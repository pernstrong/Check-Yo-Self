console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var main = document.querySelector('.main')
var numberOfLists = -1;
var numberOfTasks = -1;
var currentTasks = [];
var allToDoLists = [];

window.addEventListener('load', loadFromStorage)
aside.addEventListener('click', routeAsideFunctions)
main.addEventListener('click', routeListFunctions)

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

function routeListFunctions(event) {
  console.log(event.target)
  if (event.target.classList.contains('task-input')) {
    findListToUpdateTaskComplete(event)
  } else if (event.target.classList.contains('task-card-urgent-button')) {
    findListToUpdateUrgency(event)
  } else if (event.target.classList.contains('task-card-delete-button')) {
    console.log('delete')
    findListToDelete(event);
  }
  }

  function findListToDelete(event) {
    var taskId = event.target.dataset.id
    // console.log(taskId)
    for (var i = 0; i < allToDoLists.length; i++) {
      if (taskId == allToDoLists[i].id) {
        allToDoLists[i].deleteFromStorage(i)
      }
    }
  }

function findListToUpdateUrgency(event) {
  var taskId = event.target.dataset.id
  // console.log(taskId)
  for (var i = 0; i < allToDoLists.length; i++) {
    if (taskId == allToDoLists[i].id) {
      allToDoLists[i].updateToDo()
    }
  }
}

function findListToUpdateTaskComplete(event) {
  var taskId = event.target.dataset.id
  var allTasks = event.target.closest('.task-card-list')
  var currentListToUpdateIndex;
  for (var i = 0; i < allToDoLists.length; i++) {
    if (allTasks.dataset.id == allToDoLists[i].id) {
      currentListToUpdateIndex = i
      findListInArrayToUpdate(currentListToUpdateIndex, taskId)
    }
  }

  function findListInArrayToUpdate(currentListToUpdateIndex, taskId) {
    currentListToUpdate = allToDoLists[currentListToUpdateIndex]
    // console.log(currentListToUpdate)
    currentListToUpdate.updateTask(taskId)
  }
}

function createToDoList() {
  currentTasksString = JSON.stringify(currentTasks)
  var toDoList = new ToDoList(Date.now(), `${toDoTitle.value}`, `${currentTasksString}`);
  allToDoLists.push(toDoList)
  var currentList = toDoList
  toDoList.formatTasks();
  toDoList.saveToStorage();
  displayList(currentList)
  toDoTitle.value = '';
}

function createTask() {
  numberOfTasks++
  var task = new Task(Date.now(), `${taskItem.value}`);
  // console.log(task.id)
  currentTasks.push(task);
  displayTaskOnAside()
  taskItem.value = '';
}

function displayTaskOnAside() {
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = '';
  for (var i = 0; i < currentTasks.length; i++) {
    asideTaskListArea.insertAdjacentHTML('beforeend',
      `<li data-linum="${[i]}"><input type="image" class="task-aside" src="assets/images/delete.svg"
    data-id="${currentTasks[i].id}" data-tasknum="${[i]}">${currentTasks[i].objective}</li>
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
  if (indexOfList % 2 === 0) {
    targetColumn = columnOne;
  } else {
    targetColumn = columnTwo;
  }
  targetColumn.insertAdjacentHTML('afterbegin',
    `<div class="task-card">
        <h4 class="task-card-title">${toDoList.title}</h4>
        <ul class="task-card-list${toDoList.id} task-card-list" data-id="${toDoList.id}">
        </ul>
        <section class="urgent-button-section">
          <input type="image" src="assets/images/urgent.svg" class="task-card-urgent-button" data-id="${toDoList.id}">
          <p>URGENT</p>
        </section>
        <section class="delete-button-section">
        <input type="image" src="assets/images/delete.svg" class="task-card-delete-button" data-id="${toDoList.id}">
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
      `<li><input type="image" src="assets/images/checkbox.svg" class="task-input" data-id="${currentTasks[i].id}">${task.objective}</li>
      `
    )
    asideTaskListArea = document.querySelector('.aside-task-list-area')
    asideTaskListArea.innerHTML = ''
  }
  currentTasks = []
}


function loadFromStorage() {
  // console.log(allToDoLists)
  var listsFromStorage = JSON.parse(localStorage.getItem('allToDoLists'))
  // allToDoLists = listsFromStorage
  // console.log(listsFromStorage)
  if (listsFromStorage === null) {
    return
  } else {
    for (var i = 0; i < listsFromStorage.length; i++) {
      var toDoList = new ToDoList(listsFromStorage[i].id, listsFromStorage[i].title, listsFromStorage[i].tasks, listsFromStorage[i].urgent);
      // console.log(toDoList)
      allToDoLists.push(toDoList)
      // console.log(allToDoLists)
    }
  }
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

function displayTasksFromStorage(currentList) {
  taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
  taskCardList.innerHTML = ''
  // taskIndArray = currentList.tasks
  // taskIndArray = JSON.parse(currentList.tasks)
  for (var i = 0; i < currentList.tasks.length; i++) {
    var task = currentList.tasks[i]
    taskCardList.insertAdjacentHTML('beforeend',
      `<li><input type="image" src="assets/images/checkbox.svg" data-id="${task.id}" class="task-input">${task.objective}</li>
    `
    )
  }
}
