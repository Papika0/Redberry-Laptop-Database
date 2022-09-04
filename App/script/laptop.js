const img = document.getElementById("preview");
const upload = document.getElementById("image");
const uploadBorder = document.querySelector(".upload-img");
const uploadH4 = document.querySelector(".laptop-h4");
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
    localStorage.setItem("image", event.target.files[0]);
    changesOnUpload(event);
  };

  reader.readAsDataURL(event.target.files[0]);
};

function changesOnUpload(event) {
  let fileName = event.target.files[0].name;
  let fileSize =
    Math.round((event.target.files[0].size / 1024 / 1024) * 100) / 100 + " mb";
  img.style.display = "block";
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

/* Preventing the default action of the submit button and calling the postData function. */
submit.addEventListener("click", (e) => {
  if (!postData()) {
    e.preventDefault();
  } else {
    location.href = "../pages/form-success.html";
  }
});

// TOO DOO Re Upload image Post

/**
 * It takes the data from the local storage and sends it to the server.
 * </code>
 */
async function postData() {
  let image = document.getElementById("image").files[0];
  const formData = new FormData();
  formData.append("name", localStorage.getItem("Name"));
  formData.append("surname", localStorage.getItem("Lastname"));
  formData.append("team_id", localStorage.getItem("team_id"));
  formData.append("position_id", localStorage.getItem("position_id"));
  formData.append("phone_number", localStorage.getItem("Phone"));
  formData.append("email", localStorage.getItem("Email"));

  formData.append("laptop_name", localStorage.getItem("laptop-name"));
  formData.append("laptop_image", image);
  formData.append("laptop_brand_id", localStorage.getItem("brand_id"));
  formData.append("laptop_cpu", localStorage.getItem("cpus"));
  formData.append("laptop_cpu_cores", localStorage.getItem("cpu-cores"));
  formData.append("laptop_cpu_threads", localStorage.getItem("cpu-threads"));
  formData.append("laptop_ram", localStorage.getItem("laptop-ram"));
  formData.append("laptop_hard_drive_type", localStorage.getItem("ram-type"));
  formData.append("laptop_state", localStorage.getItem("condition"));
  formData.append(
    "laptop_purchase_date",
    localStorage.getItem("purchase-date")
  );
  formData.append("laptop_price", localStorage.getItem("laptop-price"));
  formData.append("token", "d1c0af8d3c1a6e0d9be008395345f589");
  var response = await fetch(
    "https://pcfy.redberryinternship.ge/api/laptop/create",
    {
      method: "POST",
      body: formData,
    }
  );
  if (response.status == 200) {
    localStorage.clear();
    return true;
  } else {
    console.log("error");
  }
}
