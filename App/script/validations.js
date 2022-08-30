const firstName = document.getElementById("Name");
const lastName = document.getElementById("Lastname");
const teams = document.getElementById("teams");
const positions = document.getElementById("positions");
const email = document.getElementById("Email");
const phone = document.getElementById("Phone");

const regexGeo = /[^a-z0-9\s]/gi;
const emailRegex = /^\w+([\.-]?\w+)*@redberry.ge/;
const phoneRegex = /^(\+?995)?(79\d{7}|5\d{8})$/;

const nameH5 = document.getElementById("name-h5");
const lastNameH5 = document.getElementById("lastname-h5");
const emailH5 = document.getElementById("email-h5");
const phoneH5 = document.getElementById("phone-h5");

const nextBtn = document.getElementById("next-btn");

const nameLabel = document.getElementById("name-label");
const lastNameLabel = document.getElementById("lastname-label");
const emailLabel = document.getElementById("email-label");
const phoneLabel = document.getElementById("phone-label");

nextBtn.addEventListener("click", (e) => {
  if (!validation()) {
    e.preventDefault();
  } else {
    location.href = "../pages/laptop.html";
  }
});

function checkInputs(input, header, label) {
  if (input.value.match(regexGeo) && input.value.length >= 2) {
    header.innerText = "მინიმუმ 2 სიმბოლო, ქართული ასოები";
    header.style.color = "black";
    input.style.borderColor = "black";
    label.style.color = "black";

    return true;
  } else if (input.value.length < 2 && input.value.match(regexGeo)) {
    header.innerText = " შეიყვანეთ მინიმუმ 2 სიმბოლო";
    header.style.color = "red";
    input.style.borderColor = "red";
    label.style.color = "red";
  } else if (input.value.length >= 2 && !input.value.match(regexGeo)) {
    header.innerText = "გამოიყენეთ ქართული ასოები";
    header.style.color = "red";
    input.style.borderColor = "red";
    label.style.color = "red";
  } else {
    header.innerText =
      "გამოიყენეთ ქართული ასოები და შეიყვანეთ მინიმუმ 2 სიმბოლო";
    header.style.color = "red";
    input.style.borderColor = "red";
    label.style.color = "red";
  }
}

function checkTeams() {
  if (teams.value !== "თიმი") {
    teams.classList.remove("red-border");
    return true;
  } else {
    teams.classList.add("red-border");
  }
}

function checkPositions() {
  if (positions.value !== "პოზიცია") {
    positions.classList.remove("red-border");
    return true;
  } else {
    positions.classList.add("red-border");
  }
}

function checkRegex(field, label, h5, regex) {
  if (field.value.match(regex)) {
    field.style.borderColor = "#62a1eb";
    label.style.color = "black";
    h5.style.color = "black";
    return true;
  } else {
    field.style.borderColor = "red";
    label.style.color = "red";
    h5.style.color = "red";
  }
}

function validation() {
  let count = 0;

  if (checkInputs(lastName, lastNameH5, lastNameLabel)) {
    count++;
  }
  if (checkInputs(firstName, nameH5, nameLabel)) {
    count++;
  }
  if (checkTeams()) {
    count++;
  }
  if (checkPositions()) {
    count++;
  }
  if (checkRegex(email, emailLabel, emailH5, emailRegex)) {
    count++;
  }
  if (checkRegex(phone, phoneLabel, phoneH5, phoneRegex)) {
    count++;
  }
  if (count == 6) {
    return true;
  }
}
