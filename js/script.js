
let newspapers = [];

class Newspaper {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}


async function populateNewspapers() {
  const requestURL = "https://api.jsonbin.io/v3/b/656f3d2f0574da7622d098c9"; 
  const apiKey = '$2a$10$Uqdj8raI6Bxh5zmL7oOlbu6lsByIW6VQ3DS51E1Co1cdebCu08h2W'; 

  const request = new Request(requestURL);
  request.headers.append('X-Master-Key', apiKey);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const data = await response.json();
      addNewspaper(data.record);
      showNewspaperHeader();
      showNewspapers();
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}


function addNewspaper(data) {
  for (let n of data) {
    let newspaper = new Newspaper(n.name, n.type);
    newspapers.push(newspaper);
  }
}


function showNewspaperHeader() {
  const header = document.querySelector("header");
  const myH1 = document.createElement("h1");
  myH1.innerText = "Каталог газет";
  header.appendChild(myH1);
}


function showNewspapers() {
  const main = document.querySelector("article");
  const printedDiv = document.createElement("div");
  const onlineDiv = document.createElement("div");
  const myH2Printed = document.createElement("h2");
  const myH2Online = document.createElement("h2");

  myH2Printed.textContent = "Друковані видання";
  myH2Online.textContent = "Електронні видання";

  const listPrinted = document.createElement("ul");
  const listOnline = document.createElement("ul");

  for (const n of newspapers) {
    const listItem = document.createElement("li");
    listItem.textContent = n.name;
    if (n.type === "printed") {
      listPrinted.appendChild(listItem);
    } else if (n.type === "online") {
      listOnline.appendChild(listItem);
    }
  }

  printedDiv.appendChild(myH2Printed);
  printedDiv.appendChild(listPrinted);
  onlineDiv.appendChild(myH2Online);
  onlineDiv.appendChild(listOnline);

  main.appendChild(printedDiv);
  main.appendChild(onlineDiv);
}

populateNewspapers(); 
