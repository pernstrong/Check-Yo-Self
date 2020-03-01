// each todo list on the page should be created from this class
console.log('todo-list.js')
class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = false;
    if (urgent === true) {
      this.urgent = true;
    }
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

  deleteFromStorage(i) {
    // delete from local storage
    console.log('delete from storage function')
    for (var y = 0; y < this.tasks.length; y++) {
      if (this.tasks[y].complete == false) {
        return
      }
    }
    console.log(i)
    allToDoLists.splice(i, 1)
    this.saveToStorage()
    // loadFromStorage()
  }
  updateToDo() {
    // should update the todo's title and urgency
    // URGENCY!
    // console.log('update to do!!!')
    console.log(this.urgent)
    this.urgent = !this.urgent
    console.log(this.urgent)
    this.saveToStorage()
  }

  updateTask(taskId) {
    // updates the task completed or not.
    var idIndex;
    for (var i = 0; i < this.tasks.length; i++) {
      if (taskId == this.tasks[i].id) {
        // console.log(this.tasks[i].complete)
        this.tasks[i].complete = !this.tasks[i].complete
        // console.log(this.tasks[i].complete)
      }
    }
    this.saveToStorage();
  }

}
