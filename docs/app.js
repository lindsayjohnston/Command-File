//DEFINE UI VARIABLES

const form= document.querySelector('#command-form');
const commandList= document.querySelector('.collection');
const commandInput= document.querySelector('#command');
const clearBtn= document.querySelector('.clear-commands');
const filter=document.querySelector('#filter');

//LOAD EVENT LISTENERS

loadEventListeners();

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getCommands);
    form.addEventListener('submit', addTask);
    commandList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearCommands);
    filter.addEventListener('keyup',filterCommands );
}

function getCommands(){
    let commands;
    if (localStorage.getItem('commands')===null){
        commands=[];
    } else{
        commands=JSON.parse(localStorage.getItem('commands'));
    }

    commands.forEach(function (item){
        const li=document.createElement('li');
        li.className='collection-item col s12 teal lighten-4';
        li.appendChild(document.createTextNode(item));

        const link= document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);

        commandList.appendChild(li);
    })
}

function addTask(event){
    if(commandInput.value=== ''){
        alert('Enter a command and description');
    }

    const li= document.createElement('li');
    li.className='collection-item collection-item col s12 teal lighten-4';
    li.appendChild(document.createTextNode(commandInput.value));

    const link= document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    
    commandList.appendChild(li);

    storeInLocalStorage(commandInput.value);

    commandInput.value='';
    event.preventDefault();
}

function storeInLocalStorage(command){
    let commands;
    if(localStorage.getItem('commands')=== null){
        commands=[];
    } else{
        commands= JSON.parse(localStorage.getItem('commands'));
    }

    commands.push(command);
    localStorage.setItem('commands',JSON.stringify(commands));
}


function removeTask(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove();
            removeCommandFromLocalStorage(event.target.parentElement.parentElement);
        };
    };
}

function removeCommandFromLocalStorage(command){
    let commands;
    if(localStorage.getItem('commands')=== null){
        commands=[];
    } else{
        commands= JSON.parse(localStorage.getItem('commands'));
    }

    commands.forEach(function (item, index){
        if(item === command.firstChild.textContent){
            commands.splice(index, 1);
        }
    });

    localStorage.setItem('commands', JSON.stringify(commands));
}

function clearCommands(){
    if(confirm("Are you sure?")){
        while(commandList.firstChild){
            commandList.removeChild(commandList.firstChild);
        }
        localStorage.setItem("commands", JSON.stringify([]));
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