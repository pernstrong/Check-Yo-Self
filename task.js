console.log('task.js')

class Task {
  constructor(id, objective) {
    this.id = id;
    this.objective = objective;
    this.complete = false;
  }
  completeTask() {
    this.complete = !this.complete
    // tell main.js to update accordingly or maybe list first
  }
}
