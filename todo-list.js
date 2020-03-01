// each todo list on the page should be created from this class
console.log('todo-list.js')
class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    // each task should be an object from the task class
    this.urgent = false;
  }

  saveToStorage() {
    // save to local storage

    // for (var i = 0; i < allToDoLists.length; i++) {
      // numOfListsSaved++
      // var currentList = allToDoLists[i];
      // this.tasks = JSON.stringify(this.tasks)
      // console.log(allToDoLists)
      
      console.log(this.tasks)
      localStorage.setItem('allToDoLists', JSON.stringify(allToDoLists))

      // numOfListsSaved = allToDoLists.length
    // console.log(numOfListsSaved)
    // localStorage.setItem('numOfListsSaved', JSON.stringify(numOfListsSaved))
    // storeNumOfLists(numOfListsSaved)
    // loadTasksFromStorage();
    // this.saveTasksToStorage()
  }

  // saveTasksToStorage() {
  //   console.log(this.tasks)
  //   localStorage.setItem('tasks', JSON.stringify(this.tasks))
  //   // currentTasks = []
  // }




  // saveToStorage() {
  //   // save to local storage
  //   var numOfListsSaved = 0
  //   for (var i = 0; i < allToDoLists.length; i++) {
  //     numOfListsSaved++
  //     var currentList = allToDoLists[i];
  //     localStorage.setItem(`'currentList${i}'`, JSON.stringify(currentList))
  //   }
  //   numOfListsSaved = allToDoLists.length
  //   // console.log(numOfListsSaved)
  //   localStorage.setItem('numOfListsSaved', JSON.stringify(numOfListsSaved))
  //   // storeNumOfLists(numOfListsSaved)
  //   // loadTasksFromStorage();
  // }


  deleteFromStorage() {
// delete from local storage


  }
  updateToDo() {

// should update the todo's title and urgency
  }
  updateTask() {
    // should update a task's content and if it has been completed
  }
  // makeNewTask() {
  // }
}
