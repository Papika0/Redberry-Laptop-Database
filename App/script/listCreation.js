/* It's fetching data from the given url and then it's creating a list item for each object in the
data. */
fetch(
  "https://pcfy.redberryinternship.ge/api/laptops?token=86cb9de5c6639a9267f5e227ae047452"
)
  .then((response) => response.json())
  .then((data) => {
    const laptopData = data.data;
    laptopData.forEach((user) => {
      const fullName = user.user.name + " " + user.user.surname;
      const brand = user.laptop.name;
      const laptopId = user.laptop.id;
      const laptopImage =
        "https://pcfy.redberryinternship.ge/" + user.laptop.image;
      const listLi = createListLi(fullName, brand, laptopId, laptopImage);
      const laptopList = document.querySelector(".laptop-list");
      laptopList.append(listLi);
    });
  });

/**
 * It creates an element, adds text, class, id, href, source, and onclick function to it, and returns
 * the element.
 * @param element - the type of element you want to create
 * @param text - the text to be displayed in the element
 * @param className - the class name of the element
 * @param id - the id of the element
 * @param href - the link to the page
 * @param source - image source
 * @param saveId - if true, the onclick function will save the id of the parent li element to
 * localStorage.
 * @returns The elementDetails object.
 */
function createElement(element, text, className, id, href, source, saveId) {
  const elementDetails = document.createElement(element);
  if (text) {
    elementDetails.innerText = text;
  }
  if (className) {
    elementDetails.classList.add(className);
  }
  if (id) {
    elementDetails.id = id;
  }
  if (href) {
    elementDetails.href = href;
  }
  if (source) {
    elementDetails.src = source;
  }
  if (saveId) {
    elementDetails.addEventListener("click", function () {
      const selectedId = elementDetails.parentElement.closest("li").id;
      localStorage.setItem("selectedId", selectedId);
      console.log(localStorage.getItem("selectedId"));
    });
  }
  return elementDetails;
}

/**
 * It creates a list item with a div inside it, and inside that div there's an image and another div,
 * and inside that div there's three paragraphs and an anchor tag.
 * @param author - author of the laptop
 * @param imgSrc - the source of the image
 * @param laptop - the laptop name
 * @param id - id of the element
 * @returns the unit element.
 */
function createListLi(author, laptop, id, imgSrc) {
  const unit = createElement("li", null, "unit", id, null, null);
  const unitImgDiv = createElement("div", null, "unit-img", null, null);
  const unitImg = createElement("img", null, null, null, null, imgSrc);
  const unitInfoDiv = createElement("div", null, "unit-info", null, null);
  const unitInfoAuthor = createElement(
    "p",
    author,
    "unit-info-author",
    null,
    null
  );
  const unitInfoLaptop = createElement(
    "p",
    laptop,
    "unit-info-laptop",
    null,
    null
  );
  const unitInfoBtn = createElement(
    "a",
    "მეტის ნახვა",
    "unit-info-btn",
    null,
    "../pages/laptop-details.html",
    null,
    true
  );
  unit.append(unitImgDiv, unitInfoDiv);
  unitImgDiv.append(unitImg);
  unitInfoDiv.append(unitInfoAuthor, unitInfoLaptop, unitInfoBtn);
  return unit;
}
