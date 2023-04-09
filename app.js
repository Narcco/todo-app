// Hi if you want yo undrstand the section you can press cntrl + F the write // then by pressing enter button you can see every section and see the works

// |consts|
// text box
const Textbox = document.querySelector('#new-text');
const mainBox = document.querySelector('#main-box');
const Save = document.querySelector('.save-btn');
const close2 = document.querySelector('.cancel-btn');
const newtextInput = document.querySelector('#newtext-input');
const confirmation = document.querySelector('#confirmation');
const yes = document.querySelector('.yes');
const no = document.querySelector('.no');

// folder box
const addfolder = document.querySelector('#addfolder')
const CreateFloderBtn = document.querySelector('.Create-floder-btn');
const newFloder = document.querySelector('#new-floder');
const folderbox = document.querySelector('.folder-box');
const Save2 = document.querySelector('.save-btn2');
const close3 = document.querySelector('.cancel-btn2');
const newfolderInput = document.querySelector('#newfolder-input');
const folders = document.querySelector('.folders');

// main page
const infoContainer = document.querySelector('.info-container');
const addText = document.querySelector('.add-text');
const buttons = document.querySelectorAll('.Done');

// menu
const burgermenu = document.querySelector('#burgermenu');
const menubackground = document.querySelector('#menubackground');
const Menu = document.querySelector('#menu');
const close = document.querySelector('#close');
const clearbtn = document.querySelector('.clear-btn');
const confirmation2 = document.querySelector('#confirmation2');
const yes2 = document.querySelector('.yes2');
const no2 = document.querySelector('.no2');
// -------------------------------------------------------------------------------------------

let activeFolder = "";

function loadMessages() {
  const storedMessages = JSON.parse(localStorage.getItem('folders'));

  if (storedMessages) {
    const index = storedMessages.findIndex((x) => x.name === activeFolder);

    infoContainer.innerHTML = "";
    storedMessages[index].messages.map((item) => {
      const HTML = `
          <div class='message' aria-id='${item.id}'>message:<br><p>${item.message}</p>
            <button class="Done" onclick="finished(this)">Done</button>
          </div>`;
      infoContainer.insertAdjacentHTML('afterbegin', HTML);
    })
  }
}

function handleActiveFolder(element) {
  activeFolder = element.textContent;

  const folderElements = document.querySelectorAll('#folder');
  folderElements.forEach(function (folderElement) {
    folderElement.classList.remove('active-folder');
  });

  element.classList.add("active-folder");

  const storedMessages = JSON.parse(localStorage.getItem('folders'));
  const index = storedMessages.findIndex((x) => x.name == activeFolder);

  if (storedMessages.length > 0) {

    infoContainer.innerHTML = "";
    storedMessages[index].messages.map((item) => {
      const HTML = `
          <div class='message' aria-id='${item.id}'>message:<br><p>${item.message}</p>
            <button class="Done" onclick="finished(this)">Done</button>
          </div>`;
      infoContainer.insertAdjacentHTML('afterbegin', HTML);
    })
  }
}

// closing part

close.addEventListener('click', function () {
  Menu.classList.remove('active');
  menubackground.classList.remove('aactive');
});


menubackground.addEventListener('click', function () {
  Menu.classList.remove('active');
  menubackground.classList.remove('aactive');
});


close2.addEventListener('click', function () {
  Menu.classList.remove('active')
  menubackground.classList.remove("aactive")

  if (newtextInput.value.length <= 25) {
    Textbox.classList.remove('activee');
  } else if (newtextInput.value.length >= 25) {
    confirmation.classList.add("active4")
  }
});


document.addEventListener('mousedown', function (event) {
  const isTextboxClicked = Textbox.contains(event.target);
  const isClickedInsideMainBox = mainBox.contains(event.target);
  if (!isClickedInsideMainBox) {
    if (newtextInput.value.length <= 25) {
      Textbox.classList.remove('activee');
      newtextInput.value = ""
    } else if (newtextInput.value.length >= 25) {
      confirmation.classList.add("active4")
    }
  }
});


yes.addEventListener('click', function () {
  newtextInput.value = null
  Textbox.classList.remove('activee');
  setTimeout(() => {
    confirmation.classList.remove("active4")
  }, 200);
})


no.addEventListener('click', function () {
  setTimeout(() => {
    confirmation.classList.remove("active4")
  }, 100);
})


close3.addEventListener('click', function () {
  newFloder.classList.remove('activeee');
  newfolderInput.value = "";
});


newFloder.addEventListener('click', (event) => {
  if (event.target === newFloder) {
    newFloder.classList.remove('activeee');
    newfolderInput.value = "";
  }
});

// removing part

function finished(elem) {
  const parentDiv = elem.closest('.message');
  const _folders_ = localStorage.getItem('folders')
  let parsed = JSON.parse(_folders_);

  const index = parsed.findIndex((x) => x.name === activeFolder);


  let array = parsed[index].messages.reverse();
  let messageIndex = array.findIndex((x) => x.id === Number(parentDiv.getAttribute("aria-id")));


  let filtered = array.filter((x) => x.id !== array[messageIndex].id);

  parsed[index].messages = filtered;

  console.log(parsed)

  parentDiv.remove();
  localStorage.setItem("folders", JSON.stringify(parsed))
}


function deletee(elem2) {
  const deletafolder = elem2.closest('#folder');


  const localStorage_folders = localStorage.getItem("folders");

  if (localStorage_folders) {
    let json = JSON.parse(localStorage_folders);
    let filtered = json.filter((x) => deletafolder.getAttribute("aria-id") != x.id);

    localStorage.setItem("folders", JSON.stringify(filtered));

    deletafolder.remove();
  }
}


clearbtn.addEventListener('click', function () {
  if (folders.innerHTML !== '') {
    confirmation2.classList.add('active5');
  }
});


yes2.addEventListener('click', function () {
  folders.innerHTML = '';

  try {
    localStorage.removeItem("folders")
  } catch { }

  setTimeout(() => {
    confirmation2.classList.remove('active5')
  }, 200);
})


no2.addEventListener('click', function () {
  setTimeout(() => {
    confirmation2.classList.remove('active5')
  }, 100);
})


newfolderInput.value = "";
newtextInput.value = "";



// opening things part


addText.addEventListener('click', function addtextbtn() {
  if (activeFolder == "") {
    addText.style.color = 'gray';
    addText.disabled = true; // disable the button
  } else {
    addText.style.color = 'white';
    Textbox.classList.add('activee');
  }
});

addfolder.addEventListener('click', function () {
  newFloder.classList.add('activeee');
  newfolderInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
});

CreateFloderBtn.addEventListener('click', function () {
  newFloder.classList.add('activeee');
  newfolderInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
});


burgermenu.addEventListener('click', function () {
  Menu.classList.toggle('active');
  menubackground.classList.toggle('aactive');
});


// ||saving parts||

// save 1

function SaveFunction() {
  if (newtextInput.value.trim() !== '') {
    const _folders_ = localStorage.getItem("folders");
    const parsed = JSON.parse(_folders_);

    console.log(activeFolder)
    const index = parsed.findIndex((x) => x.name === activeFolder);

    const pushObj = {
      id: parsed[index].messages.length !== 0 ? parsed[index].messages.reverse()[0].id + 1 : 1,
      message: newtextInput.value.trim(),
      date: Date.now()
    }


    parsed[index].messages.push(pushObj);

    localStorage.setItem("folders", JSON.stringify(parsed));

    loadMessages();

    document.querySelector('#new-text').classList.remove("activee")
  } else {
    newtextInput.style.borderColor = 'red';
    newtextInput.animate([
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' },
    ], { duration: 200, iterations: 1 });
    setTimeout(() => {
      newtextInput.style.borderColor = '#424242';
    }, 400);
  }
}

Save.addEventListener('click', SaveFunction);

newtextInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    SaveFunction();
  }
});

// save 2

function SaveFunction2() {
  if (newfolderInput.value.trim() !== '') {
    let localStorage_folders = localStorage.getItem("folders");

    let nextId = 1;
    if (localStorage_folders) {
      const json = JSON.parse(localStorage_folders);
      const lastItem = json[json.length - 1];
      if (lastItem) {
        nextId = lastItem.id + 1;
      }
    }

    const newFolderName = newfolderInput.value.trim();

    if (localStorage_folders) {
      const json = JSON.parse(localStorage_folders);
      const existingFolder = json.find(folder => folder.name === newFolderName);
      if (existingFolder) {
        alert(`A folder with the name "${newFolderName}" already exists. Please choose a different name.`);
        return;
      }
    }

    const pushObj = {
      name: newFolderName,
      id: nextId,
      messages: [],
    }

    if (localStorage_folders) {
      const json = JSON.parse(localStorage_folders);
      json.push(pushObj);
      localStorage.setItem("folders", JSON.stringify(json));
    } else {
      localStorage.setItem("folders", JSON.stringify([pushObj]));
    }

    activeFolder = newFolderName

    const HTML2 = `
      <div id="folder" class="main-folder" aria-id='${pushObj.id}' onclick="handleActiveFolder(this)"><P><ion-icon name="folder-outline"></ion-icon>${pushObj.name}<P><button id="delete-box" onclick="deletee(this)"><ion-icon name="trash-outline"></ion-icon></button></div>
    `;
    folders.insertAdjacentHTML('afterbegin', HTML2);

    const folder = document.querySelector('#folder');
    const deleteFolder = document.querySelector('#delete-box');

    folder.addEventListener('mouseover', () => {
      deleteFolder.classList.add('active6');
    });

    folder.addEventListener('mouseleave', () => {
      deleteFolder.classList.remove('active6');
    });

    let deleteFolderTimer = null;

    deleteFolder.addEventListener("mouseover", () => {
      deleteFolder.disabled = true;
      deleteFolder.style.cursor = "default";
      deleteFolderTimer = setTimeout(() => {
        deleteFolder.style.cursor = "pointer";
        deleteFolder.disabled = false;
      }, 2000);
    });

    deleteFolder.addEventListener('mouseleave', () => {
      clearTimeout(deleteFolderTimer);
    });

    setTimeout(() => {
      newFloder.classList.remove('activeee');
    }, 100);
    newfolderInput.value = null;

  } else {
    newfolderInput.style.borderColor = 'red';
    newfolderInput.animate([
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' },
    ], { duration: 200, iterations: 1 });
    setTimeout(() => {
      newfolderInput.style.borderColor = '#424242';
    }, 400);
  }
};


Save2.addEventListener('click', () => {
  SaveFunction2()
});

newfolderInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    SaveFunction2();
  }
});



// load the folders

function loadFolders() {
  const localStorage_folders = localStorage.getItem("folders");

  if (localStorage_folders) {
    const json = JSON.parse(localStorage_folders);
    const pushObj = {
      name: newfolderInput.value,
      id: json.length !== 0 ? json.reverse()[0].id + 1 : 1
    }

    json.reverse().map((item) => {
      const HTML2 = `
          <div id="folder" aria-id='${item.id}' onclick="handleActiveFolder(this)"><P><ion-icon name="folder-outline"></ion-icon>${item.name}<P><button id="delete-box" onclick="deletee(this)"><ion-icon name="trash-outline"></ion-icon></button></div>
          `;

      folders.insertAdjacentHTML('afterbegin', HTML2);

      const folder = document.querySelector('#folder');
      const deleteFolder = document.querySelector('#delete-box');

      folder.addEventListener('mouseover', () => {
        deleteFolder.classList.add('active6');
      });

      folder.addEventListener('mouseleave', () => {
        deleteFolder.classList.remove('active6');
      });

      let deleteFolderTimer = null;

      deleteFolder.addEventListener("mouseover", () => {
        deleteFolder.disabled = true;
        deleteFolder.style.cursor = "default";
        deleteFolderTimer = setTimeout(() => {
          deleteFolder.style.cursor = "pointer";
          deleteFolder.disabled = false;
        }, 2000);
      });

      deleteFolder.addEventListener('mouseleave', () => {
        clearTimeout(deleteFolderTimer);
      });
    })
  }
}

loadFolders()




// tooltips

tippy('#addfolder', {
  content: 'add folder',
});

tippy('#burgermenu', {
  content: 'open menu',
});

tippy('.add-text', {
  content: 'new text',
});


// ||others||




// END

window.addEventListener('beforeunload', function () {
  const folderElements = document.querySelectorAll('#folder');
  folderElements.forEach(function (folderElement) {
    folderElement.classList.remove('active-folder');
    activeFolder = "";
  });
});

