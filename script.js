let myLibrary = [ 
   // {title:"Famous Five", author:"Enid Blyton", pages:"300", read:"yes"},
   // {title:"Mathematics", author:"Mathematician", pages:"3000", read:"no"}
];

let count = 0;

const bookDiv = document.querySelector('.bookDiv');

const newBook = document.querySelector('.newBook');
newBook.addEventListener('click', addBookToLibrary);

function Book() {
    this.title = prompt("What is the Book's title?");
    this.author = prompt("Who is the author?");
    this.pages = prompt("How many pages does the book have?");
    this.read = prompt("Have you read the book? (Yes/No)");
}

function addBookToLibrary() {
    const book = new Book()
    myLibrary.push(book);
    displayBook();
}

function displayBook() {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const bookRead = document.createElement('p');
    bookCard.classList.add('bookCard');
    bookTitle.textContent = myLibrary[count].title;
    bookAuthor.textContent = 'By ' + myLibrary[count].author;
    bookPages.textContent = myLibrary[count].pages + ' pages';
    bookRead.textContent = "Read? " + myLibrary[count].read;
    bookCard.append(bookTitle, bookAuthor, bookPages, bookRead);
    bookDiv.appendChild(bookCard);
    count++;
}