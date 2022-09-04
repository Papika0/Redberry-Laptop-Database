/* Getting the elements from the html file. */
const laptopImage = document.getElementById("laptop-img");
const userName = document.getElementById("name");
const team = document.getElementById("team");
const position = document.getElementById("position");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const laptopName = document.getElementById("laptop-name");
const laptopBrand = document.getElementById("laptop-brand");
const ram = document.getElementById("ram");
const memoryType = document.getElementById("memory-type");

const cpu = document.getElementById("cpu");
const cpuCores = document.getElementById("cpu-cores");
const cpuThreads = document.getElementById("cpu-threads");

const condition = document.getElementById("condition");
const laptopPrice = document.getElementById("laptop-price");

const date = document.getElementById("date");

/* Getting the id of the laptop from the local storage. */

const selectedId = localStorage.getItem("selectedId");

/**
 * It takes an element, a dataId and an api as parameters and then fetches the api and then loops
 * through the data and if the id matches the dataId it changes the innerText of the element to the
 * name of the data.
 * @param element - the element you want to change the innerText of
 * @param dataId - the id of the data you want to get
 * @param api - the api you want to fetch data from
 */
function getDataFromID(element, dataId, api) {
  fetch(`https://pcfy.redberryinternship.ge/api/${api}`)
    .then((response) => response.json())
    .then((data) => {
      let values = data.data;
      for (let i = 0; i < values.length; i++) {
        if (values[i].id === dataId) {
          element.innerText = values[i].name;
        }
      }
    });
}

/* Fetching the data from the api and then changing the innerText of the elements to the data. */
fetch(
  `https://pcfy.redberryinternship.ge/api/laptop/${selectedId}?token=86cb9de5c6639a9267f5e227ae047452`
)
  .then((response) => response.json())
  .then((data) => {
    const laptop = data.data.laptop;
    const employee = data.data.user;
    getDataFromID(team, employee.team_id, "teams");
    getDataFromID(position, employee.position_id, "positions");
    getDataFromID(laptopBrand, laptop.brand_id, "brands");

    laptopImage.src = "https://pcfy.redberryinternship.ge/" + laptop.image;
    userName.innerText = employee.name + " " + employee.surname;
    email.innerText = employee.email;
    phone.innerText = employee.phone_number;
    laptopName.innerText = laptop.name;
    ram.innerText = laptop.ram;
    memoryType.innerText = laptop.hard_drive_type;
    cpu.innerText = laptop.cpu.name;
    cpuCores.innerText = laptop.cpu.cores;
    cpuThreads.innerText = laptop.cpu.threads;
    if (laptop.state === "new") {
      condition.innerText = "ახალი";
    } else {
      condition.innerText = "მეორადი";
    }
    laptopPrice.innerText = laptop.price + " ₾";
    if (laptop.purchase_date) {
      date.innerText = laptop.purchase_date.replaceAll("-", " / ");
    } else {
      date.innerText = "დაზუსტებული არ არის";
    }
  });
