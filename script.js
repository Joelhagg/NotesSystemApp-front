isAuth = false;
let loggedInOptions = document.getElementById("loggedInOptions");
let notLoggedInConatiner = document.getElementById("notLoggedInConatiner");

const init = () => {
  let localStorageUserString = localStorage.getItem("loginUserInformation");
  let localStorageUserParsed = JSON.parse(localStorageUserString);

  if (!localStorageUserParsed) {
    isAuth = false;
  } else {
    isAuth = true;
  }

  if (isAuth) {
    loggedInOptions.classList.remove("isAuth");
    notLoggedInConatiner.classList.add("isAuth");
  } else {
    loggedInOptions.classList.add("isAuth");
    notLoggedInConatiner.classList.remove("isAuth");
  }

  document.getElementById("logOutButton").addEventListener("click", () => {
    localStorage.clear();
    isAuth = false;
    location.reload();
  });
};
init();
