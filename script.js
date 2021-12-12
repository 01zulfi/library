// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPoUqUVaywVvXbONyeBDcWDrw-7wAEcKg",
  authDomain: "library-db6c2.firebaseapp.com",
  projectId: "library-db6c2",
  storageBucket: "library-db6c2.appspot.com",
  messagingSenderId: "688607074877",
  appId: "1:688607074877:web:5541cc0fe566a2df89e854",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function signIn() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

// Signs-out of Friendly Chat.
function signOutUser() {
  // TODO 2: Sign out of Firebase.
  // Sign out of Firebase.
  signOut(getAuth());
}

document.querySelector(".sign-in-button").addEventListener("click", signIn);
document
  .querySelector(".sign-out-button")
  .addEventListener("click", signOutUser);

function initFirebaseAuth() {
  // TODO 3: Subscribe to the user's signed-in status
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  // TODO 4: Return the user's profile pic URL.
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

// Returns the signed-in user's display name.
function getUserName() {
  // TODO 5: Return the user's display name.
  return getAuth().currentUser.displayName;
}

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    // Set the user's profile pic and name.
    document.querySelector(".profile-picture").src =
      addSizeToGoogleProfilePic(profilePicUrl);
    document.querySelector(".profile-name").textContent = userName;
    document.querySelector(".sign-in-button").classList.add("hidden");
    document.querySelector(".sign-out-button").classList.remove("hidden");
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.

    document.querySelector(".profile-name").textContent = "";
    document.querySelector(".profile-picture").src = "";
    document.querySelector(".sign-in-button").classList.remove("hidden");
    document.querySelector(".sign-out-button").classList.add("hidden");
  }
}

let myLibrary = [];

retrieveStorage();

let count = 0;
const bookDiv = document.querySelector(".bookDiv");
const formDiv = document.querySelector(".form");
const newBook = document.querySelector(".newBook");
const span = document.querySelector("span");
const form = document.querySelector("form");

function Book() {
  this.title = document.getElementById("bookTitle").value;
  this.author = document.getElementById("bookAuthor").value;
  this.pages = document.getElementById("bookPages").value;
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

function submitForm(e) {
  e.preventDefault();
  form.reset();
}

function displayBook() {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  const deleteBook = document.createElement("button");

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
  bookCard.classList.add("bookCard");
  bookTitle.textContent = myLibrary[count].title;
  bookAuthor.textContent = "By: " + myLibrary[count].author;
  bookPages.textContent = myLibrary[count].pages + " pages";
}

function checkBoxDisplay(checkBox, label, bookCard) {
  checkBox.type = "checkbox";
  checkBox.name = "bookReadStatus";
  checkBox.class = "bookReadStatus";
  checkBox.id = `${count}`;
  label.for = "id";
  label.textContent = "Read?";
  label.classList.add("bookReadLabel");
  label.appendChild(checkBox);

  if (myLibrary[count].read === "Yes") {
    checkBox.checked = true;
    bookCard.classList.add("readYes");
  } else {
    checkBox.checked = false;
    bookCard.classList.add("readNo");
  }

  checkBox.addEventListener("change", Book.prototype.changeReadStatus);
}

function deleteBookDisplay(deleteBook) {
  deleteBook.textContent = "Delete";
  deleteBook.id = `${count}`;
  deleteBook.classList.add("deleteBook");
}

function deleteBookFunction() {
  const deleteBookNodeList = document.querySelectorAll(".deleteBook");
  deleteBookNodeList.forEach((index) =>
    index.addEventListener("click", () => {
      const bookCardToDelete = document.querySelectorAll(".bookCard");
      for (let i = 0; i < bookCardToDelete.length; i++) {
        if (index.id === bookCardToDelete[i].id) {
          myLibrary.splice(i, 1);
          bookCardToDelete[i].remove();
          count--;
          populateStorage();
        }
      }
    })
  );
  populateStorage();
}

function shiftId() {
  const bookCardLeft = document.querySelectorAll(".bookCard");
  for (let j = 0; j < bookCardLeft.length; j++) {
    bookCardLeft[j].id = `${j}`;
  }
  const deleteBookLeft = document.querySelectorAll(".deleteBook");
  for (let j = 0; j < deleteBookLeft.length; j++) {
    deleteBookLeft[j].id = `${j}`;
  }
  const checkBoxLeft = document.querySelectorAll(
    'input[name="bookReadStatus"]'
  );
  for (let j = 0; j < checkBoxLeft.length; j++) {
    checkBoxLeft[j].id = `${j}`;
  }
}

Book.prototype.changeReadStatus = function () {
  const bookCardNodeList = document.querySelectorAll(".bookCard");
  if (this.checked) {
    myLibrary[this.id].read = "Yes";
    bookCardNodeList[this.id].classList.remove("readNo");
    bookCardNodeList[this.id].classList.add("readYes");
  } else {
    myLibrary[this.id].read = "No";
    bookCardNodeList[this.id].classList.remove("readYes");
    bookCardNodeList[this.id].classList.add("readNo");
  }
  populateStorage();
};

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
  if (localStorage.length === 0) return;
  let myLibraryLength = localStorage.length / 4;
  for (let i = 0; i < myLibraryLength; i++) {
    let book = {
      title: localStorage.getItem(`bookTitle${i}`),
      author: localStorage.getItem(`bookAuthor${i}`),
      pages: localStorage.getItem(`bookPages${i}`),
      read: localStorage.getItem(`bookRead${i}`),
    };
    myLibrary.push(book);
  }
}

form.addEventListener("submit", clickHandler);
form.addEventListener("submit", submitForm);
span.addEventListener("click", closeForm);
newBook.addEventListener("click", openForm);
window.addEventListener("click", shiftId);

for (let i = 0; i < myLibrary.length; i++) {
  displayBook();
}

initFirebaseAuth();
