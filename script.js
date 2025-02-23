let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

// let taskList = [
//     { task: "Complete Assignment", startTime: "10:00", endTime: "12:00" },
//     { task: "Attend Meeting", startTime: "14:00", endTime: "15:00" },
//     { task: "Workout", startTime: "18:00", endTime: "19:00" }
// ];

// Call display() after defining taskList to show default tasks on page load
window.onload = function () {
    display();
};

function addTask() {
    let task = document.querySelector("#textbox").value.trim();
    let startTime = document.querySelector("#stimebox").value;
    let endTime = document.querySelector("#etimebox").value;

    if (task === "" || startTime === "" || endTime === "") {
        alert("Enter all input fields");
        return;
    }
    else {

        taskList.push({ task, startTime, endTime });

        saveToLocalstorage();
        display();

        document.querySelector("#textbox").value = ''
        document.querySelector("#stimebox").value = ''
        document.querySelector("#etimebox").value = ''
    }
}

function removeTask(index) {
    taskList.splice(index, 1);
    saveToLocalstorage();
    display();
}

function editValue(index, field, newValue){
    taskList[index][field] = newValue;
    saveToLocalstorage();
    display();
}

function display() {
    let taskContainer = document.querySelector("#taskContainer");
    taskContainer.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {
        let newTask = document.createElement("div");
        newTask.className = "newTasks";
        newTask.innerHTML = `
        <input type="text" value="${taskList[i].task}" class="textinput" onchange="editValue(${i},'task', this.value);">
        <input type="time" value="${taskList[i].startTime}" class="stimeinput" onchange="editValue(${i},'startTime', this.value);">
        <input type="time" value="${taskList[i].endTime}" class="etimeinput" onchange="editValue(${i},'endTime', this.value);">
        <button class = "cls-btn" onclick="removeTask(${i});">X</button>
        `;

        taskContainer.appendChild(newTask);
    }
}

// save to local storage
function saveToLocalstorage(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

// load from storage
// function loadfromstorage(){
//     localStorage.getItem('taskList');
// }
