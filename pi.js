class Book {                                 //making a class named Book.
    constructor(name, author, type) {         //making a constructor.
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {                                             //making a class named display.
  
    clear() {                                                            //making a function named clear.

        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate(book) {                                                     //making a function named validate.
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    show(type, displayMessage) {                                          //making a function named show.
        let message = document.getElementById("message");
        let boldText;
        if(type=="success"){
            boldText="Success!";
        }
        else{
            boldText="Error!";
        }

        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
       <strong>${boldText}</strong> ${displayMessage}
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 2000);
    }
}


function getAnUpdate(){
let name = document.getElementById("bookName").value;
let author = document.getElementById("author").value;
let type;
let fiction = document.getElementById("fiction");
let programming = document.getElementById("programming");
let cooking = document.getElementById("cooking");

if (fiction.checked) {


    type = fiction.value;
}
else if (programming.checked) {

    type = programming.value;
}
else if (cooking.checked) {


    type = cooking.value;
}
    let itemJsonArray;
    let itemJsonStrArray;
    if(localStorage.getItem("itemJson")==null){
        itemJsonArray = [];
        itemJsonArray.push([name,author,type]);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArray));
       
    }
    else{
        itemJsonStrArray = localStorage.getItem("itemJson");
        itemJsonArray = JSON.parse(itemJsonStrArray);
        itemJsonArray.push([name,author,type]);
        localStorage.setItem("itemJson",JSON.stringify(itemJsonArray));
    }
    update();
}


function update(){

    let itemJsonArray;
    let itemJsonStrArray;
    if(localStorage.getItem("itemJson")==null){
        itemJsonArray = [];
    
    }
    else{
        itemJsonStrArray = localStorage.getItem("itemJson");
        itemJsonArray = JSON.parse(itemJsonStrArray);
     
    }

    let str ="";
    let tableBody = document.getElementById("tableBody");
    itemJsonArray.forEach(function(element,index) {
        str+=   `<tr>
                            
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td><button class="btn btn-primary"onclick="deleted(${index})">Delete</button></td>
    </tr>`
    });
    tableBody.innerHTML = str;

}

function deleted(itemIndex){
    let itemJsonArray;
    let itemJsonStrArray;
    itemJsonStrArray = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonStrArray);
    itemJsonArray.splice(itemIndex,1);
    localStorage.setItem("itemJson",JSON.stringify(itemJsonArray));
    update();


}








let libraryForm = document.getElementById("libraryForm");
libraryForm = addEventListener("submit", libraryFormSubmit);


function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {


        type = fiction.value;
    }
    else if (programming.checked) {

        type = programming.value;
    }
    else if (cooking.checked) {


        type = cooking.value;
    }
    let book = new Book(name, author, type);                                  //making a Book named object.
    let display = new Display();                                                //making a Display named object.                            
    if (display.validate(book)) {                                               //calling validate function.
       getAnUpdate();                                                       //calling add function.
        display.clear();                                                           //calling clear function.
        display.show("success", "Your book has been successfully added");          //calling show function.
    }
    else {
        display.show("danger", "Sorry you can not add this book");
    }
}
