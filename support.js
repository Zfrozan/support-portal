const form = document.getElementById("support-form");
const button = form.querySelector("button");
const message = document.createElement("p");
message.setAttribute("role", "status");
form.after(message);

const heading = document.createElement("h2");
heading.textContent = "Saved requests";
const list = document.createElement("ul");
message.after(heading, list);

const storageKey = "northstar-requests";
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
    list.append(item);
  });
}

try {
  requests = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!Array.isArray(requests)) {
    throw new Error("Invalid saved data");
  }
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

  const updatedRequests = requests.concat({ name, email, issue });

  try {
    localStorage.setItem(storageKey, JSON.stringify(updatedRequests));
    requests = updatedRequests;
    displayRequests();
    form.reset();
    message.textContent = "Request saved in this browser.";
  } catch (error) {
    message.textContent = "Could not save your request. Your form has been kept.";
  }
});
