isAuth = false;
const init = () => {
  let localStorageUserString = localStorage.getItem("loginUserInformation");
  let localStorageUserParsed = JSON.parse(localStorageUserString);

  if (!localStorageUserParsed) {
    isAuth = false;
    window.alert("Du är inte inloggad");
    window.location.href = "../login/login.html";
  } else {
    isAuth = true;
  }

  tinymce.init({
    selector: "#textarea",
    height: 500,
    width: 600,
    toolbar:
      "undo redo | forecolor backcolor | styles bold italic | alignleft aligncenter alignright | code ",

    setup: (editor) => {
      editor.on("change", () => {
        editor.save();
      });
    },
  });
  document.getElementById("saveBtn").addEventListener("click", async () => {
    let localStorageUserString = localStorage.getItem("loginUserInformation");
    let localStorageUserParsed = JSON.parse(localStorageUserString);

    if (!localStorageUserParsed) {
      isAuth = false;
      window.alert("Du är inte inloggad");
      window.location.href = "../login/login.html";
    } else {
      isAuth = true;
    }

    let headerInput = document.getElementById("headerInput").value;
    let textarea = document.getElementById("textarea").value;
    console.log("headerInput", headerInput);
    console.log("textarea", textarea);

    let doc = {
      header: headerInput,
      textContent: textarea,
    };
    console.log(doc);

    await fetch("http://localhost:3000/savedoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));

    window.alert("Det nya dokumentet skapades och sparades");
    window.location.href = "../index.html";
  });
};

init();
