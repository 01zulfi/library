let myLibrary = [ 
    //{title:"Famous Five", author:"Enid Blyton", pages:"300", read:"yes"},
   //{title:"Mathematics", author:"Mathematician", pages:"3000", read:"no"}
];


let count = myLibrary.length;

const bookDiv = document.querySelector('.bookDiv');

const form = document.querySelector('.form');

const newBook = document.querySelector('.newBook');
newBook.addEventListener('click', accessForm);

const submit = document.querySelector('.submit');
submit.addEventListener('click', addBookToLibrary);
submit.addEventListener('click', accessForm);
submit.addEventListener('click', submitForm);

function submitForm() {
    const form = document.querySelector('form');
    form.reset();
    return false
}

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

function displayBook() {    //compartmantelize function
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

    bookCard.classList.add(`${count}`)
    bookCard.setAttribute('id', 'bookCard')
    bookTitle.textContent = myLibrary[count].title;
    bookAuthor.textContent = 'By ' + myLibrary[count].author;
    bookPages.textContent = myLibrary[count].pages + ' pages';
    if (myLibrary[count].read === "Yes") {
        checkBox.checked = true;
    } else {
        checkBox.checked = false;
    }
    deleteBook.textContent = 'Delete';
    deleteBook.classList.add(`${count}`);
    deleteBook.setAttribute('id', 'deleteBook');
    bookCard.append(bookTitle, bookAuthor, bookPages, label, deleteBook);
    bookDiv.appendChild(bookCard);
    count++;

    deleteBookFunction();
}

function deleteBookFunction() {
    deleteBookNodeList = document.querySelectorAll('#deleteBook');
    deleteBookNodeList.forEach(index => index.addEventListener('click', () => { //convert this to for loop
        const bookCardToDelete = document.querySelectorAll('#bookCard');
        for ( let i = 0; i < bookCardToDelete.length; i++) {
            if (index.className === bookCardToDelete[i].className) {
                myLibrary.splice(index.className, 1);
                bookCardToDelete[i].remove();
                const bookCardLeft = document.querySelectorAll('#bookCard');
                bookCardLeft.forEach(index => {
                        //index.removeAttribute("class");
                    })
                        for (let key of bookCardLeft.keys()) {
                            //index.className = "";
                            bookCardLeft[key].classList.add(`${key}`);
                        }
                //})
                console.log(bookCardLeft)
                count--;
            }
        }

    }))
}

function changeReadStatus() {

}

