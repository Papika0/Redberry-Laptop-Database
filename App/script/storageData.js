function checkSession(id) {
  if (
    localStorage.getItem(id) != undefined ||
    localStorage.getItem(id) != null
  ) {
    document.getElementById(id).value = localStorage.getItem(id);
  }
}

function checkSelection(char) {
  if (
    localStorage.getItem(char) != undefined ||
    localStorage.getItem(char) != null
  ) {
    document.getElementById(char).children[0].innerHTML = localStorage.getItem(
      document.getElementById(char).id
    );
  }
}
function setInput(field, value) {
  localStorage.setItem(field, value);
  console.log(field, value);
}

window.onload = (event) => {
  checkSession("Name");
  checkSession("Email");
  checkSession("Phone");
  checkSession("Lastname");
  checkSelection("teams");
  checkSelection("positions");
};

function storeData() {
  localStorage.setItem("name", JSON.stringify(firstName.value));
  localStorage.setItem("lastName", JSON.stringify(lastName.value));
  localStorage.setItem("team", JSON.stringify(teams.value));
  localStorage.setItem("position", JSON.stringify(positions.value));
  localStorage.setItem("email", JSON.stringify(email.value));
  localStorage.setItem("nomeri", JSON.stringify(phone.value));
}

localStorage.clear();
