// Variables
const createNoteBtn = document.querySelector("button");
let notesContainer = document.querySelector(".notes-container");
// End of variables

// Functions

// Save Data to local storage
function saveData() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Edit localStorage variables values after editing a note
function editTextareaValues() {
  for (let i = 0; i < notesContainer.children.length; i++) {
    notesContainer.children[i].children[0].value = localStorage.getItem(
      `textarea-${i + 1}`
    );
  }
}

// Reset localStorage variables after deleting a note
function resetLoalStorageKeys() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).length > 5) {
      if (localStorage.key(i)[9] > notesContainer.children.length) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }
}

// Put values of textareas in a localStorage variable
function setTextareaValues() {
  for (let i = 0; i < notesContainer.children.length; i++) {
    let value = notesContainer.children[i].children[0].value;
    localStorage.setItem(`textarea-${i + 1}`, value);
  }
}
// End of functions

// Onloading window event
window.addEventListener("load", () => {
  if (localStorage.getItem("notes")) {
    notesContainer.innerHTML = localStorage.getItem("notes");
    editTextareaValues();
  }
});

// Create note when clicking createNoteBtn button
createNoteBtn.addEventListener("click", () => {
  // Create note
  let noteContainer = document.createElement("div");

  // Create text area in a note
  let textarea = document.createElement("textarea");
  textarea.className = "input"; // Add input class to textarea
  noteContainer.append(textarea); // Add textarea to the noteContainer

  // Create img delete button in a note
  let img = document.createElement("img");
  img.src = "./images/delete.png"; // Add img src
  img.className = "delete"; // Add delete class
  noteContainer.append(img); // Add img to the note container

  // Add noteContainer to the notesContainer
  notesContainer.append(noteContainer);

  saveData();
});

// Remove the textarea on clicking delete img
document.addEventListener("click", (e) => {
  // Remove the localStorage input related to the deleted textarea

  if (e.target.className === "delete") {
    e.target.parentElement.remove();
    saveData();
    resetLoalStorageKeys();
    setTextareaValues();
  }
});

// Add each input text to a localStorage variable
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("input")) {
    e.target.oninput = () => {
      setTextareaValues();
    };
  }
});
