const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function (arrOfTasks) {

  // Elements
  const tasksList = document.querySelector('.list-group');
  const addTaskForm = document.forms.addTask;
  const taskTitle = addTaskForm.title;
  const taskBody = addTaskForm.body;

  // Render all tasks 
  const renderAllTasks = (tasks) => {
    // Clear task list
    while (tasksList.firstChild) {
      tasksList.removeChild(tasksList.firstChild);
    }
    taskTitle.value = '';
    taskBody.value = '';
    // Arr to Obj
    tasks = arrOfTasks.reduce((acc, task, i) => {
      acc[task._id] = task;
      return acc;
    }, {});

    if (!tasks) {
      console.error('Enter Tasks Object!');
      return;
    };
    const fragment = document.createDocumentFragment();
    Object.values(tasks).forEach(({ title, body, _id, completed }) => {
      const li = document.createElement('li');
      li.dataset.taskId = _id;
      li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
      completed ? li.classList.add('text-success') : null;
      const liContent = ` <span>${title}</span>
                          <p class="mt-2 w-100">
                            ${body}
                          </p>
                          <button class="btn btn-danger mr-2 delete-btn">Delete</button>
                          <button class="btn btn-success complete-btn">Complete</button>
                        `;
      li.insertAdjacentHTML('afterbegin', liContent);
      fragment.append(li);
    });
    tasksList.append(fragment);
  };

  // Add task
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const title = taskTitle.value;
    const body = taskBody.value;
    const invalidMess = document.querySelector('.invalid-feedback');

    if (!title || !body) {
      invalidMess.style.display = 'block';
      return;
    } else {
      invalidMess.style.display = 'none';
    };

    const newTask = {
      _id: `task-${Math.random()}`,
      completed: false,
      body,
      title
    }

    arrOfTasks.unshift(newTask);
    renderAllTasks(arrOfTasks);

  };

  // Delete task
  const onDelClick = (el) => {
    if (el.target.classList.contains('delete-btn')) {
      const task = el.target.closest('[data-task-id]');
      const id = task.dataset.taskId;
      tasksList.removeChild(task);
      arrOfTasks.forEach((el, i) => {
        if (el._id === id) {
          delete arrOfTasks[i];
        }
      });
    }
  }

  // Confirm task
  const ifCompleted = (parent) => {
    arrOfTasks.forEach((el) => {
      if(el._id === parent.dataset.taskId) {
        el.completed ? el.completed = false : el.completed = true;
        console.log(el.completed);
        parent.classList.contains('text-success') ? parent.classList.remove('text-success') : parent.classList.add('text-success');
      }
    });
  }

  const onCompleteClick = (el) => {
    if (el.target.classList.contains('complete-btn')) {
      const parent = el.target.closest('li');
      ifCompleted(parent);
    }
  }

  renderAllTasks(arrOfTasks);
  addTaskForm.addEventListener('submit', onFormSubmit);
  tasksList.addEventListener('click', onDelClick);
  tasksList.addEventListener('click', onCompleteClick);



})(tasks);
