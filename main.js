const Name = document.querySelector("#Name");
const money = document.querySelector("#money");
const btn = document.querySelector("#btn");
const rentTable = document.querySelector(".rent-table tbody");
const moodButton = document.querySelector(".moodButton");

window.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem('tasts') || '[]');
    tasks.forEach(task => addTasks(task));

    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mood');
        moodButton.classList.add('dark-mood');
        moodButton.innerHTML = 'light mode <span><i class="fa-solid fa-sun"></i></span>';
        H1 = document.querySelector('#Name').style.color = 'black';
    } else {
        moodButton.innerHTML = 'dark mode <span><i class="fa-solid fa-moon"></i></span>';
    }
});

btn.addEventListener("click", () => {
    if (Name.value === "" || money.value === "") {
        alert("Enter the name or money");
        return;
    }

    const task = {
        Name: Name.value,
        money: money.value,
    };

    saveToLocalStorage(task);
    addTasks(task);

    Name.value = "";
    money.value = "";
});

function saveToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasts') || '[]');
    tasks.push(task);
    localStorage.setItem('tasts', JSON.stringify(tasks));
}

function addTasks(task) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="task-text">${task.Name}</td>
        <td class="task-money">${task.money}</td>
        <td><input type="checkbox" class="task-check"></td>
        <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
    `;
    rentTable.appendChild(row);

    const check = row.querySelector(".task-check");
    const nameCell = row.querySelector(".task-text");
    const moneyCell = row.querySelector(".task-money");
    const deleteBtn = row.querySelector(".delete-btn");

    check.addEventListener("click", () => {
        if (check.checked) {
            nameCell.style.textDecoration = "line-through";
            nameCell.style.color = "gray";
            moneyCell.style.textDecoration = "line-through";
            moneyCell.style.color = "gray";
        } else {
            nameCell.style.textDecoration = "none";
            nameCell.style.color = "";
            moneyCell.style.textDecoration = "none";
            moneyCell.style.color = "";
        }
    });

    deleteBtn.addEventListener("click", () => {
        row.remove();
    });
}

function switchMode() {
    document.body.classList.toggle('dark-mood');
    moodButton.classList.toggle('dark-mood');

    if (document.body.classList.contains('dark-mood')) {
        moodButton.innerHTML = 'light mode <span><i class="fa-solid fa-sun"></i></span>';
        H1 = document.querySelector('#ame').style.color = 'black';
        title = document.querySelector('.title');
        title.style.color = 'rgba(101, 101, 246, 0.847)';
        localStorage.setItem('mode', 'dark');
    } else {
        moodButton.innerHTML = 'dark mode  <span><i class="fa-solid fa-moon"></i></span>';
        localStorage.setItem('mode', 'light');
    }
}

moodButton.addEventListener('click', switchMode);
