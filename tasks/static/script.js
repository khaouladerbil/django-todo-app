const apiUrl = 'http://127.0.0.1:8000/api/tasks/';
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');

// --- 1️⃣ Fetch all tasks from API and display them ---
function fetchTasks() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            taskList.innerHTML = ''; // Clear previous tasks

            data.forEach(task => {
                const li = document.createElement('li');

                // Inner HTML includes task text + buttons
                li.innerHTML = `
                    <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
                        ${task.title} ${task.completed ? '✅' : ''}
                    </span>
                    <button onclick="toggleComplete(${task.id}, ${task.completed})">
                        ${task.completed ? '❌ Unmark' : '✔ Mark'}
                    </button>
                    <button onclick="editTask(${task.id}, '${task.title}')">✏ Edit</button>
                    <button onclick="deleteTask(${task.id})">🗑 Delete</button>
                `;

                taskList.appendChild(li);
            });
        });
}

// --- 2️⃣ Add new task ---
addTaskBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (!title) return alert('Enter a task!');

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    })
    .then(() => {
        taskInput.value = ''; // Clear input field
        fetchTasks();         // Refresh list
    });
});

// --- 3️⃣ Delete task ---
function deleteTask(id) {
    fetch(`${apiUrl}${id}/`, { method: 'DELETE' })
        .then(() => fetchTasks()); // Refresh list
}

// --- 4️⃣ Toggle task completed ---
function toggleComplete(id, currentStatus) {
    fetch(`${apiUrl}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
    })
    .then(() => fetchTasks());
}

// --- 5️⃣ Edit task ---
function editTask(id, currentTitle) {
    const newTitle = prompt('Edit task:', currentTitle); // Ask user for new title
    if (newTitle === null) return; // User pressed cancel
    if (!newTitle.trim()) return alert('Title cannot be empty!');

    fetch(`${apiUrl}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
    })
    .then(() => fetchTasks()); // Refresh list
}

// --- 6️⃣ Load tasks on page load ---
fetchTasks();
