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

getData("https://pcfy.redberryinternship.ge/api/teams", "teams");

async function getPositions() {
  var getSelect = document.querySelectorAll(".teams");
  getSelect.forEach(function (option) {
    option.addEventListener("change", async function (e) {
      var target = e.target.id;
      selected = e.target.options[e.target.selectedIndex].id;
      const response = await fetch(
        "https://pcfy.redberryinternship.ge/api/positions"
      );
      const base = await response.json();
      [base][0].data.map((char) => {
        if (selected == char.team_id) {
          var optionCreation = document.createElement("option");
          optionCreation.text = char.name;
          optionCreation.id = "option" + char.team_id;
          document.getElementById("positions").appendChild(optionCreation);
        } else {
          element = document.getElementById("option" + char.team_id);
          if (element !== null) {
            element.remove();
          }
        }
      });
    });
  });
}

getPositions();
