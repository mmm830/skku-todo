let button = document.querySelector("#add");
//console.log(button);
button.addEventListener("click", () => {
    let input = document.querySelector("#task-input");
    let task = input.value;
    if (!task.length) return;
    
    let newTask = document.createElement("div");
    newTask.classList.add("task", "bg-light", "p-1", "rounded-2", "ps-2");
    newTask.textContent = task;

    let todoList = document.querySelector("#todo-list");
    todoList.appendChild(newTask);

    input.value = "";
} );