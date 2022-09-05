
// 1. This script gets the api data

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
  elements.forEach((element) => {
    const option = document.createElement('option');
    option.value = element.id;
    option.innerText = element.name;
    elementsSelectMenu.appendChild(option);

  });
}

getElements("teams", apiUrl, setElementsToHtml, "team_id");
getElements("brands", apiUrl, setElementsToHtml, "laptop_brand_id");
getElements("positions", apiUrl, setElementsToHtml, "position_id");
getElements("cpus", apiUrl, setElementsToHtml, "laptop_cpu");

// 2. This script contains form validations

const geoPattern = /^[ა-ჰ]+$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[redberry]+\.[ge]{2}$/;
const phoneNumberPattern = /(\+995)+[0-9]{9}$/;
const englishAndNumberAndSpecialCharPattern = /^[a-zA-Z0-9!@#$%^&*()_+=]*$/;
const positiveNumbersPattern = /^[0-9]+$/;

function checkValidation (id, pattern) {
    const input = document.querySelector("#"+id);
    const input2 = document.querySelector("#small"+id);
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (pattern.test(value) != true) {
            input.style.borderColor = "red";
            input2.hidden = false;
        } else {
            input.style.borderColor = '#8AC0E2';
            input2.hidden = true;
        }
    }) 
}

// 3. This script contains local storage components

function recToLocalStorage (id) {
  const input = document.querySelector("#"+id);
  const localStorageItems = localStorage.getItem("#"+id);
  input.value = localStorageItems;
  input.addEventListener('input', (e) => {
    const value = e.target.value;
    localStorage.setItem("#"+id, value);
    console.log(value);
  })

}

function recToLocalStorageForRadio (id) {

  const inputs = document.querySelectorAll("#"+id);
  const localStorageItems = localStorage.getItem("#"+id);
  for (input of inputs) {
    if (input.value == localStorageItems) {
      input.checked = true;
    }
  }
  for (input of inputs) {
    input.onclick = (e) => {
      const value = e.target.value;
      localStorage.setItem("#"+id, value);
    }
  }
}

// 4. This scipt validates the form and also records and gets data to/from local storage

if (document.location.pathname === '/employee_info.html') {
  checkValidation ('name', geoPattern);
  checkValidation ('surname', geoPattern);
  checkValidation ('email', emailPattern);
  checkValidation ('phone_number', phoneNumberPattern);
  recToLocalStorage ('name');
  recToLocalStorage ('surname');
  recToLocalStorage ('email');
  recToLocalStorage ('phone_number');
  recToLocalStorage ('team_id');
  recToLocalStorage ('position_id');  
}

if(document.location.pathname === '/laptop_info.html') {
  checkValidation ('laptop_name', englishAndNumberAndSpecialCharPattern);
  checkValidation ('laptop_cpu_cores', positiveNumbersPattern);
  checkValidation ('laptop_cpu_threads', positiveNumbersPattern);
  checkValidation ('laptop_ram', positiveNumbersPattern);
  checkValidation ('laptop_price', positiveNumbersPattern);
  recToLocalStorage ('laptop_name');
  recToLocalStorage ('laptop_cpu_cores');
  recToLocalStorage ('laptop_cpu_threads');
  recToLocalStorage ('laptop_ram');
  recToLocalStorage ('laptop_price');
  recToLocalStorage ('laptop_brand_id');
  recToLocalStorage ('laptop_cpu');
  recToLocalStorageForRadio ('laptop_hard_drive_type');
  recToLocalStorageForRadio ('laptop_state');
}


 async function submitForm() {

  localStorage.setItem("token", "e113a24d23bb6c990b531705e476123f");

  elements = "laptop/create";
  // Default options are marked with *
  const response = await fetch(`${apiUrl}/${elements}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(localStorage) // body data type must match "Content-Type" header
  });
  console.log( response.json()); // parses JSON response into native JavaScript objects
}


// function saveFormValue() {
//     localStorage.setItem("fName", document.getElementById("fName").value);
// }

// function loadFormValue() {
//     const x = localStorage.getItem("fName");
//     document.getElementById("fName").value = x;
// }

// saveFormValue();
// loadFormValue();

// let input = document.getElementById("fName");

// console.log(pattern.test(input.value));
// console.log(pattern);
// console.log(input);

// const nameInput = document.querySelector('#fName');

// nameInput.addEventListener('input', (e) => {
//     const value = e.target.value;
//     console.log(pattern.test(value));
//     console.log(value);
// });


// function checkValidation (id, pattern) {
//   const input = document.querySelector("#"+id);
//   const input2 = document.querySelector("#small"+id);
//   input.value = localStorageItems;
//   input.addEventListener('input', (e) => {
//       const value = e.target.value;
//       if (pattern.test(value) != true) {
//           input.style.borderColor = "red";
//           input2.hidden = false;
//           localStorage.setItem("#"+id, input.value);
//       } else {
//           input.style.borderColor = '#8AC0E2';
//           input2.hidden = true;
//           localStorage.setItem("#"+id, input.value);
//       }
//   }) 
// }