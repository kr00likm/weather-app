console.log("client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg1");
const msgTwo = document.querySelector("#msg2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = "Loading....";
  msgTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = "unable to find location " + data.error;
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent = data.forecast;
          console.log(data.forecast);
          console.log(data.location);
        }
      });
    }
  );
  //   console.log(location);
});

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=konin").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log("unable to find location " + data.error);
//     } else {
//       console.log(data.forecast);
//       console.log(data.location);
//     }
//   });
// });
