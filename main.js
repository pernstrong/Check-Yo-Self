console.log('main.js')

var toDoTitle = document.querySelector('.task-title-input')
var taskItem = document.querySelector('.task-item-input')
var aside = document.querySelector('.aside')
var numberOfLists = -1;
var numberOfTasks = -1;
var currentTasks = [];
var allToDoLists = [];
// var totalNumOfLists;
var numOfListsSaved;

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
  // console.log(toDoList.id)
  // console.log(toDoList.title)
  // console.log(toDoTitle.value)
  allToDoLists.push(toDoList)
  // displayLists()
  // var title = toDoTitle.value
  toDoList.saveToStorage();
  displayList(toDoList)
  toDoTitle.value = '';
  currentTasks = []
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

function displayList(toDoList) {
    columnOne = document.querySelector('.column-one');
    columnTwo = document.querySelector('.column-two');
      // currentList  = allToDoLists[i];
      var targetColumn;
      // for (var i = 0; i < 1; i++) {
      if (allToDoLists.length === 1) {
        columnOne.innerHTML = ''
      }
      if (allToDoLists.length % 2 === 0) {
        targetColumn = columnTwo;
      } else {
        targetColumn = columnOne;
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
    displayTasksInCards(toDoList);
  }
// }
  function displayTasksInCards(toDoList){
    taskCardList = document.querySelector(`.task-card-list${toDoList.id}`)
    taskCardList.innerHTML = ''
    for (var i = 0; i < currentTasks.length; i++) {
      taskCardList.insertAdjacentHTML('beforeend',
      `<li><input type="image" src="assets/images/checkbox.svg">${currentTasks[i].objective}</li>
      `
    )

    asideTaskListArea = document.querySelector('.aside-task-list-area')
    asideTaskListArea.innerHTML = ''
    }
}






// function displayLists() {
//   // message = document.querySelector('.no-task-message')
//   // message.classList.add('hide')
//   columnOne = document.querySelector('.column-one');
//   columnTwo = document.querySelector('.column-two');
//   columnOne.innerHTML = ''
//   columnTwo.innerHTML = ''
//   for (var i = 0; i < allToDoLists.length; i++) {
//     currentList  = allToDoLists[i];
//     // debugger
//     // console.log(currentList)
//     // currentListFormatted = JSON.parse(currentList)
//     // console.log(currentListFormatted)
//     // console.log(currentList.tasks[0])
//     var targetColumn;
//     if (i % 2 === 0) {
//       targetColumn = columnOne;
//     } else {
//       targetColumn = columnTwo;
//     }
//     targetColumn.insertAdjacentHTML('afterbegin',
//     `<div class="task-card">
//       <h4 class="task-card-title">${currentList.title}</h4>
//       <ul class="task-card-list${i}" data-cardnum="${i}">
//
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
//   )
//   currentUL = document.querySelector(`.task-card-list${i}`)
//   console.log(currentUL)
//   console.log(currentList)
//   displayTasksOnList(currentUL, currentList)
//   }
//   asideTaskListArea = document.querySelector('.aside-task-list-area')
//   asideTaskListArea.innerHTML = ''
// }

// function displayTasksOnList(currentUL, currentList) {
  // console.log(currentList.tasks.objective)
  // console.log(currentTasks.length)
  // // var taskCardList = document.querySelector('.task-card-list')
  // // taskCardList.innerHTML = ``
  // for (var i = 0; i < currentTasks.length; i++) {
  //   var currentTask = currentTasks[i]
  //   console.log(currentTask)
  //   currentUL.insertAdjacentHTML('beforeend',
  //   `<li><input type="image" src="assets/images/checkbox.svg">${currentTask.objective}</li>
  //   `
  // )}
// }

// well, i'm thinking we need to know how many lists have been saved in order to load the correct number?
// function storeNumOfLists(numOfListsSaved) {
//   totalNumOfLists = numOfListsSaved
//   loadTasksFromStorage()
// }

// get allToDoLists out of local storage and display on page load

window.addEventListener('load', loadTasksFromStorage)

function loadTasksFromStorage() {
  // debugger
  allToDoLists = [];
  numOfListsSaved = JSON.parse(localStorage.getItem('numOfListsSaved'));
  // console.log(numOfListsSaved)
  for (var i = 0; i < numOfListsSaved; i++) {
    var list = JSON.parse(localStorage.getItem(`'currentList${i}'`))
    // console.log(list)
    allToDoLists.push(list)
  }
  // console.log(numOfListsSaved)
  // console.log(allToDoLists)
  // displayLists()
  // displayList()
}












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
