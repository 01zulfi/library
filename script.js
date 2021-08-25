let myLibrary = [];

retrieveStorage();

let count = 0;
const bookDiv = document.querySelector('.bookDiv');
const formDiv = document.querySelector('.form');
const newBook = document.querySelector('.newBook');
const span = document.querySelector('span');
const form = document.querySelector('form');

class Book {
    constructor() {
        this.title = document.getElementById('bookTitle').value;
        this.author = document.getElementById('bookAuthor').value;
        this.pages = document.getElementById('bookPages').value;
        this.read = document.querySelector('input[name="bookRead"]:checked').value;
    }
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
    const label = document.createElement('label');
    const checkBox = document.createElement('input');
    const deleteBook = document.createElement('button');
    
    bookCardDisplay(bookCard, bookTitle, bookAuthor, bookPages);
    checkBoxDisplay(checkBox, label, bookCard);
    deleteBookDisplay(deleteBook);
 
    bookCard.append(bookTitle, bookAuthor, bookPages, label, deleteBook);
    bookDiv.appendChild(bookCard);
    
    count++;
 
    deleteBookFunction();
}

function bookCardDisplay(bookCard, bookTitle, bookAuthor, bookPages) {
    bookTitle.classList.add("bookTitle");
    bookAuthor.classList.add("bookAuthor");
    bookPages.classList.add("bookPages");
    bookCard.id = `${count}`;
    bookCard.classList.add('bookCard');
    bookTitle.textContent = myLibrary[count].title;
    bookAuthor.textContent = 'By: ' + myLibrary[count].author;
    bookPages.textContent = myLibrary[count].pages + ' pages';
}

function checkBoxDisplay(checkBox, label, bookCard) {
    checkBox.type = "checkbox";
    checkBox.name = "bookReadStatus";
    checkBox.class = "bookReadStatus"
    checkBox.id = `${count}`;
    label.for = "id";
    label.textContent = 'Read?';
    label.classList.add("bookReadLabel")
    label.appendChild(checkBox);

    if (myLibrary[count].read === "Yes") {
        checkBox.checked = true;
        bookCard.classList.add('readYes');
    } else {
        checkBox.checked = false;
        bookCard.classList.add('readNo');
    }

    checkBox.addEventListener('change', Book.prototype.changeReadStatus)
}

function deleteBookDisplay(deleteBook) {
    deleteBook.textContent = 'Delete';
    deleteBook.id = `${count}`;
    deleteBook.classList.add('deleteBook');
}

function deleteBookFunction() {
    const deleteBookNodeList = document.querySelectorAll('.deleteBook');
    deleteBookNodeList.forEach(index => index.addEventListener('click', () => { 
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
    for (let j = 0; j < bookCardLeft.length; j++) {
        bookCardLeft[j].id = `${j}`;
    }
    const deleteBookLeft = document.querySelectorAll('.deleteBook');
    for (let j = 0; j < deleteBookLeft.length; j++) {
        deleteBookLeft[j].id = `${j}`;
    }
    const checkBoxLeft = document.querySelectorAll('input[name="bookReadStatus"]');
    for (let j = 0; j < checkBoxLeft.length; j++) {
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
    if (localStorage.length === 0) return
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

form.addEventListener('submit', clickHandler);
form.addEventListener("submit", submitForm)
span.addEventListener('click', closeForm);
newBook.addEventListener('click', openForm);
window.addEventListener('click', shiftId);

for (let i = 0; i < myLibrary.length; i++) {
    displayBook();
}

