apiUrl = 'https://pcfy.redberryinternship.ge/api';

function getElements(elements, url, callback, elementId) {
  fetch(`${url}/${elements}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse, id) => {
      callback(jsonResponse.data, elementId);
    })
    .catch((error) => console.log(error));
}
function setElementsToHtml(elements, elementId) {
  const elementsSelectMenu = document.getElementById(elementId);
  console.log(elementsSelectMenu);
  elements.forEach((element) => {
    const option = document.createElement('option');
    option.value = element.id;
    option.innerText = element.name;
    elementsSelectMenu.appendChild(option);
    console.log(elementsSelectMenu.appendChild(option));
  });
}

getElements("teams", apiUrl, setElementsToHtml, "team");
getElements("brands", apiUrl, setElementsToHtml, "brand");
getElements("positions", apiUrl, setElementsToHtml, "position");
getElements("cpus", apiUrl, setElementsToHtml, "cpu");

