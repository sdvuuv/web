const taskList = document.getElementById("taskList");
const taskCard = document.getElementById("taskCard");
const createTaskBtn = document.getElementById("createTaskBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const taskDescription = document.getElementById("taskDescription");
const highPriorityCheckbox = document.getElementById("highPriority");

let isEditing = false;
let editTaskElement = null;

function updatePriorityIconPosition() {
    const iconPosition = highPriorityCheckbox.checked ? "150px" : "-20px";
    highPriorityCheckbox.style.setProperty("--priority-icon-left", iconPosition);
}

highPriorityCheckbox.addEventListener("change", updatePriorityIconPosition);

function showTaskCard() {
    taskCard.classList.remove("hidden");
    updatePriorityIconPosition();
}

function hideTaskCard() {
    taskCard.classList.add("hidden");
    taskDescription.value = "";
    highPriorityCheckbox.checked = false;
    isEditing = false;
    editTaskElement = null;
}

function createTaskElement(description, isHighPriority) {
    const li = document.createElement("li");

    if (isHighPriority) {
        li.classList.add("high-priority");
    }

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed", checkbox.checked);
        toggleButtonsState(li, checkbox.checked);
    });

    const priorityIcon = document.createElement("span");
    priorityIcon.className = "priority-icon";
    priorityIcon.style.display = isHighPriority ? "inline" : "none";

    const span = document.createElement("span");
    span.textContent = description;
    span.classList.add("task-text");
    taskContent.append(checkbox, priorityIcon, span);

    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.classList.add("edit-btn");

    editButton.addEventListener("click", () => {
        if (!checkbox.checked) {
            isEditing = true;
            editTaskElement = li;
            taskDescription.value = description;
            highPriorityCheckbox.checked = isHighPriority;
            showTaskCard();
        }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
        if (!checkbox.checked) {
            li.remove();
        }
    });

    const actionsContainer = document.createElement("div");
    actionsContainer.classList.add("task-actions");
    actionsContainer.append(editButton, deleteButton);

    li.append(taskContent, actionsContainer);
    return li;
}

function toggleButtonsState(taskElement, isCompleted) {
    const editButton = taskElement.querySelector(".edit-btn");
    const deleteButton = taskElement.querySelector(".delete-btn");

    if (isCompleted) {
        editButton.classList.add("disabled");
        deleteButton.classList.add("disabled");
        editButton.disabled = true;
        deleteButton.disabled = true;
    } else {
        editButton.classList.remove("disabled");
        deleteButton.classList.remove("disabled");
        editButton.disabled = false;
        deleteButton.disabled = false;
    }
}

function saveTask() {
    const description = taskDescription.value.trim();
    const isHighPriority = highPriorityCheckbox.checked;

    if (description === "") {
        alert("Описание задачи не может быть пустым.");
        return;
    }

    if (isEditing && editTaskElement) {
        editTaskElement.querySelector("span").textContent = description;
        editTaskElement.classList.toggle("high-priority", isHighPriority);
        hideTaskCard();
        return;
    }

    const newTask = createTaskElement(description, isHighPriority);
    taskList.appendChild(newTask);
    hideTaskCard();
}

createTaskBtn.addEventListener("click", showTaskCard);
saveTaskBtn.addEventListener("click", saveTask);
cancelTaskBtn.addEventListener("click", hideTaskCard);