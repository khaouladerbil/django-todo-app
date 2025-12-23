const apiUrl = 'http://127.0.0.1:8000/api/tasks/';

const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');

// Fetch tasks from API
function fetchTasks() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            taskList.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.title + (task.completed ? " ✅" : "");
                taskList.appendChild(li);
            });
        });
}

// Add new task
addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value;
    if (!title) return alert('Enter a task!');

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
    })
    .then(res => res.json())
    .then(data => {
        taskInput.value = '';
        fetchTasks();
    });
});

// Initial load
fetchTasks();
