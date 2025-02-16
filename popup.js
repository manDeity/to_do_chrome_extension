document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from storage
    chrome.storage.local.get(["tasks"], function (result) {
        if (result.tasks) {
            result.tasks.forEach(task => addTaskToUI(task.text, task.done));
        }
    });

    // Add new task
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTaskToUI(taskText, false);
            saveTasks();
            taskInput.value = "";
        }
    });

    // Allow pressing "Enter" to add task
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    function addTaskToUI(text, done) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${text}</span> 
            <button class="markDone">✔</button>
            <button class="deleteTask">🗑</button>
        `;
        
        if (done) {
            li.classList.add("done");
        }

        // Mark task as done
        li.querySelector(".markDone").addEventListener("click", function () {
            li.classList.toggle("done");
            saveTasks();

            if (li.classList.contains("done")) {
                startConfetti();  // 🎉 Trigger confetti when marking task as done
            }
        });

        // Delete task
        li.querySelector(".deleteTask").addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            tasks.push({ text: li.querySelector("span").textContent, done: li.classList.contains("done") });
        });
        chrome.storage.local.set({ "tasks": tasks });
    }
});
