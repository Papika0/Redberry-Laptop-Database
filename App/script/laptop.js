const img = document.getElementById("preview");
const upload = document.getElementById("image");
const uploadBorder = document.querySelector(".upload-img");
const uploadH4 = document.querySelector(".laptop-h4");
const uploadH5 = document.querySelector(".laptop-h5");
const mobileImg = document.querySelector(".mobile-img");
const uploadRetry = document.querySelector(".upload-retry");
const submit = document.getElementById("Submit");

// TO DOO Image maintain on refresh

/**
 * When the user uploads a photo, the photo is displayed in the preview box, the upload button is
 * hidden, and the retry button is displayed with the name and size of the photo.
 * @param name - the name of the file
 * @param size - The size of the file in bytes.
 */
var loadPhoto = function (event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("preview");
    output.src = reader.result;
    // localStorage.setItem("image", event.target.files[0]);
    // localStorage.setItem("image-onload", reader.result);
    // localStorage.setItem("image-name", event.target.files[0].name);
    // localStorage.setItem("image-size", event.target.files[0].size);
    changesOnUpload(event);
  };
  let imageImg = document.getElementById("invalid-vector3");
  imageImg.style.display = "none";
  reader.readAsDataURL(event.target.files[0]);
};

//TO DOO had problem fetching image from local storage
/**
 * If the image, name, and size are stored in local storage, then display the image, hide the upload
 * button, and display the retry button.
 */
// function imageOnload() {
//   let image = localStorage.getItem("image-onload");
//   let name = localStorage.getItem("image-name");
//   let size = localStorage.getItem("image-size");

//   if (image && name && size) {
//     img.src = image;
//     img.style.display = "block";
//     uploadH5.style.display = "none";
//     mobileImg.style.display = "none";
//     upload.style.display = "none";
//     uploadBorder.style.outline = "none";
//     uploadH4.style.display = "none";
//     uploadRetry.style.display = "block";
//     uploadRetryCreate(
//       name,
//       Math.round((size / 1024 / 1024) * 100) / 100 + " mb"
//     );
//   }
// }

function changesOnUpload(event) {
  let fileName = event.target.files[0].name;
  let fileSize =
    Math.round((event.target.files[0].size / 1024 / 1024) * 100) / 100 + " mb";
  img.style.display = "block";
  uploadH5.style.display = "none";
  mobileImg.style.display = "none";
  upload.style.display = "none";
  uploadBorder.style.outline = "none";
  uploadH4.style.display = "none";
  uploadRetry.style.display = "block";
  uploadRetryCreate(fileName, fileSize);
}

function uploadRetryCreate(name, size) {
  let retryName = document.querySelector(".retry-name");
  let retrySize = document.querySelector(".retry-size");
  retryName.innerText = name;
  retrySize.innerText = size;
}

/**
 * It takes the data from the local storage and sends it to the server.
 * </code>
 */
function postData() {
  let retryImage = document.querySelector(".retry-upload").files[0];
  let image = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("name", localStorage.getItem("Name"));
  formData.append("surname", localStorage.getItem("Lastname"));
  formData.append("team_id", localStorage.getItem("team_id"));
  formData.append("position_id", localStorage.getItem("position_id"));
  formData.append("phone_number", localStorage.getItem("Phone"));
  formData.append("email", localStorage.getItem("Email"));

  formData.append("laptop_name", localStorage.getItem("laptop-name"));
  if (retryImage) {
    formData.append("laptop_image", retryImage);
  } else {
    formData.append("laptop_image", image);
  }
  formData.append("laptop_brand_id", localStorage.getItem("brand_id"));
  formData.append("laptop_cpu", localStorage.getItem("cpus"));
  formData.append("laptop_cpu_cores", localStorage.getItem("cpu-cores"));
  formData.append("laptop_cpu_threads", localStorage.getItem("cpu-threads"));
  formData.append("laptop_ram", localStorage.getItem("laptop-ram"));
  formData.append("laptop_hard_drive_type", localStorage.getItem("ram-type"));
  formData.append("laptop_state", localStorage.getItem("condition"));
  if (localStorage.getItem("purchase-date")) {
    formData.append(
      "laptop_purchase_date",
      localStorage.getItem("purchase-date")
    );
  }
  formData.append("laptop_price", localStorage.getItem("laptop-price"));
  formData.append("token", "86cb9de5c6639a9267f5e227ae047452");

  fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status == 200) {
      localStorage.clear();
      return (window.location.href = "../pages/form-success.html");
    } else {
      console.log("error");
    }
  });
}

/* Preventing the default action of the submit button and calling the postData function. */
submit.addEventListener("click", (e) => {
  e.preventDefault();
  checkAll();
  if (document.querySelectorAll(".red").length == 0) {
    postData();
  }
});

/**
 * It calls all the other functions that check the form.
 */
function checkAll() {
  checkLpName();
  checkNumber("cpu-cores");
  checkNumber("cpu-threads");
  checkNumber("laptop-ram");
  checkNumber("laptop-price");
  checkBrand();
  checkCpus();
  radioValState();
  radioValType();
  checkImageUpload();
}
/**
 * If the value of the input field matches the regular expression, remove the red class from the parent
 * element and the next sibling element, and change the border color of the input field to blue.
 * Otherwise, add the red class to the parent element and the next sibling element, and change the
 * border color of the input field to red.
 */

function checkLpName() {
  let nameRegex = /^[a-zA-Z0-9_.-\s]+$/;
  let name = document.getElementById("laptop-name");
  if (nameRegex.test(name.value)) {
    name.parentElement.classList.remove("red");
    name.style.border = "1.8px solid #8ac0e2";
    name.nextElementSibling.classList.remove("red");
  } else {
    name.parentElement.classList.add("red");
    name.style.border = "1.8px solid red";
    name.nextElementSibling.classList.add("red");
  }
}

/**
 * If the value of the input element is a number, remove the red class from the parent element and the
 * next sibling element. Otherwise, add the red class to the parent element and the next sibling
 * element.
 * @param element - the id of the input field
 */
function checkNumber(element) {
  let numberRegex = /^[0-9]+$/;
  let number = document.getElementById(element);
  if (numberRegex.test(number.value)) {
    number.parentElement.classList.remove("red");
    number.style.border = "1.8px solid #8ac0e2";
    number.nextElementSibling.classList.remove("red");
  } else {
    number.parentElement.classList.add("red");
    number.style.border = "1.8px solid red";
    number.nextElementSibling.classList.add("red");
  }
}

/**
 * If the selected option is not the first option, remove the red border and red text from the first
 * option. If the selected option is the first option, add a red border to the select element and add
 * red text to the first option.
 * </code>
 * @param element - the id of the select element
 */

function checkBrand() {
  const selection = document.getElementById("brands");
  console.log(selection.value);
  if (selection.value !== "ლეპტოპის ბრენდი") {
    selection.style.border = "none";
    selection.options[0].classList.remove("red");
  } else {
    selection.options[0].classList.add("red");
    selection.style.border = "1.8px solid red";
  }
}

function checkCpus() {
  const selection = document.getElementById("cpus");
  console.log(selection.value);
  if (selection.value !== "CPU") {
    selection.style.border = "none";
    selection.options[0].classList.remove("red");
  } else {
    selection.options[0].classList.add("red");
    selection.style.border = "1.8px solid red";
  }
}

/**
 * If the radio buttons are checked, remove the red class from the label and hide the image. If the
 * radio buttons are not checked, add the red class to the label and show the image
 */
function radioValState() {
  let radio = document.getElementsByName("condition");
  let radioLabel = document.getElementById("radio-label");
  let radioImg = document.getElementById("invalid-vector");

  if (radio[0].checked || radio[1].checked) {
    radioLabel.classList.remove("red");
    radioImg.style.visibility = "hidden";
  } else {
    radioLabel.classList.add("red");
    radioImg.style.visibility = "visible";
  }
}

/**
 * If the radio button is checked, remove the red class from the label and hide the image. If the radio
 * button is not checked, add the red class to the label and show the image.
 * </code>
 */
function radioValType() {
  let radio = document.getElementsByName("type");
  let radioLabel = document.getElementById("ram-label");
  let radioImg = document.getElementById("invalid-vector2");

  if (radio[0].checked || radio[1].checked) {
    radioLabel.classList.remove("red");
    radioImg.style.visibility = "hidden";
  } else {
    radioLabel.classList.add("red");
    radioImg.style.visibility = "visible";
  }
}

/**
 * If the image file is uploaded, remove the red class from the label. If the image file is not
 * uploaded, display the invalid image, add a red outline to the image border, and add the red class to
 * the label.
 * </code>
 */
function checkImageUpload() {
  let image = document.getElementById("image");
  let imageLabel = document.querySelector(".laptop-h4");
  let mobileImageLabel = document.querySelector(".laptop-h5");
  let imageBorder = document.querySelector(".upload-img");
  let imageImg = document.getElementById("invalid-vector3");
  if (image.files[0]) {
    imageLabel.classList.remove("red");
    imageLabel.style.color = "#8ac0e2";
    mobileImageLabel.classList.remove("red");
  } else {
    imageImg.style.display = "block";
    imageBorder.style.outline = "2px dashed red";
    imageLabel.style.color = "red";
    imageLabel.classList.add("red");
    mobileImageLabel.classList.add("red");
  }
}
