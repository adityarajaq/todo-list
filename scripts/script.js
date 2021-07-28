
const itemDescription = document.getElementById('task-description');
const itemCategory = document.getElementById('task-category');
const toDoList = document.getElementById('to-do-list');
const addBtn = document.getElementById('add-item-btn');
const deleteBtns = document.querySelectorAll('.delete-item');

addBtn.addEventListener('click', addItem);

function addItem(){
    let category = itemCategory.value;
    let description = itemDescription.value;

    if(validateInput(category, description)){
        let newListRow = createListRow(itemCategory.value, itemDescription.value);
        toDoList.innerHTML += newListRow;
        itemCategory.value = "";
        itemDescription.value = "";
    }else{
        alert("enter values");
    }
    // TODO: Add item to local storage
    
    /*let listItem = document.createElement("div");
    listItem.classList.add("input-group");
    listItem.classList.add("flex-nowrap");

    

    let listDescription = document.createElement("input");
    listDescription.type = "text";
    listDescription.classList.add("form-control");
    listDescription.placeholder = "Description";

    //let deleteContainer = document.createElement("span");
    //deleteContainer.classList.add("input-group-append");

    let deleteBtn = document.createElement("input");
    deleteBtn.type = "button";
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.classList.add('input-group-append');
    deleteBtn.value = "Delete";
    deleteBtn.onclick = deleteItem();

    //deleteContainer.appendChild(deleteBtn);
    listItem.appendChild(listDescription);
    listItem.appendChild(deleteBtn);
    toDoList.appendChild(listItem); */
}
function validateInput(category, description){
    if(category!=="" || description!=""){
        return true;
    }
    return false;
}
function createListRow(category, description){
    let gridRow = 
    `<div class="row align-items-center pd-3">
        <div class="col-2">
            <b>${category}</b>
        </div>
        <div class="col-6">
            ${description}
        </div>
        <div class="col-2">
            <input type="button" class="btn btn-success" value="Mark Done">
        </div>
        <div class="col-2">
            <input type="button" onclick="deleteItem(this)" class="btn btn-danger delete-item" value="Delete">
        </div>
    </div>`
    return gridRow;
}

function deleteItem(btn){
    //TODO: delete the item
    btn.parentElement.parentElement.style.display = "hidden";
}
