function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.pages} pages, ${this.read}`;
};

const theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 295, "not yet");
// const NineteenEightyFour = new Book("1984", "George Orwell", 328, "read");

let myLibrary = [theHobbit];

const libraryArticle = document.getElementById("books-library");

const formDiv = document.getElementById("book-form");
const bookAdder = document.getElementById("book-adder");
window.addEventListener("click", (e) => {
  if (formDiv.style.display !== "none") {
    formDiv.style.display = "none";
  }
});
bookAdder.addEventListener("click", (e) => {
  e.stopPropagation();
  formDiv.style.display = formDiv.style.display === "flex" ? "" : "flex";
});
const form = document.getElementById("form");
const inputSubmit = document.getElementById("submit");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

formDiv.addEventListener("click", (e) => {
  e.stopPropagation();
});

// const setError = (element, message) => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.textContent = message;
//   inputControl.classList.add("error");
//   inputControl.classList.remove("success");
// };

// const setSuccess = (element) => {
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.textContent = "";
//   inputControl.classList.add("success");
//   inputControl.classList.remove("error");
// };

// let checkInput = (e) => {
//   if (!titleInput.value) {
//     setError(title, "What's the title?");
//   } else {
//     setSuccess(title);
//   }

//   if (!authorInput.value) {
//     setError(author, "Who's the author?");
//   } else {
//     setSuccess(author);
//   }
//   if (pagesInput.value == "") {
//     setError(pages, "How long is the book?");
//   } else {
//     setSuccess(pages);
//   }
// };

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let readBol = "not yet";
  if (readInput.checked) {
    readBol = "read";
  }
  let book = new Book(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readBol
  );
  myLibrary.push(book);
  libraryArticle.textContent = "";
  addToLibrary(myLibrary);
  delNodeAndAction();
  readP = document.querySelectorAll(".read-p");
  readButton = document.querySelectorAll(".read-bol");
  pReadAction();
});

const delBook = (list, i) => {
  if (list.length == 1) {
    list.pop();
  }
  list.splice(i, 1);
};

let addToLibrary = (list) => {
  for (let i = 0; i < list.length; i++) {
    const div = document.createElement("div");
    div.classList.add("book-container");
    const h1 = document.createElement("h1");
    libraryArticle.appendChild(div);
    h1.textContent = list[i].title;
    div.appendChild(h1);
    const pAuthor = document.createElement("p");
    pAuthor.textContent = list[i].author;
    div.appendChild(pAuthor);
    const pPages = document.createElement("p");
    pPages.textContent = list[i].pages + " pages";
    div.appendChild(pPages);

    const pRead = document.createElement("p");
    div.appendChild(pRead);
    pRead.classList.add("read-p");
    pRead.textContent = list[i].read;

    const read = document.createElement("button");
    read.classList.add("read-bol");

    if (pRead.textContent == "not yet") {
      read.textContent = "read";
    } else if (pRead.textContent == "read") {
      read.textContent = "not yet";
    }

    div.appendChild(read);

    const del = document.createElement("button");
    del.classList.add("delete-button");
    del.textContent = "DEL";
    div.appendChild(del);
  }
};

addToLibrary(myLibrary);

delNodeAndAction = (e) => {
  let delButton = document.querySelectorAll(".delete-button");

  for (let i = 0; i < delButton.length; i++) {
    delButton[i].addEventListener(
      "click",
      (e) => (
        e.preventDefault(),
        e.stopPropagation(),
        delBook(myLibrary, i),
        delButton[i].parentElement.remove()
      )
    );
  }
};
delNodeAndAction();

let readP = document.querySelectorAll(".read-p");
let readButton = document.querySelectorAll(".read-bol");

const refreshRead = () => {
  readP = [];
  readButton = [];
  readP = document.querySelectorAll(".read-p");
  readButton = document.querySelectorAll(".read-bol");
};

const changeRead = (i) => {
  if (readP[i].textContent == "not yet") {
    readP[i].textContent = "read";
  } else if (readP[i].textContent == "read") {
    readP[i].textContent = "not yet";
  }
  if (readButton[i].textContent == "read") {
    readButton[i].textContent = "not yet";
  } else if (readButton[i].textContent == "not yet") {
    readButton[i].textContent = "read";
  }
};

pReadAction = (e) => {
  let readButton = document.querySelectorAll(".read-bol");
  for (let i = 0; i < readButton.length; i++) {
    readButton[i].addEventListener(
      "click",
      (e) => (e.preventDefault(), e.stopPropagation(), changeRead(i))
    );
  }
};
pReadAction();
