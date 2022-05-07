const Type = {
    Todo:1,
    Done:2,
};

// localStorage
let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));   
}
function loadTasks() {
    let lastTasks = localStorage.getItem("tasks");
    if (!lastTasks) return;

    tasks = JSON.parse(lastTasks);
    tasks.forEach( t => {
        addToList();
    });
}

window.addEventListener("load", () => {
    loadTasks();
});


let button = document.querySelector("#add");

button.addEventListener("click", () => {
    let input = document.querySelector("#task-input");
    let text = input.value;
    if (!text.length) return;
    
    // create a new task object
    let task = {
        text: text,
        type: Type.Todo,
    }

    addToList(task);
    tasks.push(task);
    saveTasks();

    input.value = "";
} );

function addToList(task)
{
    let div = document.createElement("div");
    div.className = "task bg-light p-1 rounded-2 ps-2 d-flex align-items-center";

    let span = document.createElement("span");
    span.className = "me-auto";
    span.textContent = task.text;
    div.appendChild(span);

    let buttonDone;
    if (task.type === Type.Todo) {
        buttonDone = document.createElement("button");
        buttonDone.className = "btn btn-sm btn-success me-1";
        buttonDone.innerHTML = '<i class="bi bi-check"></i>';
        div.appendChild(buttonDone);

        // add check functionality
        let doneTask = {
            text: task.text,
            type: Type.Done,
        };
        buttonDone.addEventListener("click", () => {
            addToList(doneTask);
            div.remove();
        });
    }

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-sm btn-danger";
    buttonRemove.innerHTML = '<i class="bi bi-x"></i>';
    div.appendChild(buttonRemove);



    // add remove functionality
    buttonRemove.addEventListener("click", () => {
        div.remove();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });

    let list = document.querySelector( (task.type === Type.Todo) ? "#todo-list" : "#done-list" );
    list.appendChild(div);
}

// if user types 'enter key', press button!
document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        button.click();
    }
});