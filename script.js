let myLibrary = [ 
    //{title:"Famous Five", author:"Enid Blyton", pages:"300", read:"Yes"},
   //{title:"Mathematics", author:"Mathematician", pages:"3000", read:"no"}
];

retrieveStorage();

let count = 0;




const bookDiv = document.querySelector('.bookDiv');

const formDiv = document.querySelector('.form');

const newBook = document.querySelector('.newBook');
newBook.addEventListener('click', openForm);

const span = document.querySelector('span');
span.addEventListener('click', closeForm);

const form = document.querySelector('form');
form.addEventListener('submit', clickHandler);
form.addEventListener("submit", submitForm)




function Book() {
    this.title = document.getElementById('bookTitle').value;
    this.author = document.getElementById('bookAuthor').value;
    this.pages = document.getElementById('bookPages').value;
    this.read = document.querySelector('input[name="bookRead"]:checked').value;
}

function openForm() {
    formDiv.style.display = "flex";
}

function closeForm() {
    formDiv.style.display = "none";
}

function addBookToLibrary() {
    const book = new Book();
    myLibrary.push(book);
    displayBook();
}

function clickHandler() {
    addBookToLibrary();
    closeForm();
}

function submitForm(e){
    e.preventDefault()
    form.reset()
} 



function displayBook() {   
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const deleteBook = document.createElement('button');
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.name = "bookReadStatus";
    checkBox.class = "bookReadStatus"
    checkBox.id = `${count}`;
    const label = document.createElement('label');
    label.for = "id";
    label.textContent = 'Read?';
    label.appendChild(checkBox);

    bookTitle.classList.add("bookTitle")
    bookAuthor.classList.add("bookAuthor")
    bookPages.classList.add("bookPages")
    label.classList.add("bookReadLabel")



    bookCard.id = `${count}`;
    bookCard.classList.add('bookCard');
    bookTitle.textContent = myLibrary[count].title;
    bookAuthor.textContent = 'By: ' + myLibrary[count].author;
    bookPages.textContent = myLibrary[count].pages + ' pages';
    if (myLibrary[count].read === "Yes") {
        checkBox.checked = true;
        bookCard.classList.add('readYes');
    } else {
        checkBox.checked = false;
        bookCard.classList.add('readNo');
    }
    deleteBook.textContent = 'Delete';
    deleteBook.id = `${count}`;
    deleteBook.classList.add('deleteBook');
    bookCard.append(bookTitle, bookAuthor, bookPages, label, deleteBook);
    bookDiv.appendChild(bookCard);
    checkBox.addEventListener('change', Book.prototype.changeReadStatus)
    count++;
 
    deleteBookFunction();


}

window.addEventListener('click', shiftId);


function deleteBookFunction() {
    const deleteBookNodeList = document.querySelectorAll('.deleteBook');
    deleteBookNodeList.forEach(index => index.addEventListener('click', () => { //convert this to for loop
        const bookCardToDelete = document.querySelectorAll('.bookCard');
        for ( let i = 0; i < bookCardToDelete.length; i++) {
            if (index.id === bookCardToDelete[i].id) {
                myLibrary.splice(i, 1);
                bookCardToDelete[i].remove();
                count--;
                populateStorage();
            }
        }
    }))
    populateStorage();
}


function shiftId() {
    const bookCardLeft = document.querySelectorAll('.bookCard')
    for ( let j = 0; j < bookCardLeft.length; j++) {
        bookCardLeft[j].id = `${j}`;
    }
    const deleteBookLeft = document.querySelectorAll('.deleteBook');
    for ( let j = 0; j < deleteBookLeft.length; j++) {
        deleteBookLeft[j].id = `${j}`;
    }
    const checkBoxLeft = document.querySelectorAll('input[name="bookReadStatus"]');
    for ( let j = 0; j < checkBoxLeft.length; j++) {
        checkBoxLeft[j].id = `${j}`;
    }
}

Book.prototype.changeReadStatus = function() {
    const bookCardNodeList = document.querySelectorAll('.bookCard');
    if (this.checked) {
        myLibrary[this.id].read = "Yes"
        bookCardNodeList[this.id].classList.remove('readNo');
        bookCardNodeList[this.id].classList.add('readYes');
    } else {
        myLibrary[this.id].read = "No"
        bookCardNodeList[this.id].classList.remove('readYes');
        bookCardNodeList[this.id].classList.add('readNo');
    }
   populateStorage();
}


// L O C A L    S T O R A G E   


//localStorage.clear();

function populateStorage() {
    localStorage.clear();
    for (let i = 0; i < myLibrary.length; i++) {
        localStorage.setItem(`bookTitle${i}`, myLibrary[i].title);
        localStorage.setItem(`bookAuthor${i}`, myLibrary[i].author);
        localStorage.setItem(`bookPages${i}`, myLibrary[i].pages);
        localStorage.setItem(`bookRead${i}`, myLibrary[i].read);
    }
}

function retrieveStorage() {
    if (localStorage.length ===0) return
    myLibraryLength = localStorage.length / 4;
    for (let i = 0; i<myLibraryLength;i++) {
        let book = {
            title: localStorage.getItem(`bookTitle${i}`),
            author: localStorage.getItem(`bookAuthor${i}`),
            pages: localStorage.getItem(`bookPages${i}`),
            read: localStorage.getItem(`bookRead${i}`)
        }
        myLibrary.push(book);
    }

}

for (let i =0 ; i < myLibrary.length; i++) {
    displayBook();
}

