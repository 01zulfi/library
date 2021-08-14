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
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const deleteBook = document.createElement('button');
    const checkBox = document.createElement('input');
    checkBox.type = "checkbox";
    checkBox.name = "bookReadStatus";
    checkBox.id = "bookReadStatus";
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
    } else {
        checkBox.checked = false;
    }
    deleteBook.textContent = 'Delete';
    deleteBook.id = `${count}`;
    deleteBook.classList.add('deleteBook');
    bookCard.append(bookTitle, bookAuthor, bookPages, label, deleteBook);
    bookDiv.appendChild(bookCard);
    count++;

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
}

function changeReadStatus() {

}

