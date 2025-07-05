const listTask = document.getElementById("List");
const nameTask = document.getElementById("Text-input");
const btnAdd = document.getElementById("Add-task");

let tasks = getTask();
renderTask(tasks);

btnAdd.addEventListener("click", () => {
  if (!nameTask.value) {
    alert("Please enter name");
    return false;
  }

  let tasks = getTask();

  tasks.push({ name: nameTask.value, complete: false });
  nameTask.value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(tasks);
});

function renderTask(tasks = []) {
  listTask.innerHTML = "";

  tasks.forEach((task, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("Task");
    const setComplete = task.complete ? "Complete" : "";
    const setCheck = task.complete ? "checked" : " ";
    todoItem.innerHTML = `<div> <input type="checkbox" onclick="doneTask(${index})" class="checkBox" ${setCheck}> </div>
    <div> <span id="text${index}" class="${setComplete}"> ${task.name} </span> </div>
    <div> <button onclick="deleteTask(${index})" class="montserrat deleteBtn">X</button> </div> `;
    listTask.appendChild(todoItem);
  });
}

function getTask() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

function doneTask(id) {
  let tasks = getTask();
  tasks[id].complete = !tasks[id].complete;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(getTask());
}
function deleteTask(id) {
  const choice = confirm("Are you sure want to delete ?");
  if (choice) {
    let tasks = getTask();
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTask(getTask());
  }
}
