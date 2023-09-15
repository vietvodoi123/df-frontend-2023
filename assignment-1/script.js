// Your JS code goes here
const searchInputElm = document.getElementById("search-input");
const authorInputElm = document.getElementById("author-input");
const nameInputElm = document.getElementById("name-input");
const selectInputElm = document.getElementById("select-input");

const tbodyElm = document.getElementById("tbody");

const btnAddBook = document.getElementById("btn-add-book");
var btnDelete = document.querySelectorAll(".btn-delete");
const btnDeleteConfirm = document.getElementById("btn-delete-confirm");
const xElm = document.querySelectorAll(".x-elm");
const btnCreate = document.getElementById("btn-create");

const noDataElm = document.getElementById("no-data");

const backdropElm = document.getElementById("backdrop");

const deleteModalElm = document.getElementById("delete-modal");
const nameDeleteElm = document.getElementById("name-delete");

const addFormElm = document.getElementById("add-modal");

const nameErrMsg = document.getElementById("name-err-msg");
const authorErrMsg = document.getElementById("author-err-msg");

// check localstorage
let data = getLocalStorage("myBooks");
if (!data) {
  data = [
    { name: "Refactoring", author: "Martin Fowler", topic: "Programming" },
    {
      name: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      topic: "Database",
    },
    { name: "The Phoenix Project", author: "Gene Kim", topic: "DevOps" },
  ];
  saveToLocalStorage("myBooks", data);
}
render();

// tim kiem
searchInputElm.addEventListener("input", () => {
  const searchInputValue = searchInputElm.value;
  render(searchInputValue.trim());
});

// bien luu vi tri hang can xoa
let nameDelete = "";

// open add modal
btnAddBook.addEventListener("click", () => {
  backdropElm.classList.remove("hidden");
  addFormElm.classList.remove("hidden");
});

// open delete confirm
btnDelete.forEach((item) => {
  eventForAnchor(item);
});

// close modal and backdrop
backdropElm.addEventListener("click", closeModal);

xElm.forEach((item) => {
  item.addEventListener("click", closeModal);
});

// add form
addFormElm.addEventListener("submit", (e) => {
  e.preventDefault();

  const authorInputValue = authorInputElm.value;
  const nameInputValue = nameInputElm.value;
  const selectInputValue = selectInputElm.value;
  let ok = true;
  let ok1 = true;
  // validate
  if (nameInputValue === "") {
    nameErrMsg.classList.remove("hidden");
    ok = false;
  } else {
    nameErrMsg.classList.add("hidden");
    ok = true;
  }
  if (authorInputValue === "") {
    authorErrMsg.classList.remove("hidden");
    ok1 = false;
  } else {
    authorErrMsg.classList.add("hidden");
    ok1 = true;
  }
  if (ok && ok1) {
    data = [
      ...data,
      {
        name: nameInputValue,
        author: authorInputValue,
        topic: selectInputValue,
      },
    ];
    saveToLocalStorage("myBooks", data);
    render();
    updateElm();
    closeModal();
  }
});

// delete popconfirm
btnDeleteConfirm.addEventListener("click", () => {
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === nameDelete) {
      index = i;
      break;
    }
  }
  data.splice(index, 1);
  saveToLocalStorage("myBooks", data);
  render();
  updateElm();
  closeModal();
  nameDelete = "";
});

/////////////// FUNCTION  ///////////////////////////////
// save to localstorage
function saveToLocalStorage(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
  data = getLocalStorage("myBooks");
}
// get item
function getLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

// render
function render(key) {
  tbodyElm.innerHTML = "";
  noDataElm.classList.add("hidden");
  if (key === null || key === "" || key === undefined) {
    data.forEach((item) => {
      addBook(item.name, item.author, item.topic);
    });
    if (data.length === 0) {
      noDataElm.classList.remove("hidden");
    }
  } else {
    const list = data.filter((item) => item.name.toLowerCase().includes(key));
    list.forEach((item) => {
      addBook(item.name, item.author, item.topic);
    });
    if (list.length === 0) {
      noDataElm.classList.remove("hidden");
    }
  }
}
// close function
function closeModal() {
  backdropElm.classList.add("hidden");
  if (!deleteModalElm.classList.contains("hidden")) {
    deleteModalElm.classList.add("hidden");
  }
  if (!addFormElm.classList.contains("hidden")) {
    addFormElm.classList.add("hidden");
  }
}

// add book function
function addBook(nameInputValue, authorInputValue, selectInputValue) {
  const newTr = document.createElement("tr");

  const newTdName = document.createElement("td");
  newTdName.classList.add("book-name");
  newTdName.textContent = nameInputValue;

  const newTdAuthor = document.createElement("td");
  newTdAuthor.textContent = authorInputValue;

  const newTdSelect = document.createElement("td");
  newTdSelect.textContent = selectInputValue;

  const newAction = document.createElement("td");
  const newBtnDelete = document.createElement("a");
  newBtnDelete.setAttribute("href", "#");
  newBtnDelete.classList.add("btn-delete");
  newBtnDelete.textContent = "Delete";
  eventForAnchor(newBtnDelete);

  newAction.appendChild(newBtnDelete);

  newTr.appendChild(newTdName);
  newTr.appendChild(newTdAuthor);
  newTr.appendChild(newTdSelect);
  newTr.appendChild(newAction);

  tbodyElm.appendChild(newTr);
}

// update event
function eventForAnchor(item) {
  item.addEventListener("click", () => {
    backdropElm.classList.remove("hidden");
    deleteModalElm.classList.remove("hidden");
    const parenElm = item.parentNode;
    const parenElm1 = parenElm.parentNode;
    const childrenElm = parenElm1.children;
    nameDeleteElm.innerText = childrenElm.item(0).textContent;
    nameDelete = childrenElm.item(0).textContent;
  });
}

// cap nhat lai cac phan tu
function updateElm() {
  btnDelete = document.querySelectorAll(".btn-delete");
  console.log(btnDelete);
}
