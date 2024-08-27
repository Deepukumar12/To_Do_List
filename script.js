document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        let filteredTasks = tasks;

        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            const completeBtn = taskItem.querySelector('.complete-btn');
            completeBtn.addEventListener('click', () => {
                toggleTaskCompletion(index);
            });

            const editBtn = taskItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                editTask(index);
            });

            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });
        });
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    const editTask = (index) => {
        const newTaskText = prompt('Edit your task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText.trim();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', addTask);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            renderTasks(btn.dataset.filter);
        });
    });

    renderTasks(); // Initial render
});
