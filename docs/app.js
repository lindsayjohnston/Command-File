//DEFINE UI VARIABLES

const form= document.querySelector('#command-form');
const commandList= document.querySelector('.collection');
const commandInput= document.querySelector('#command');

//LOAD EVENT LISTENERS

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);
}

function addTask(event){
    if(commandInput.value=== ''){
        alert('Enter a command and description');
    }

    const li= document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(commandInput.value));

    const link= document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    
    commandList.appendChild(li);
    event.preventDefault();
}