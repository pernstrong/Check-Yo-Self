// all global variables
var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var main = document.querySelector('.main')
var search = document.querySelector('.search-input')
var currentTasks = [];
var allToDoLists = [];
// all event listeners
window.addEventListener('load', loadFromStorage)
aside.addEventListener('click', routeAsideFunctions)
main.addEventListener('click', routeListFunctions)
search.addEventListener('keyup', searchTitles)

// routing function for EP on aside bar
function routeAsideFunctions(event) {
  if (event.target.classList.contains('add-task-item-button-image')) {
    checkTaskInputValue()
  } else if (event.target.classList.contains('make-task-list-button')) {
    checkTitleInputValue()
  } else if (event.target.classList.contains('clear-all-button')) {
    clearTasksOnAside(event)
  } else if (event.target.classList.contains('filter-by-urgency-button')) {
    filterByUrgency()
  } else if (event.target.classList.contains('task-aside')) {
    deleteTaskOnAside(event)
  }
}

// routing function for EP on main
function routeListFunctions(event) {
  if (event.target.classList.contains('task-input')) {
    findListToUpdateTaskComplete(event)
  } else if (event.target.classList.contains('task-card-urgent-button')) {
    findListToUpdateUrgency(event)
  } else if (event.target.classList.contains('task-card-delete-button')) {
    findListToDelete(event);
  }
}

// prevents create task button from working with no input
function checkTaskInputValue() {
  if (taskItem.value === '') {
    return
  } else {
    createTask()
  }
}

// prevents create list  from working with no nput
function checkTitleInputValue() {
  if ((toDoTitle.value === '') || (currentTasks.length == 0)) {
    return
  } else {
    createToDoList()
  }
}

// finds the correct list when the delete button is clicked
function findListToDelete(event) {
  var taskId = event.target.dataset.id
  var selectedDiv = event.target.closest('.task-card')
  for (var i = 0; i < allToDoLists.length; i++) {
    if (taskId == allToDoLists[i].id) {
      allToDoLists[i].deleteFromStorage(i, selectedDiv)
    }
  }
}

// finds the correct list when urgency button is clicked
function findListToUpdateUrgency(event) {
  var taskId = event.target.dataset.id
  var selectedDiv = event.target.closest('.task-card')
  for (var i = 0; i < allToDoLists.length; i++) {
    if (taskId == allToDoLists[i].id) {
      allToDoLists[i].updateToDo(selectedDiv)
      updateDomUrgency(selectedDiv, allToDoLists[i].id)
    }
  }
}

// finds correct list in dom to update when task is clicked
function findListToUpdateTaskComplete(event) {
  var taskId = event.target.dataset.id
  var allTasks = event.target.closest('.task-card-list')
  var selectedDiv = event.target.closest('.task-card')
  var currentListToUpdateIndex;
  for (var i = 0; i < allToDoLists.length; i++) {
    if (allTasks.dataset.id == allToDoLists[i].id) {
      currentListToUpdateIndex = i
      findListInArrayToUpdate(currentListToUpdateIndex, taskId, selectedDiv)
    }
  }

  // finds correct list in data model to update when task clicked
  function findListInArrayToUpdate(currentListToUpdateIndex, taskId, selectedDiv) {
    currentListToUpdate = allToDoLists[currentListToUpdateIndex]
    currentListToUpdate.updateTask(taskId, selectedDiv)
    updateDomTaskComplete(taskId, selectedDiv)
    changeDeletePicture(currentListToUpdate, selectedDiv)
  }
}

// changes delete button color/picture when all tasks are marked complete
function changeDeletePicture(currentListToUpdate, selectedDiv) {
  var deleteButton = document.querySelector(`.delete-image${currentListToUpdate.id}`)
  deleteButton.src = 'assets/images/delete.svg'
  for (var i = 0; i < currentListToUpdate.tasks.length; i++) {
    if (currentListToUpdate.tasks[i].complete == false) {
      return
    }
  }
  deleteButton.src = 'assets/images/delete-active.svg'
}

// instantiates a new toDoList from ToDoList class
function createToDoList() {
  currentTasksString = JSON.stringify(currentTasks)
  var toDoList = new ToDoList(Date.now(), `${toDoTitle.value}`, `${currentTasksString}`);
  allToDoLists.push(toDoList)
  var currentList = toDoList
  toDoList.formatTasks();
  toDoList.saveToStorage();
  displayListFindColumns(currentList);

  toDoTitle.value = '';
}

// instantiates a new task from Task class
function createTask() {
  var task = new Task(Date.now(), `${taskItem.value}`);
  currentTasks.push(task);
  displayTaskOnAside()
  taskItem.value = '';
}

//temporarily displays task on aside while creating them, before list is made
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

// removes the task on the aside when clicked
function deleteTaskOnAside(event) {
  buttonSelectedIndex = event.target.dataset.tasknum
  currentTasks.splice(buttonSelectedIndex, 1)
  displayTaskOnAside()
}

// clears all tasks and title on aside when clear button clicked
function clearTasksOnAside(event) {
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = '';
  toDoTitle.value = '';
  taskItem.value = '';
  currentTasks = [];
}

// alternates between the two columns to display each list
function displayListFindColumns(currentList, i) {
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
  displayList(toDoList, targetColumn)
}

// displays the list in the appropriate column
function displayList(toDoList, targetColumn) {
  {
    targetColumn.insertAdjacentHTML('afterbegin',
      `<div class="task-card task-card-id${toDoList.id}">
        <h4 class="task-card-title">${toDoList.title}</h4>
        <ul class="task-card-list${toDoList.id} task-card-list" data-id="${toDoList.id}">
        </ul>
        <section class="urgent-button-section">
          <input type="image" src="assets/images/urgent.svg" class="task-card-urgent-button task-card-urgent-button${toDoList.id}" data-id="${toDoList.id}">
          <p>URGENT</p>
        </section>
        <section class="delete-button-section">
        <input type="image" src="assets/images/delete.svg" class="task-card-delete-button delete-image${toDoList.id}" data-id="${toDoList.id}">
        <p>DELETE</p>
        </section>
      </div>`
    )
  }
  var urgentImage = document.querySelector(`.task-card-urgent-button${toDoList.id}`)
  var currentDiv = document.querySelector(`.task-card-id${toDoList.id}`)
  var currentUL = document.querySelector(`.task-card-list${toDoList.id}`)
  keepUrgency(toDoList, urgentImage, currentDiv, currentUL)
  changeDeletePicture(toDoList, currentDiv)
  displayTasksInCards(toDoList)
}

// adds urgency picture and colors upon refresh of page
function keepUrgency(toDoList, urgentImage, currentDiv, currentUL) {
  if (toDoList.urgent == true) {
    urgentImage.src = "assets/images/urgent-active.svg"
    currentDiv.classList.add('urgent-card-active')
    currentUL.classList.add('task-card-list-active')
    displayTasksInCards(currentList);
  }
}

// displays the tasks within the correct list
function displayTasksInCards(currentList) {
  taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
  taskCardList.innerHTML = ''
  for (var i = 0; i < currentList.tasks.length; i++) {
    var task = currentList.tasks[i]
    if (task.complete === true) {
      taskCardList.insertAdjacentHTML('beforeend',
        `<li class="list-item list-item-active"><input type="image" src="assets/images/checkbox-active.svg" data-id="${task.id}" class="task-input task-input${task.id}">${task.objective}</li>`
      )
    } else {
      taskCardList.insertAdjacentHTML('beforeend',
        `<li class="list-item"><input type="image" src="assets/images/checkbox.svg" data-id="${task.id}" class="task-input task-input${task.id}">${task.objective}</li>`
      )
    }
  }
  clearAsideTasks()
}

// clears aside inputs and currentTask array
function clearAsideTasks() {
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = ''
  currentTasks = []
}

// retrieves the array of lists from local storage and instantiates new object instance
function loadFromStorage() {
  var listsFromStorage = JSON.parse(localStorage.getItem('allToDoLists'))
  if (listsFromStorage === null) {
    return
  } else {
    for (var i = 0; i < listsFromStorage.length; i++) {
      var toDoList = new ToDoList(listsFromStorage[i].id, listsFromStorage[i].title, listsFromStorage[i].tasks, listsFromStorage[i].urgent);
      allToDoLists.push(toDoList)
    }
  }
  if (allToDoLists === null) {
    allToDoLists = []
  }
  formatListsToDisplay()
}

// sends each list individually to be displayed
function formatListsToDisplay() {
  for (var i = 0; i < allToDoLists.length; i++) {
    currentList = allToDoLists[i]
    displayListFindColumns(currentList, i);
    displayTasksInCards(currentList);
  }
}

// deletes the selected div from the DOM when clicked
function deleteFromDom(i, selectedDiv) {
  selectedDiv.classList.add('hide')
}

// updates the dom urgency with picture and colors
function updateDomUrgency(selectedDiv, id) {
  selectedDiv.classList.toggle('urgent-card-active')
  var card = document.querySelector(`.task-card-list${id}`)
  card.classList.toggle('task-card-list-active')
  var buttonPic = document.querySelector(`.task-card-urgent-button${id}`)
  if (buttonPic.getAttribute('src') == "assets/images/urgent.svg") {
    buttonPic.src = "assets/images/urgent-active.svg";
  } else {
    buttonPic.src = "assets/images/urgent.svg"
  }
}

// updates the DOM task with font color, style and input picture
function updateDomTaskComplete(taskId, selectedDiv) {
  var taskButton = document.querySelector(`.task-input${taskId}`)
  if (taskButton.getAttribute('src') == "assets/images/checkbox.svg") {
    taskButton.src = "assets/images/checkbox-active.svg"
  } else {
    taskButton.src = "assets/images/checkbox.svg"
  }
  var listItem = taskButton.closest('.list-item')
  listItem.classList.toggle('list-item-active')
}

// search input will cause this function to start searching, finds a title and associated div one at a time and then sends to searchTitlesByLetter function
function searchTitles() {
  searchInput = search.value
  var urgentButton = document.querySelector('.filter-by-urgency-button')
  for (var i = 0; i < allToDoLists.length; i++) {
    var currentDiv = document.querySelector(`.task-card-id${allToDoLists[i].id}`)
    var currentTitle = allToDoLists[i].title
    if ((searchInput == '') && (urgentButton.classList.contains('filter-by-urgency-button-active'))) {
      removeUnurgentHides()
    } else if (searchInput == '') {
      removeAllHides()
    } else {
      searchTitlesByLetter(currentTitle, searchInput, allToDoLists[i])
    }
  }
}

// searches titles individually, changed from by letter to use .includes
function searchTitlesByLetter(currentTitle, searchInput, currentList) {
  for (var i = 0; i < searchInput.length; i++) {
    var urgentButton = document.querySelector('.filter-by-urgency-button')
    var currentDiv = document.querySelector(`.task-card-id${currentList.id}`)
    if (urgentButton.classList.contains('filter-by-urgency-button-active')) {
      searchByUrgency(currentTitle, searchInput, currentList)
    } else if (currentTitle.includes(searchInput)) {
      currentDiv.classList.remove('hide')
    } else {
      currentDiv.classList.add('hide')
    }
  }
}

// if urgent button is active, only searches through lists marked urgent
function searchByUrgency(currentTitle, searchInput, currentList) {
  for (var i = 0; i < searchInput.length; i++) {
    var currentDiv = document.querySelector(`.task-card-id${currentList.id}`)
    if (currentList.urgent == false) {} else if (currentTitle.includes(searchInput)) {
      currentDiv.classList.remove('hide')
    } else if ((searchInput = '') && (currentList.urgency == false)) {
      currentDiv.classList.add('hide')

    } else {
      currentDiv.classList.add('hide')

    }
  }
}

// removes the hide class from all lists/divs
function removeAllHides() {
  for (var i = 0; i < allToDoLists.length; i++) {
    var currentDiv = document.querySelector(`.task-card-id${allToDoLists[i].id}`)
    currentDiv.classList.remove('hide')
  }
}

// removes hide class from urgent lists/divs, used when filter by urgency button is active
function removeUnurgentHides() {
  for (var i = 0; i < allToDoLists.length; i++) {
    var currentDiv = document.querySelector(`.task-card-id${allToDoLists[i].id}`)
    if (allToDoLists[i].urgent == true) {
      currentDiv.classList.remove('hide')
    } else if (allToDoLists[i].urgent == false) {
      currentDiv.classList.add('hide')
    }
  }
}

// displays only urgent tasks when filter by urgency button is active
function filterByUrgency() {
  var noUrgentMessage = document.querySelector('.no-urgent-message')
  noUrgentMessage.classList.add('hide')
  var urgentButton = document.querySelector('.filter-by-urgency-button')
  urgentButton.classList.toggle('filter-by-urgency-button-active')
  var allToDoListsFalseCounter = 0;
  for (var i = 0; i < allToDoLists.length; i++) {
    var currentDiv = document.querySelector(`.task-card-id${allToDoLists[i].id}`)
    if ((allToDoLists[i].urgent == false) && (urgentButton.classList.contains('filter-by-urgency-button-active'))) {
      allToDoListsFalseCounter++;
      currentDiv.classList.add('hide')
    } else if ((allToDoLists[i].urgent == false) && (urgentButton.classList.contains('filter-by-urgency-button'))) {
      currentDiv.classList.remove('hide')
    }
  }
  if (allToDoListsFalseCounter === allToDoLists.length) {
    displayNothingUrgentMessage()
  }
}

// displays a message when nothing is urgent...
function displayNothingUrgentMessage() {
  var noUrgentMessage = document.querySelector('.no-urgent-message')
  noUrgentMessage.classList.remove('hide')
}
