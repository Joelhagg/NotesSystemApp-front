isAuth = false;
let paramsId = "";
let responseData = [];
let savaBtn = document.getElementById("saveBtn");
let textarea = document.getElementById("textarea");
textarea.value = "";

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

  await tinymce.init({
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

  let params = new URLSearchParams(document.location.search);
  paramsId = params.get("Id");
  console.log("paramsId", paramsId);
  await fetch("http://localhost:3000/fetchdocs/edit/" + paramsId)
    .then((response) => response.json())
    .then((result) => (responseData = result));

  console.log(responseData);

  tinymce.activeEditor.setContent(responseData[0].textContent);

  let headerInput = document.getElementById("headerInput");
  headerInput.value += responseData[0].header;

  let dateInput = document.getElementById("dateInput");
  dateInput.value += responseData[0].created;
};

savaBtn.addEventListener("click", async () => {
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

  if (textarea == "") {
    textarea = responseData[0].textContent;
  }

  let changedData = {
    id: responseData[0].id,
    header: headerInput,
    textContent: textarea,
    created: responseData[0].created,
    lastChanged: new Date().toLocaleString(),
  };
  console.log(changedData);

  await fetch("http://localhost:3000/fetchdocs/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changedData),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));

  window.alert("Dokumentet ändrades och sparades");
  window.location.href = "../documents/documents.html";
});

init();
