
const myNotes = JSON.parse(localStorage.getItem("newToDO" || "[]"));
let notes ;
let elementId;
var complete = 0;
var myListesParent = document.getElementsByClassName("list");
var completeCheck = 0;
document.getElementById("allTaskes").innerText = myListesParent.length;
if (localStorage.getItem("complete") === null) {
    complete = 0;
    document.getElementById("complete").innerText = complete;
} else {
    complete = localStorage.getItem("complete");
    document.getElementById("complete").innerText = complete;
}
if(localStorage.getItem("newToDO")=== null){
    notes = [];
    elementId = 0;
}else{
    notes = myNotes;
    if(notes.length === 0){
        elementId = notes.length;
        console.log(elementId)
    }else{
        elementId = notes.length-1;
        console.log(elementId)
        
        function createNewNote(){
            notes.forEach((list) => {
                var paragraph = document.createElement("p");
                var listDivContainer = document.createElement("div");
                listDivContainer.className = "list";
                listDivContainer.setAttribute("id",`${list.id}`)
                var innerParagraphText = document.createTextNode(list.title);
                paragraph.appendChild(innerParagraphText);
                document.getElementById("list-cont").insertBefore(listDivContainer,document.getElementById("list-cont").childNodes[0]);
                var trashIcon = document.createElement("I");
                var textDiv = document.createElement("DIV");
                var squareIcon = document.createElement("I");
                var chekIcon = document.createElement("I");
                trashIcon.className = "fa-solid fa-trash";
                trashIcon.setAttribute("id", "cancel");
                textDiv.className = "text";
                squareIcon.className = "fa-solid fa-square";
                chekIcon.className = "fa-solid fa-check";
                textDiv.appendChild(squareIcon);
                textDiv.appendChild(chekIcon);
                textDiv.appendChild(paragraph);
                listDivContainer.appendChild(textDiv);
                listDivContainer.appendChild(trashIcon);
                if (list.state === 1) {
                    for (let z = 0; z < myListesParent.length; z++) {
                        if (list.id === Number(myListesParent[z].getAttribute("id"))) {
                            myListesParent[z].classList.add("active");
                            console.log(myListesParent[z].classList.add("active"))
                        }
                    }
                }
                listDivContainer.onclick = function () {
                    listDivContainer.classList.toggle("active");
                    if (listDivContainer.classList == "list active") {
                        complete++;
                        localStorage.setItem("complete", complete);
                        document.getElementById("complete").innerText = complete;
                    } else if (listDivContainer.classList == "list") {
                        complete--;
                        localStorage.setItem("complete", complete);
                        document.getElementById("complete").innerText = complete;
                    }
                }
                document.getElementById("textInput").value = "";
                document.getElementById("allTaskes").innerText = Number(document.getElementById("allTaskes").innerText) + 1;
            })
        }
        createNewNote();
    } 
}
// check the day and add it to the span
var getDayNum = new Date().getDay();
switch (getDayNum) {
    case 0:
        document.getElementById("day").innerText = "Sunday";
        break;
    case 1:
        document.getElementById("day").innerText = "Monday";
        break;
    case 2:
        document.getElementById("day").innerText = "Tuesday";
        break;
    case 3:
        document.getElementById("day").innerText = "Wednesday";
        break;
    case 4:
        document.getElementById("day").innerText = "Thursday";
        break;
    case 5:
        document.getElementById("day").innerText = "Friday";
        break;
    case 6:
        document.getElementById("day").innerText = "Saturday";
}

function create(innerParagraphText) {
    var paragraph = document.createElement("p");
    var listDivContainer = document.createElement("div");
    listDivContainer.className = "list";
    let listId = elementId;
    listDivContainer.setAttribute("id", `${listId}`)
    paragraph.innerText = innerParagraphText;
    document.getElementById("list-cont").insertBefore(listDivContainer,document.getElementById("list-cont").childNodes[0]);
    var trashIcon = document.createElement("I");
    var textDiv = document.createElement("DIV");
    var squareIcon = document.createElement("I");
    var chekIcon = document.createElement("I");
    trashIcon.className = "fa-solid fa-trash";
    trashIcon.setAttribute("id", "cancel");
    textDiv.className = "text";
    squareIcon.className = "fa-solid fa-square";
    chekIcon.className = "fa-solid fa-check";
    textDiv.appendChild(squareIcon);
    textDiv.appendChild(chekIcon);
    textDiv.appendChild(paragraph);
    listDivContainer.appendChild(textDiv);
    listDivContainer.appendChild(trashIcon);
    completeTask();
    deleteList();
    let myListInformation = {
        title: innerParagraphText,
        id: listId,
        state: completeCheck
    }
    notes.push(myListInformation);
    localStorage.setItem("newToDO", JSON.stringify(notes));
    elementId++;
}
// Create a new list item when clicking on the "Add" button
function addNewList(inputValue) {
    if (inputValue === '') {
        alert("you can't add an empty list");
    } else {
       var check=0;
        var innerParagraphText = inputValue;
        if(notes.length === 0){
            create(innerParagraphText);
            document.getElementById("allTaskes").innerText = Number(document.getElementById("allTaskes").innerText) + 1;
        }else{
            for(let i =0 ; i< notes.length ; i++){
                let currentTitle = notes[i].title;
                if(currentTitle == innerParagraphText){
                    check = 1;
                    break;
                }else{
                    check = 0;
                }
            }
            if(check === 1){
                alert("this list is added before you can't add it again")
            }else{
                create(innerParagraphText);
                document.getElementById("allTaskes").innerText = Number(document.getElementById("allTaskes").innerText) + 1;
            }
        }
       
    }
    document.getElementById("textInput").value = "";
}
document.getElementById('addList').addEventListener('click', () => {
    var inputValue = document.getElementById("textInput").value;
    addNewList(inputValue);
})
document.getElementById("textInput").onkeyup = function (event) {
    if (event.keyCode == 13) {
        var inputValue = document.getElementById("textInput").value;
        addNewList(inputValue);
    }
}
// Click on a trash button to hide the current list item
function deleteList(){
    var cancle = document.getElementsByClassName("fa-trash");
    for (let i = 0; i < cancle.length; i++) {
        cancle[i].onclick = function () {
            var index ;
            var box = this.parentElement;
            let boxId = Number(box.getAttribute("id"));
            box.remove();
            for(let i = 0; i< notes.length;i++){
                if(boxId == notes[i].id){
                    index = i;
                    if (notes[i].state === 1) {
                        complete = complete - 1;
                        document.getElementById("complete").innerHTML = complete;
                        localStorage.setItem("complete", complete);
                    }
                    break
                }
            }
            notes.splice(index,1);
            localStorage.setItem("newToDO", JSON.stringify(notes));
            document.getElementById("allTaskes").innerText = Number(document.getElementById("allTaskes").innerText) - 1;
        }
        
    }
}
deleteList();

// REMOVE THE MODEL 
let removeModel = () => {
    document.getElementById("theModel").style.display = "none";
}
// show the model 
let showModel = () => {
    document.getElementById("theModel").style.display = "block";
}
// CLEAR ALL DATA 
let clearData = () => {
    if (notes.length != 0) {
        notes.length = 0;
        document.getElementById("list-cont").innerHTML = "";
        window.localStorage.clear();
        removeModel();
        document.getElementById("allTaskes").innerText = 0;
        complete = 0;
        localStorage.setItem("complete", complete);
        document.getElementById("complete").innerText = complete;
    } else {
        alert("There is nothing to delete");
        removeModel();
    }

}
for (var z = 0; z < notes.length; z++) {
    console.log(notes[z].state);
}
function completeTask() {
    for (var i = 0; i < myListesParent.length; i++) {
        myListesParent[i].onclick = function () {
            this.classList.toggle("active");
            if (this.classList == "list active") {
                let parentId = Number(this.getAttribute("id"));
                for (let x = 0; x < notes.length; x++) {
                    if (notes[x].id === parentId) {
                        completeCheck = 1;
                        complete = Number(localStorage.getItem("complete")) + 1;
                        localStorage.setItem("complete", complete);
                        document.getElementById("complete").innerText = complete;
                        notes[x].state = completeCheck;
                        localStorage.setItem("newToDO", JSON.stringify(notes));
                    }
                }
            } else if (this.classList == "list") {
                let parentId = Number(this.getAttribute("id"));
                for (let x = 0; x < notes.length; x++) {
                    if (notes[x].id === parentId) {
                        completeCheck = 0;
                        complete = complete - 1;
                        console.log(complete)
                        document.getElementById("complete").innerText = complete;
                        localStorage.setItem("complete", complete);
                        notes[x].state = completeCheck;
                        localStorage.setItem("newToDO", JSON.stringify(notes));
                    }
                    
                } 
            }
        }
        
    }
    
}
completeTask();
console.log(document.styleSheets);
document.getElementById("delete").addEventListener('click', showModel);
document.getElementById("cancelModel").addEventListener('click', removeModel);
document.getElementById("close").addEventListener('click', removeModel);
document.getElementById("deleteAll").addEventListener('click', clearData);
//localStorage.clear();
