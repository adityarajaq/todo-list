
const itemDescription = document.getElementById('task-description');
const itemCategory = document.getElementById('task-category');
const toDoList = document.getElementById('to-do-list');
const addBtn = document.getElementById('add-item-btn');
const deleteBtns = document.querySelectorAll('.delete-item');
const _todoList = "todolist";

let _uniqueId = 0;

displayList();
addBtn.addEventListener('click', addItem);

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

    toDoList.innerHTML = todoListData.reduce((gridContent, row, index) =>{
        return gridContent += createListRow(index, row.cat, row.desc);
    }, "");
}

function validateInput(category, description){
    if(category!=="" || description!=""){
        return true;
    }
    return false;
}
function createListRow(index, category, description){
    let gridRow = 
    `<div class="row align-items-center pd-3">
        <div class="col-1">
            ${index + 1}
        </div>
        <div class="col-2">
            <b>${category}</b>
        </div>
        <div class="col-6">
            ${description}
        </div>
        <div class="col-1">
            <input id="mark-done-checkbox" type="checkbox" onchange="markDone(this, ${index})" class="btn-check" aria-label="mark-done">
            <label for="mark-done-checkbox" class="mark-done btn btn-success bi bi-check-circle-fill"></label>
        </div>
        <div class="col-1">
            <button type="button" onclick="deleteItem(${index})" class="btn btn-danger delete-item bi bi-trash-fill" aria-label="Delete Item"></button>
        </div>
    </div>`
    return gridRow;
}

function deleteItem(index){
    let todoListData = getLocalStorageData(_todoList);
    todoListData.splice(index, 1);
    setLocalStorageData(_todoList, todoListData);
    displayList();
}

function getUniqueId(){ //inutil right now
    return _uniqueId + 1;
}

function markDone(btn, index){
    let row = btn.parentElement.parentElement;
    if(btn.checked){
        btn.parentElement.lastElementChild.classList.add("btn-secondary")
        btn.parentElement.lastElementChild.classList.add("bi-pencil-fill");
        btn.parentElement.lastElementChild.classList.remove("btn-success")
        btn.parentElement.lastElementChild.classList.remove("bi-check-circle-fill");
        row.classList.add('item-done');
    }else{
        row.classList.remove('item-done');
        btn.parentElement.lastElementChild.classList.remove("btn-secondary")
        btn.parentElement.lastElementChild.classList.remove("bi-pencil-fill");
        btn.parentElement.lastElementChild.classList.add("btn-success")
        btn.parentElement.lastElementChild.classList.add("bi-check-circle-fill");
    } 
}
