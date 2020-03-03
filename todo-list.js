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
    localStorage.setItem('allToDoLists', JSON.stringify(allToDoLists))
  }

  formatTasks() {
    this.tasks = JSON.parse(this.tasks)
  }

  deleteFromStorage(i, selectedDiv) {
    for (var y = 0; y < this.tasks.length; y++) {
      if (this.tasks[y].complete == false) {
        return
      }
    }
    allToDoLists.splice(i, 1)
    deleteFromDom(i, selectedDiv)
    this.saveToStorage()
  }

  updateToDo(selectedDiv) {
    this.urgent = !this.urgent
    this.saveToStorage()
  }

  updateTask(taskId, selectedDiv) {
    var idIndex;
    for (var i = 0; i < this.tasks.length; i++) {
      if (taskId == this.tasks[i].id) {
        this.tasks[i].complete = !this.tasks[i].complete
      }
    }
    this.saveToStorage();
  }

}
