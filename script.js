let myLibrary = [ 
   // {title:"Famous Five", author:"Enid Blyton", pages:"300", read:"yes"},
   // {title:"Mathematics", author:"Mathematician", pages:"3000", read:"no"}
];

let count = 0;

const bookDiv = document.querySelector('.bookDiv');

const form = document.querySelector('.form');

const newBook = document.querySelector('.newBook');
newBook.addEventListener('click', accessForm);

const submit = document.querySelector('.submit');
submit.addEventListener('click', addBookToLibrary);
submit.addEventListener('click', accessForm);

function Book() {
    this.title = document.getElementById('bookTitle').value;
    this.author = document.getElementById('bookAuthor').value;
    this.pages = document.getElementById('bookPages').value;
    this.read = document.querySelector('input[name="bookRead"]:checked').value;
}

function accessForm() {
    form.toggleAttribute('hidden'); 
}

function addBookToLibrary() {
    const book = new Book();
    myLibrary.push(book);
    displayBook();
}

function displayBook() {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    const deleteBook = document.createElement('button');

    bookCard.classList.add(`${count}`)
    bookCard.setAttribute('id', 'bookCard')
    bookTitle.textContent = myLibrary[count].title;
    bookAuthor.textContent = 'By ' + myLibrary[count].author;
    bookPages.textContent = myLibrary[count].pages + ' pages';
    bookRead.textContent = "Read? " + myLibrary[count].read;
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add(`${count}`);
    deleteBook.setAttribute('id', 'deleteBook');
    bookCard.append(bookTitle, bookAuthor, bookPages, bookRead, deleteBook);
    bookDiv.appendChild(bookCard);
    count++;

    let deleteBookNodeList = document.querySelectorAll('#deleteBook');
    deleteBookFunction(deleteBookNodeList);
}

function deleteBookFunction(deleteBookNodeList) {
    deleteBookNodeList.forEach(index => index.addEventListener('click', () => {
        let bookCardToDelete = document.querySelectorAll('#bookCard');
        for ( let i = 0; i < bookCardToDelete.length; i++) {
            if (index.className === bookCardToDelete[i].className) {
                bookCardToDelete[i].remove();
            }
        }
    }))
}
