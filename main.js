console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var numberOfLists = -1;
var numberOfTasks = -1;
var currentTasks = [];
var allToDoLists = [];
// var totalNumOfLists;
// var numOfListsSaved =0

aside.addEventListener('click', routeAsideFunctions)

function routeAsideFunctions(event) {
  // console.log(event.target)
  if (event.target.classList.contains('add-task-item-button-image')) {
    // console.log('addTask!')
    checkTaskInputValue()
    // createTask();
  } else if (event.target.classList.contains('make-task-list-button')) {
    console.log('createNewTask!')
    // createToDoList()
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
  // numberOfLists++
  currentTasksString = JSON.stringify(currentTasks)
  var toDoList = new ToDoList(Date.now(), `${toDoTitle.value}`, `${currentTasksString}`);
   // var toDoList = new ToDoList(Date.now(), `${toDoTitle.value}`, `${currentTasks}`);
  // console.log(toDoList.id)
  // console.log(toDoList.title)
  // console.log(toDoTitle.value)
  allToDoLists.push(toDoList)
  // displayLists()
  // var title = toDoTitle.value
  var currentList = toDoList

  toDoList.saveToStorage();
  // currentTasks = []
  displayList(currentList)
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
}


function deleteTaskOnAside(event) {
  // console.log(currentTasks)
  // console.log(event.target)
  buttonSelectedIndex = event.target.dataset.tasknum
  // console.log(buttonSelectedIndex)
  currentTasks.splice(buttonSelectedIndex, 1)
  // console.log(currentTasks)
  displayTaskOnAside()
}

function clearTasksOnAside(event) {
  // console.log(currentTasks)
  asideTaskListArea = document.querySelector('.aside-task-list-area')
  asideTaskListArea.innerHTML = '';
  toDoTitle.value = '';
  taskItem.value = '';
  currentTasks = [];
  // console.log(currentTasks)
}

function displayList(currentList, i) {

    columnOne = document.querySelector('.column-one');
    columnTwo = document.querySelector('.column-two');
    noTaskMessage = document.querySelector('.no-task-message')
    var toDoList = currentList
    console.log(allToDoLists.indexOf(currentList))
    var indexOfList = allToDoLists.indexOf(currentList)
      // currentList  = allToDoLists[i];
      var targetColumn;
      // for (var i = 0; i < 1; i++) {
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
    // var taskCardList = document.querySelector(`.task-card-list${i}`)
    displayTasksInCards(currentList);
  }
// }

  function displayTasksInCards(currentList){
    // console.log(currentList)
    taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
    taskCardList.innerHTML = ''
    // console.log(currentTasks)
    for (var i = 0; i < currentTasks.length; i++) {
      var task = currentTasks[i]
      // console.log(task[i].objective)
      // console.log(task[i][2])
      taskCardList.insertAdjacentHTML('beforeend',
      `<li><input type="image" src="assets/images/checkbox.svg">${task.objective}</li>
      `
    )

    asideTaskListArea = document.querySelector('.aside-task-list-area')
    asideTaskListArea.innerHTML = ''
    }
    currentTasks = []
}

window.addEventListener('load', loadFromStorage)

function loadFromStorage() {
  var listsFromStorage = JSON.parse(localStorage.getItem('allToDoLists'))
  // console.log(listsFromStorage)

  allToDoLists = listsFromStorage
  if (allToDoLists === null) {
    allToDoLists = []
  }
  // console.log(allToDoLists)
  formatListsToDisplay()
  // console.log(listsFromStorage[0].tasks)
  // taskIndArray = JSON.parse(listsFromStorage[0].tasks)
  // console.log(taskIndArray)
  // console.log(taskIndArray[1].objective)
}

function formatListsToDisplay() {

  for (var i = 0; i < allToDoLists.length; i++) {
    currentList = allToDoLists[i]
    // console.log(currentList)
    displayList(currentList, i)
    displayTasksFromStorage(currentList)
  }
}

function displayTasksFromStorage(currentList){
  // console.log(currentList)
  taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
  taskCardList.innerHTML = ''

  console.log(currentList)
    taskIndArray = JSON.parse(currentList.tasks)
    console.log(taskIndArray.length)
    console.log(taskIndArray)
    console.log(taskIndArray[0].objective)

  // console.log(currentTasks)
  for (var i = 0; i < taskIndArray.length; i++) {
    var task = taskIndArray[i]
    console.log(task)
    // console.log(task[i].objective)
    // console.log(task[i][2])
    taskCardList.insertAdjacentHTML('beforeend',
    `<li><input type="image" src="assets/images/checkbox.svg">${task.objective}</li>
    `
  )
}
}






//
// function loadFromStorage() {
//   var listsFromStorage = JSON.parse(localStorage.getItem('allToDoLists'))
//   console.log(listsFromStorage)
//   console.log(listsFromStorage[0].tasks)
//   taskIndArray = JSON.parse(listsFromStorage[0].tasks)
//   console.log(test)
//   console.log(test[0].objective)
//
// }







// Previous functions...would load under one list and tasks were undefined....
// function loadTasksFromStorage() {
  // debugger
  // allToDoLists = [];
//   numOfListsSaved = JSON.parse(localStorage.getItem('numOfListsSaved'));
//   // JSON.parse(localStorage.getItem('tasks'))
//   // console.log(numOfListsSaved)
//   for (var i = 0; i < numOfListsSaved; i++) {
//     jsonCurrentTask = JSON.parse(localStorage.getItem('tasks'))
// console.log(jsonCurrentTask)
// console.log(jsonCurrentTask)
//     currentTasks.push(jsonCurrentTask)
//     console.log(currentTasks)
//     // var tasks = JSON.parse(localStorage.getItem(`'currentList${i}.tasks'`))
//     allToDoLists = JSON.parse(localStorage.getItem('allToDoLists'))
//     // console.log(allToDoLists)
//     var currentList = allToDoLists[i]
//     console.log(currentList)
//     console.log(currentTasks)
//     // tasks = JSON.parse(localStorage.getItem(`allToDoLists${[i]}.tasks`))
//     // console.log(tasks)
//     // console.log(allToDoLists[0].tasks)
//     // console.log(allToDoLists[0].tasks.length)
//     // var re = /\s*(?:;|$)\s*/
//     // var currentList = allToDoLists[0].tasks
//     // console.log(currentList)
//     // currentList.slice(5, currentList.length - 1)
//     // currentList = currentList.split(re)
//     // console.log(currentList)
//     // allToDoLists.push(list)
//
//   }
//   displayList(currentList, currentTasks)
//   displayOnLoad(currentList, currentTasks)
// }

// function displayOnLoad(currentList, currentTasks) {
//   // debugger
//   // console.log(currentList);
// for (var i = 0; i < allToDoLists.length; i++) {
//   var currentList = allToDoLists[i]
//
//   // console.log(tasks.tasks)
//   // console.log(JSON.parse(currentList))
//   console.log(currentList)
//   console.log(currentList.tasks)
//
//   // displayList(currentList, currentTasks)
//   loadTasks(currentList, currentTasks)
//   // displayTasksInCards(currentList)
// }
// }

// function loadTasks(currentList, currentTasks){
//
//   console.log(currentTasks.length)
//   taskCardList = document.querySelector(`.task-card-list${currentList.id}`)
//   // taskCardList.innerHTML = ''
//
//   for (var i = 0; i < currentTasks.length; i++) {
//     var task = currentTasks[i]
//     // console.log(task[i].objective)
//     // console.log(task[i][2])
//     taskCardList.insertAdjacentHTML('beforeend',
//     `<li><input type="image" src="assets/images/checkbox.svg">${task[i].objective}</li>
//     `
//   )
//
//   asideTaskListArea = document.querySelector('.aside-task-list-area')
//   asideTaskListArea.innerHTML = ''
//   }
//   // currentTasks = []
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
