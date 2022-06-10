let paramsId = "";
let responseData = [];

const init = async () => {
  let localStorageUserString = localStorage.getItem("loginUserInformation");
  let localStorageUserParsed = JSON.parse(localStorageUserString);

  if (!localStorageUserParsed) {
    isAuth = false;
    window.alert("Du är inte inloggad");
    window.location.href = "../login/login.html";
  } else {
    isAuth = true;
  }

  let params = new URLSearchParams(document.location.search);
  paramsId = params.get("Id");
  console.log("paramsId", paramsId);

  await fetch("http://localhost:3000/fetchdocs/edit/" + paramsId)
    .then((response) => response.json())
    .then((result) => (responseData = result));

  console.log(responseData);

  let headerContainer = document.getElementById("headerContainer");
  headerContainer.innerText = responseData[0].header;

  let textContainer = document.getElementById("textContainer");
  textContainer.innerHTML = responseData[0].textContent;

  let createdContainer = document.getElementById("createdContainer");
  createdContainer.innerText = responseData[0].created;

  let lastChangedContainer = document.getElementById("lastChangedContainer");
  lastChangedContainer.innerText = responseData[0].lastChanged;

  document.getElementById("printButton").addEventListener("click", () => {
    window.print();
  });
};
init();
