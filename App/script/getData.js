async function getData(api, selectId) {
  if (document.getElementById(selectId) !== null) {
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
}

getData("https://pcfy.redberryinternship.ge/api/teams", "teams");
getData("https://pcfy.redberryinternship.ge/api/cpus", "cpus");
getData("https://pcfy.redberryinternship.ge/api/brands", "brands");

async function getPositions() {
  var getSelect = document.getElementById("teams");
  getSelect.addEventListener("change", async function (e) {
    let selected = getSelect.options.selectedIndex;
    localStorage.setItem("team_id", selected);
    const response = await fetch(
      "https://pcfy.redberryinternship.ge/api/positions"
    );
    const base = await response.json();

    [base][0].data.map((char) => {
      if (selected == char.team_id) {
        var optionCreation = document.createElement("option");
        optionCreation.text = char.name;
        optionCreation.id = "option" + char.team_id + "-" + char.id;
        document.getElementById("positions").appendChild(optionCreation);
      } else {
        let element = document.getElementById(
          "option" + char.team_id + "-" + char.id
        );

        if (element !== null) {
          element.remove();
        }
      }
    });
  });
}

positions = document.getElementById("positions");

if (positions !== null) {
  getPositions();
}
