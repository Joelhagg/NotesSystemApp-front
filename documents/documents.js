let isAuth = false;
let documentPreview = document.getElementById("documentPreview");

let fetchedDocs = [];

const fetchAllDocs = async () => {
  let localStorageUserString = localStorage.getItem("loginUserInformation");
  let localStorageUserParsed = JSON.parse(localStorageUserString);

  if (!localStorageUserParsed) {
    isAuth = false;
    window.alert("Du är inte inloggad");
    window.location.href = "../login/login.html";
  } else {
    isAuth = true;
  }

  try {
    await fetch("http://localhost:3000/fetchdocs")
      .then((response) => response.json())
      .then((result) => (fetchedDocs = result));
  } catch (error) {
    console.log("error", error);
  }
  fetchedDocs.forEach((doc) => {
    console.log(fetchedDocs);
    let docWraper = document.createElement("div");
    let changeContentBtn = document.createElement("button");
    let viewContentBtn = document.createElement("button");
    let firstDeleteContentBtn = document.createElement("button");
    let secondDeleteContentBtn = document.createElement("button");
    let noToDeleteBtn = document.createElement("button");
    docWraper.innerHTML += `
    <br/ >
    <br />
    <h2>Rubrik: ${doc.header}</h2>
    <h3>Textinnehåll: </h3>
    <p>${doc.textContent}</p>
    <br/>
    <h4>Dokumentet skapades: ${doc.created}</h4>
    <br />
    <h4>Senast ändrad: ${doc.lastChanged}</h4>
    <br />
    <br />
     `;
    changeContentBtn.innerText = "Redigera";
    changeContentBtn.addEventListener("click", () => {
      changeDoc(doc.id);
    });
    viewContentBtn.innerText = "Se hela dokumentet";
    viewContentBtn.addEventListener("click", () => {
      viewDoc(doc.id);
    });
    firstDeleteContentBtn.innerText = "Radera";
    firstDeleteContentBtn.addEventListener("click", () => {
      secondDeleteContentBtn.innerText = "Är du säker på att du vill radera???";
      secondDeleteContentBtn.style.color = "red";
      noToDeleteBtn.innerText = "NEJ!";
      noToDeleteBtn.addEventListener("click", () => {
        noToDeleteDoc();
      });
      docWraper.appendChild(secondDeleteContentBtn);
      docWraper.appendChild(noToDeleteBtn);
      secondDeleteContentBtn.addEventListener("click", () => {
        deleteDoc(doc.id);
      });
    });

    docWraper.appendChild(viewContentBtn);
    docWraper.appendChild(changeContentBtn);
    docWraper.appendChild(firstDeleteContentBtn);
    documentPreview.append(docWraper);
  });

  const changeDoc = (id) => {
    console.log(id);
    window.location = "../changeEditor/changeEditor.html?Id=" + id;
  };
  const viewDoc = (id) => {
    console.log(id);
    window.location = "../preview/preview.html?Id=" + id;
  };

  const noToDeleteDoc = () => {
    location.reload();
  };

  const deleteDoc = async (id) => {
    console.log(id);
    try {
      await fetch("http://localhost:3000/delete/" + id)
        .then((response) => response.json())
        .then((result) => console.log(result));
      location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };
};
fetchAllDocs();
