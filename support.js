const form = document.getElementById("support-form");
const button = form.querySelector("button");
const message = document.createElement("p");
message.setAttribute("role", "status");
form.after(message);

const heading = document.createElement("h2");
heading.textContent = "Saved requests";
const list = document.createElement("ul");
message.after(heading, list);

let store;
let requests = [];

function displayRequests() {
  list.replaceChildren();
  if (requests.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No saved requests yet.";
    list.append(item);
  }
  requests.forEach(function (request) {
    const item = document.createElement("li");
    item.textContent = request.name + " — " + request.email
      + " — " + request.issue;
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete request from " + request.name);
    deleteButton.addEventListener("click", () => deleteRequest(request.id));
    item.append(" ", deleteButton);
    list.append(item);
  });
}

try {
  store = createRequestStore(localStorage);
  requests = store.load();
  button.disabled = false;
} catch (error) {
  message.textContent = "Saved requests could not be loaded. Saving is unavailable.";
}
displayRequests();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const issue = form.elements.issue.value.trim();

  if (!name || !email || !issue) {
    message.textContent = "Please complete all fields using more than spaces.";
    return;
  }

  try {
    requests = store.add({ name, email, issue });
    displayRequests();
    form.reset();
    message.textContent = "Request saved in this browser.";
  } catch (error) {
    message.textContent = "Could not save your request. Your form has been kept.";
  }
});

function deleteRequest(id) {
  if (!window.confirm("Delete this saved request?")) {
    return;
  }

  try {
    const result = store.remove(id);
    requests = result.requests;
    displayRequests();
    message.textContent = result.removed
      ? "Request deleted."
      : "This request is no longer saved.";
  } catch (error) {
    message.textContent = "Could not delete your request. Please try again.";
  }
}
