// each todo list on the page should be created from this class
console.log('todo-list.js')
class ToDoList {
  constructor(id, title, tasks) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = false;
  }

  saveToStorage() {
    // save to local storage
      // console.log(this.tasks)
      localStorage.setItem('allToDoLists', JSON.stringify(allToDoLists))
      // this.formatTasks()
  }

  formatTasks() {
    this.tasks = JSON.parse(this.tasks)
  }

  // unformatTasks() {
  //   this.tasks = JSON.stringify(this.tasks)
  // }

  deleteFromStorage() {
// delete from local storage


  }
  updateToDo() {
// should update the todo's title and urgency
// URGENCY!
  }
  updateTask(taskId) {
    // updates the task completed or not.
    var idIndex;
    for (var i = 0; i < this.tasks.length; i++) {
      if (taskId == this.tasks[i].id) {
        console.log(this.tasks[i].complete)
        this.tasks[i].complete = !this.tasks[i].complete
        console.log(this.tasks[i].complete)
      }
    }
    this.saveToStorage();
}

}
