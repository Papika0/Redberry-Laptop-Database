async function getData(api, selectId) {
  const response = await fetch(api);
  const base = await response.json();
  [base][0].data.map((char) => {
    var optionCreation = document.createElement("option");
    optionCreation.text = char.name;
    optionCreation.value = char.name;
    optionCreation.id = char.id;
    document.getElementById(selectId).appendChild(optionCreation);
  });
}

getData("https://pcfy.redberryinternship.ge/api/cpus", "cpus");
getData("https://pcfy.redberryinternship.ge/api/brands", "brands");

const img = document.getElementById("preview");
const upload = document.getElementById("upload");
const uploadBorder = document.querySelector(".upload-img");
const uploadH4 = document.querySelector(".laptop-h4");
const uploadRetry = document.querySelector(".upload-retry");

var loadPhoto = function (event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("preview");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);

  let fileName = event.target.files[0].name;
  let fileSize =
    Math.round((event.target.files[0].size / 1024 / 1024) * 100) / 100 + " mb";
  img.style.display = "block";
  upload.style.display = "none";
  uploadBorder.style.outline = "none";
  uploadH4.style.display = "none";
  uploadRetry.style.display = "block";
  uploadRetryCreate(fileName, fileSize);
};

function uploadRetryCreate(name, size) {
  let retryName = document.querySelector(".retry-name");
  let retrySize = document.querySelector(".retry-size");
  retryName.innerText = name;
  retrySize.innerText = size;
}
