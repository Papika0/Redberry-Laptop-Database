function getData(api, selectId) {
  async function getBase() {
    const response = await fetch(api);
    const base = await response.json();

    [base][0].data.map((val) => {
      var optionCreation = document.createElement("option");
      optionCreation.text = val.name;
      optionCreation.id = val.id;
      document.getElementById(selectId).appendChild(optionCreation);
    });
  }

  getBase();
}

getData("https://pcfy.redberryinternship.ge/api/teams", "teams");

async function getBase() {
  var getSelect = document.querySelectorAll(".teams");
  getSelect.forEach(function (option) {
    option.addEventListener("change", async function countId(e) {
      var target = e.target.id;
      selected = e.target.options[e.target.selectedIndex].id;
      console.log(selected);
      const response = await fetch(
        "https://pcfy.redberryinternship.ge/api/positions"
      );
      const base = await response.json();
      [base][0].data.map((val) => {
        if (selected == val.team_id) {
          var optionCreation = document.createElement("option");
          optionCreation.text = val.name;
          optionCreation.id = "option" + val.team_id;
          document.getElementById("positions").appendChild(optionCreation);
        } else {
          element = document.getElementById("option" + val.team_id);
          if (element !== null) {
            element.remove();
          }
        }
      });
    });
  });
}

getBase();
