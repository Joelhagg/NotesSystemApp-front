document.getElementById("loginSubmitButton").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");

  let usernameInput = document.getElementById("usernameInput").value;
  let passwordInput = document.getElementById("passwordInput").value;
  let loginUserInformation = {};

  let user = {
    username: usernameInput,
    password: passwordInput,
  };

  const postLogin = async () => {
    console.log(user);
    try {
      await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((result) => (loginUserInformation = result));
      if (loginUserInformation == "Ok username and password") {
        localStorage.setItem(
          "loginUserInformation",
          JSON.stringify(loginUserInformation)
        );
        console.log(loginUserInformation);
        window.alert("Du är inloggad!");
        window.location.href = "../index.html";
      } else {
        window.alert("Fel användarnamn eller lösenord");
        location.reload();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  postLogin();
});
