const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const todoAdd = document.getElementById("add-todo");

todoAdd.addEventListener('click', () => {
  if(inputBox.value === ''){
    alert("You must type something. ");
  }
  else {
    // Create a HTML element with the tag name "li":
    // And store it in a li variable
    let li = document.createElement("li");
    // Set the contents of the list as the value in the input field: 
    li.innerHTML = inputBox.value;
    // Append the newly created list element to the current list  
    listContainer.appendChild(li);

    // Add a delete list item icon dynamically:
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    // Clear the input field after adding the item
    inputBox.value = "";
  }
});

// Whenever we click anywhere on the list container
// Check where we have clicked
listContainer.addEventListener('click', (e) => {
  // If we click on a list, then we will toggle the check classList property
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
  else if(e.target.tagNmae === "SPAN"){
    e.target.parentElement.remove();
  }
}, false);

