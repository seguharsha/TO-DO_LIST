let str=document.getElementById('taskadder');
let bu=document.getElementById('sender');
const resultContainer = document.getElementById('resultContainer');

bu.addEventListener("click",()=>{
    let strr=str.value
    if(strr.length!=0&&strr!=""){
                dom(strr);
                str.value="";
                save();
    }
});
function dom(str){
    let x=str;
    let taskDiv=document.createElement('div');
    taskDiv.classList.add('task');
    let taskcontent=document.createElement('h2');
    taskcontent.textContent=x;
    let taskButtons=document.createElement('div');
     
    const doneButton=document.createElement('button');
    doneButton.textContent="Done"
    doneButton.classList.add('done');
    doneButton.addEventListener('click',()=>{
        taskDiv.remove();
        save();

    })
const incompleteButton=document.createElement('button');
incompleteButton.textContent='Incomplete';
incompleteButton.classList.add('incomplete');
incompleteButton.addEventListener('click',()=>{
    
    taskDiv.style.backgroundColor = 'rgba(220, 53, 69, 0.5)';
    save();
})


    const importantButton=document.createElement('button');
    importantButton.textContent="Important";
    importantButton.classList.add('important');
    importantButton.addEventListener('click',()=>{
        taskDiv.style.backgroundColor = 'rgba(255, 193, 7, 0.5)';
    })
    taskButtons.appendChild(doneButton);
    taskButtons.appendChild(incompleteButton);
    taskButtons.appendChild(importantButton);
    taskDiv.appendChild(taskcontent);
    taskDiv.appendChild(taskButtons);

    resultContainer.appendChild(taskDiv);

}
function save(){
    let tasks=[];
    document.querySelectorAll('.task').forEach(taskDiv=>{
        const taskContent = taskDiv.querySelector('span').textContent;
        const taskStatus = taskDiv.style.textDecoration === 'line-through' ? 'done' : 'incomplete';
        const isImportant = taskDiv.style.backgroundColor === 'rgba(255, 193, 7, 0.5)';
        const isIncompleye=taskDiv.style.backgroundColor==='rgba(220, 53, 69, 0.5)'; 
        tasks.push({ taskContent, taskStatus, isImportant });
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadTasks(){

    const tasks=JSON.parse(localStorage.getItem('tasks'));
    if(tasks.length>0)
    tasks.forEach(tasks=>{
        dom(tasks.taskContent);
        const taskDiv=resultContainer.lastElementChild;
        if (tasks.taskStatus === 'done') {
            taskDiv.style.textDecoration = 'line-through';
        }
        if (tasks.isImportant) {
            taskDiv.style.backgroundColor = 'rgba(255, 193, 7, 0.5)';
        }
    })
}
document.addEventListener('DOMContentLoaded',()=>{
    loadTasks();
})


