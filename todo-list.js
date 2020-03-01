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
    localStorage.setItem('allToDoLists', JSON.stringify(allToDoLists))
  }

  formatTasks() {
    this.tasks = JSON.parse(this.tasks)
  }

  deleteFromStorage(i, selectedDiv) {
    // delete from local storage
    for (var y = 0; y < this.tasks.length; y++) {
      if (this.tasks[y].complete == false) {
        return
      }
    }
    // console.log(i)
    allToDoLists.splice(i, 1)
    deleteFromDom(i, selectedDiv)
    this.saveToStorage()
  }
  updateToDo(selectedDiv) {
    // should update the todo's title and urgency
    // console.log(this.urgent)
    this.urgent = !this.urgent
    updateDomUrgency(selectedDiv, this.id)
    // console.log(this.urgent)
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
