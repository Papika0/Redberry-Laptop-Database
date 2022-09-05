/**
 * If the element with the id passed to the function exists, and the localStorage item with the same id
 * exists, then set the value of the element to the value of the localStorage item.
 * @param id - The id of the input field
 */
function checkSession(id) {
  if (
    document.getElementById(id) != undefined ||
    document.getElementById(id) != null
  ) {
    if (
      localStorage.getItem(id) != undefined ||
      localStorage.getItem(id) != null
    ) {
      document.getElementById(id).value = localStorage.getItem(id);
    }
  }
}

/**
 * It checks if the element exists, and if it does, it checks if the localStorage item exists, and if
 * it does, it sets the innerHTML of the element to the localStorage item.
 * </code>
 * @param char - the character that is being checked
 */
function checkSelection(char) {
  if (
    document.getElementById(char) != undefined ||
    document.getElementById(char) != null
  ) {
    if (
      localStorage.getItem(char) != undefined ||
      localStorage.getItem(char) != null
    ) {
      document.getElementById(char).children[0].innerHTML =
        localStorage.getItem(document.getElementById(char).id);
    }
  }
}

/**
 * When the user clicks on a radio button, the value of the radio button is stored in localStorage.
 * @param value - the value of the radio button
 */
function radioOnClickCondition(value) {
  localStorage.setItem("condition", value);
}

function radioOnClickMemory(value) {
  localStorage.setItem("ram-type", value);
}

/**
 * If the user has previously selected a radio button, then check that radio button when the page
 * loads.
 */
function radioCheck() {
  if (
    document.querySelector(".state") != null ||
    document.querySelector(".ram") != null
  ) {
    if (
      localStorage.getItem("condition") != undefined ||
      localStorage.getItem("condition") != null ||
      localStorage.getItem("ram-type") != undefined ||
      localStorage.getItem("ram-type") != null
    ) {
      document.getElementById(localStorage.getItem("condition")).checked = true;
      document.getElementById(localStorage.getItem("ram-type")).checked = true;
    }
  }
}

/**
 * It takes two arguments, a field and a value, and then sets the field to the value in localStorage.
 * @param field - The name of the field to store the value in.
 * @param value - The value to store.
 */

function setInput(field, value) {
  localStorage.setItem(field, value);
}

/* Listening for a change event on the positions dropdown menu. When the event is triggered, it gets
the id of the selected option and stores it in localStorage. */

if (positions !== null) {
  positions.addEventListener("change", function (e) {
    var options = positions.options;
    var id = options[options.selectedIndex].id.split("-")[1];

    localStorage.setItem("position_id", id);
  });
}

/* Listening for a change event on the brands dropdown menu. When the event is triggered, it gets
the id of the selected option and stores it in localStorage. */
const brands = document.getElementById("brands");

if (brands !== null) {
  brands.addEventListener("change", function (e) {
    var options = brands.options;
    var id = options[options.selectedIndex].id;

    localStorage.setItem("brand_id", id);
  });
}

/* Checking the localStorage for the values of the input fields and the dropdown menus. */
window.onload = (event) => {
  checkSession("Name");
  checkSession("Email");
  checkSession("Phone");
  checkSession("Lastname");
  checkSelection("teams");
  checkSelection("positions");

  checkSession("laptop-name");
  checkSession("cpu-cores");
  checkSession("cpu-threads");
  checkSession("laptop-ram");
  checkSession("purchase-date");
  checkSession("laptop-price");
  checkSelection("cpus");
  checkSelection("brands");
  radioCheck();
  // if (
  //   document.getElementById("preview") !== null ||
  //   document.getElementById("preview") !== undefined
  // ) {
  //   imageOnload();
  // }
};
