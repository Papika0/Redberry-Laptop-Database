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

var loadPhoto = function (event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("preview");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};
