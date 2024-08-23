
// Selecting DOM elements
const day=document.querySelector('#dayNow');
const date=document.querySelector('#dateNow');
const taskmaker = document.querySelector('.taskmaker');
const taskinput = document.querySelector('.taskmaker input');
const taskcircle = document.querySelector('.taskmaker .fa-circle');
const taskplus = document.querySelector('.fa-plus');
const taskcontainer = document.querySelector('.taskcontainer');
const completeContainer = document.querySelector('.compcont');
const caretUp = document.querySelector('.fa-caret-up');
const caretDown = document.querySelector('.fa-caret-down');
const compContainer=document.querySelector('.completed')

// Initial settings
taskcircle.style.display = 'none';
compContainer.style.display = 'none';
taskcontainer.style.height = '100%';
completeContainer.style.display = 'none';
caretUp.style.display = 'none';

//setting date and time
let today = new Date();
let dayOptions = { weekday: 'long' };//, year: 'numeric', month: 'long', day: 'numeric'
let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };//, 
let dayNow = today.toLocaleDateString('en-US', dayOptions);
let dateNow = today.toLocaleDateString('en-US',dateOptions);
day.textContent = dayNow;
date.textContent = dateNow;


// Function to create a new task
function createTask() {
  const tasks = document.querySelector('.tasks');
  const li = document.createElement('li');
  const circle = document.createElement('i');
  circle.classList.add('fa-regular', 'fa-circle');
  li.classList.add('tasks');
  const task = taskinput.value;
  li.textContent = task;
  li.appendChild(circle);
  const newTask = li.childNodes[0];
  li.insertBefore(circle, newTask);
  tasks.appendChild(li);
  const cancel=document.createElement('i');
  cancel.classList.add('fas', 'fa-times');
  li.appendChild(cancel);
    // Add event listener to the circle icon
  circle.addEventListener('click', (event) => {
    console.log('Task completed');
    const compTask = document.createElement('li');
    compContainer.appendChild(compTask);
    compTask.textContent = task;
    const circleCheck = document.createElement('i');
    circleCheck.classList.add('fas', 'fa-check');
    const taskCheck = compTask.childNodes[0];
    compTask.insertBefore(circleCheck, taskCheck);
    compTask.appendChild(circleCheck);
    li.parentNode.removeChild(li);
    taskcontainer.style.height = '50%';
    completeContainer.style.display = 'block';
  });
  tasks.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-times')) {
      console.log('task removed')
      event.target.parentNode.remove();
    }
  });

  taskinput.value = '';
  taskcircle.style.display = 'none';
  taskplus.style.display = 'block';
}

// Function to complete a task
function completeTask(icon) {
  console.log('Task completed');
  // icon.parentNode.style.display = 'none';
  const compTask = document.createElement('li');
  compContainer.appendChild(compTask);
  const task = icon.parentNode.textContent;
  compTask.textContent = task;
  const circleCheck = document.createElement('i');
  circleCheck.classList.add('fas', 'fa-check');
  const taskCheck =compTask.childNOdes[0];
  compTask.insertBefore(circleCheck, taskCheck);
  compTask.appendChild(circleCheck);
  // icon.parentNode.appendChild(compIcon);
  icon.parentNode.remove();
  taskcontainer.style.height = '50%';
  completeContainer.style.display = 'block';
}

// Function to see completed tasks
function seeCompletedTasks() {
  console.log('caret down clicked');
compContainer.style.display = 'block';
  const tasks = document.querySelectorAll('.tasks');
  tasks.forEach(task => {
    task.style.display = 'none';
  });
  completeContainer.style.display = 'block';
  caretUp.style.display = 'block';
  caretDown.style.display = 'none';
}

// Function to hide completed tasks
function hideCompletedTasks() {
  console.log('caret up clicked');
  const tasks = document.querySelectorAll('.tasks');
  tasks.forEach(task => {
    task.style.display = 'block';
  });
  // completeContainer.style.display = 'none';
  compContainer.style.display = 'none';
  caretUp.style.display = 'none';
  caretDown.style.display = 'block';
}

// Event listeners
taskmaker.addEventListener('click', () => {
  completeContainer.style.display = 'none';  
  taskcircle.style.display = 'block';
  taskplus.style.display = 'none';
  taskinput.placeholder = "Try Typing 'meeting at 6pm'";
  taskinput.focus();
});

taskmaker.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
  // taskcontainer.style.height = '100%';
    createTask();
  }
});

// console.log(document.querySelectorAll('.tasks .fa-regular'));//check
// taskUnchecks=document.querySelectorAll('.tasks .fa-regular');
// taskUnchecks.forEach(icon => {
//     icon.addEventListener('click', (event) => {
//     console.log('icon clicked',event.target);
//     completeTask(icon);
//   });
// });
const taskUnchecks = document.querySelectorAll('.tasks .fa-circle');
// console.log('taskUnchecks:', taskUnchecks);

if (taskUnchecks.length === 0) {
  console.error('No elements found with the class "fa-regular" inside the ".tasks" container.');
} else {
  taskUnchecks.forEach(icon => {
    icon.addEventListener('click', (event) => {
      console.log('icon clicked', event.target);
      completeTask(icon);
    });
  });
}

caretDown.addEventListener('click', seeCompletedTasks);
caretUp.addEventListener('click', hideCompletedTasks);