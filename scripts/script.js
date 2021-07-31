
const itemDescription = document.getElementById('task-description');
const itemCategory = document.getElementById('task-category');

const toDoListHeader = document.getElementById('open-tasks-header');
const doneListHeader = document.getElementById('done-tasks-header');
const toDoList = document.getElementById('to-do-list');
const doneList = document.getElementById('completed-list');
const addBtn = document.getElementById('add-item-btn');
const headerClock = document.getElementById('header-clock');
const headerClockAMPM = document.getElementById('header-clock-ampm');

const _todoList = "todolist";
const _doneList = "doneList";

let _uniqueId = 0;

addBtn.addEventListener('click', addItem);

displayList();
displayDoneList();
showTime();



function showTime(){
    let date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    mins = mins > 9 ? mins: "0" + mins;
    if(hours<12){
        headerClockAMPM.innerText = "A.M.";
    }else{
        headerClockAMPM.innerText = "P.M.";
    }
    hours = hours % 12;
    hours = hours == 0? 12 : hours;

    let time = hours + ":" + mins;
    headerClock.innerText = time;


    setTimeout(showTime, 60000);
}

function addItem(){
    let category = itemCategory.value;
    let description = itemDescription.value;

    if(validateInput(category, description)){
        saveItem(category + "", description + "");   
        displayList();
        clearFields();
    }else{
        //TODO use modal
        alert("enter values");
    }
}

function clearFields(){
    itemCategory.value = "";
    itemDescription.value = "";
}

function getLocalStorageData(storageKey){
    let dataStr = localStorage.getItem(storageKey);
    let dataArr;

    if(dataStr == null || dataStr == ""){
        dataArr = [];
    }else{
        dataArr = JSON.parse(dataStr);
    }
    return dataArr;
}

function setLocalStorageData(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

function saveItem(category, description){
    let todoListDataArr = getLocalStorageData(_todoList);
    let itemId = getUniqueId();

    todoListDataArr.push({_id: itemId, cat: category, desc: description});
    setLocalStorageData(_todoList, todoListDataArr);
}

function displayList(){
    let todoListData = getLocalStorageData(_todoList);

    let toDoListContent = todoListData.reduce((gridContent, row, index) =>{
        return gridContent += createListRow(index, row.cat, row.desc);
    }, "");
    toDoList.innerHTML = toDoListContent;
    if(toDoListContent == ""){
        toDoListHeader.style.visibility = "hidden";
    }else{
        toDoListHeader.style.visibility = "visible";
    }
}

function displayDoneList(){
    let doneListData = getLocalStorageData(_doneList);

    let doneListContent = doneListData.reduce((gridContent, row, index) =>{
        return gridContent += createDoneListRow(index, row.cat, row.desc);
    }, "");

    doneList.innerHTML = doneListContent;
    if(doneListContent == ""){
        doneListHeader.style.visibility = "hidden";
    }else{
        doneListHeader.style.visibility = "visible";
    }
}

function validateInput(category, description){
    if(category!=="" || description!=""){
        return true;
    }
    return false;
}
function createListRow(index, category, description, listName){
    let gridRow = 
    `<div class="row custom-todo-row justify-content-start align-items-center pd-3">
        <div class="col-1">
            ${index + 1} 
        </div>
        <div class="col-3">
            <b>${category}</b>
        </div>
        <div class="col-6">
            ${description}
        </div>
        <div class="col-auto">
            <input id="mark-done-checkbox-${index}" type="checkbox" onchange="markDone(${index})" class="btn-check" aria-label="mark-done">
            <label for="mark-done-checkbox-${index}" class="btn custom-btn mark-done-btn bi bi-check-circle-fill"></label>
        </div>
        <div class="col-auto">
            <button type="button" onclick="deleteItem(${index})" class="btn custom-btn delete-item-btn bi bi-trash-fill" aria-label="Delete Item"></button>
        </div>
    </div>`
    return gridRow;
}

function createDoneListRow(index, category, description){
    let gridRow = 
    `<div class="completed-task justify-content-start custom-todo-row row align-items-center pd-3">
        <div class="col-1">
            ${index + 1} 
        </div>
        <div class="col-3">
            <b>${category}</b>
        </div>
        <div class="col-6">
            ${description}
        </div>
        <div class="col-auto">
            <input id="reopen-checkbox-${index}" type="checkbox" onchange="changeTaskStatus(${index})" class="btn-check" aria-label="reopen-task">
            <label for="reopen-checkbox-${index}" class="btn custom-btn reopen-btn bi bi-arrow-counterclockwise"></label>
        </div>
        <div class="col-auto">
            <button type="button" onclick="deleteDoneItem(${index})" class="btn custom-btn delete-item-btn bi bi-trash-fill" aria-label="Delete Item"></button>
        </div>
    </div>`
    return gridRow;
}

function deleteItem(index, listName){
    listName = listName? listName: _todoList;
    let listData = getLocalStorageData(listName);
    let deletedItem = listData.splice(index, 1);
    setLocalStorageData(listName, listData);
    displayList();
    displayDoneList();
    return deletedItem;
}
function deleteDoneItem(index, listName){
    listName = listName? listName: _doneList;
    let listData = getLocalStorageData(listName);
    let deletedItem = listData.splice(index, 1);
    setLocalStorageData(listName, listData);
    displayList();
    displayDoneList();
    return deletedItem;
}

function getUniqueId(){ //inutil right now
    return _uniqueId + 1;
}


function markDone(index){
    let doneData = deleteItem(index, _todoList);
    let doneListData = getLocalStorageData(_doneList);
    
    doneData.forEach(row => {
        doneListData.push(row);
    });

    setLocalStorageData(_doneList, doneListData);
    displayDoneList();
}

function changeTaskStatus(index){
    let taskSelected = deleteItem(index, _doneList);

    let todoListData = getLocalStorageData(_todoList);
    
    taskSelected.forEach(row => {
        todoListData.push(row);
    });

    setLocalStorageData(_todoList, todoListData);
    displayList();
}
