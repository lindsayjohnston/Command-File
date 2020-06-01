//DEFINE UI VARIABLES

const form= document.querySelector('#command-form');
const commandList= document.querySelector('.collection');
const commandInput= document.querySelector('#command');
const clearBtn= document.querySelector('.clear-commands');
const filter=document.querySelector('#filter');

//LOAD EVENT LISTENERS

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);
    commandList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearCommands);
    filter.addEventListener('keyup',filterCommands );
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

    commandInput.value='';
    event.preventDefault();
}

function removeTask(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove();
        }
    };
}

function clearCommands(){
    if(confirm("Are you sure?")){
        while(commandList.firstChild){
            commandList.removeChild(commandList.firstChild);
        }
    }
}

function filterCommands(event){
    const text= (event.target.value.toLowerCase());
    document.querySelectorAll('.collection-item').forEach(function(command){
        const item= (command.firstChild.textContent.toLowerCase());
        if(item.indexOf(text) !== -1){
            command.style.display='block';
        } else{
            command.style.display='none';
        }
    })
}