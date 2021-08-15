let myLibrary = [ 
    //{title:"Famous Five", author:"Enid Blyton", pages:"300", read:"yes"},
   //{title:"Mathematics", author:"Mathematician", pages:"3000", read:"no"}
];


let count = myLibrary.length;

const bookDiv = document.querySelector('.bookDiv');

const formDiv = document.querySelector('.form');

const newBook = document.querySelector('.newBook');
newBook.addEventListener('click', accessForm);

const form = document.querySelector('form');
form.addEventListener('submit', clickHandler);
form.addEventListener("submit", submitForm)

function Book() {
    this.title = document.getElementById('bookTitle').value;
    this.author = document.getElementById('bookAuthor').value;
    this.pages = document.getElementById('bookPages').value;
    this.read = document.querySelector('input[name="bookRead"]:checked').value;
}

function accessForm() {
    formDiv.toggleAttribute('hidden'); 
}

function addBookToLibrary() {
    const book = new Book();
    myLibrary.push(book);
    displayBook();
}

function clickHandler() {
    addBookToLibrary();
    accessForm();
}

function submitForm(e){
    e.preventDefault()
    form.reset()
} 

function displayBook() {   
    //populateStorage();
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

    bookCard.id = `${count}`;
    bookCard.classList.add('bookCard');
    bookTitle.textContent = myLibrary[count].title;
    bookAuthor.textContent = 'By ' + myLibrary[count].author;
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
    count++;
    populateStorage();
    checkBox.addEventListener('change', Book.prototype.changeReadStatus)
    deleteBookFunction();
}

function deleteBookFunction() {
    deleteBookNodeList = document.querySelectorAll('.deleteBook');
    deleteBookNodeList.forEach(index => index.addEventListener('click', () => { //convert this to for loop
        const bookCardToDelete = document.querySelectorAll('.bookCard');
        for ( let i = 0; i < bookCardToDelete.length; i++) {
            if (index.id === bookCardToDelete[i].id) {
                myLibrary.splice(i, 1);
                bookCardToDelete[i].remove();
                count--;
            }
        }
    }))
    const bookCardLeft = document.querySelectorAll('.bookCard');
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
    populateStorage();
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
    localStorage.setItem(`bookTitle${count-1}`, myLibrary[count-1].title);
    localStorage.setItem(`bookAuthor${count-1}`, myLibrary[count-1].author);
    localStorage.setItem(`bookPages${count-1}`, myLibrary[count-1].pages);
    localStorage.setItem(`bookRead${count-1}`, myLibrary[count-1].read);
}