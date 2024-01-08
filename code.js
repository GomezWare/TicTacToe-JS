"use strict";

//GLOBAL VARS
let stat = document.querySelector("#status");
let turn = true;
let xwins = Number(0);
let owins = Number(0);

//FUNCTION
const scoreboardSet = () => {
  if ("xwins" in localStorage && "owins" in localStorage) {
    xwins = localStorage.getItem("xwins");
    owins = localStorage.getItem("owins");
  } else {
    localStorage.xwins = 0;
    localStorage.owins = 0;
  }
  document.querySelector("#xs").innerText = xwins;
  document.querySelector("#os").innerText = owins;
};

const scoreboardUpdate = () => {
  document.querySelector("#xs").innerText = xwins;
  document.querySelector("#os").innerText = owins;
};

const clearBoard = () => {
  document.querySelectorAll(".gameboard button").forEach((field) => {
    field.removeAttribute("disabled");
    field.innerHTML = "";
  });
};

const getFields = () => {
  let fields = [];
  Array.from(document.querySelector(".gameboard").children).forEach((e) => {
    fields.push(e.innerText);
  });
  return fields;
};

const checkTie = () => {
  let fields = getFields();

  let cont = Number(0);

  fields.forEach((e) => {
    if (e == "X" || e == "O") {
      cont++;
    }
  });

  if (cont == 9) {
    return true;
  } else {
    return false;
  }
};

const checkWin = () => {
  let fields = getFields();

  if (
    (fields[0] == "X" && fields[1] == "X" && fields[2] == "X") ||
    (fields[3] == "X" && fields[4] == "X" && fields[5] == "X") ||
    (fields[6] == "X" && fields[7] == "X" && fields[8] == "X") ||
    (fields[0] == "X" && fields[3] == "X" && fields[6] == "X") ||
    (fields[1] == "X" && fields[4] == "X" && fields[7] == "X") ||
    (fields[2] == "X" && fields[5] == "X" && fields[8] == "X") ||
    (fields[0] == "X" && fields[4] == "X" && fields[8] == "X") ||
    (fields[2] == "X" && fields[4] == "X" && fields[6] == "X")
  ) {
    xwin();
    return;
  }

  if (
    (fields[0] == "O" && fields[1] == "O" && fields[2] == "O") ||
    (fields[3] == "O" && fields[4] == "O" && fields[5] == "O") ||
    (fields[6] == "O" && fields[7] == "O" && fields[8] == "O") ||
    (fields[0] == "O" && fields[3] == "O" && fields[6] == "O") ||
    (fields[1] == "O" && fields[4] == "O" && fields[7] == "O") ||
    (fields[2] == "O" && fields[5] == "O" && fields[8] == "O") ||
    (fields[0] == "O" && fields[4] == "O" && fields[8] == "O") ||
    (fields[2] == "O" && fields[4] == "O" && fields[6] == "O")
  ) {
    owin();
    return;
  }

  if (checkTie()) {
    tie();
    return;
  }
};

const xwin = () => {
  xwins++;
  scoreboardUpdate();
  document.querySelector("#xwin").showModal();
  setTimeout(() => {
    document.querySelector("#xwin").close();
  }, 1500);
  clearBoard();
};
const owin = () => {
  owins++;
  scoreboardUpdate();
  document.querySelector("#owin").showModal();
  setTimeout(() => {
    document.querySelector("#owin").close();
  }, 1500);
  clearBoard();
};
const tie = () => {
  document.querySelector("#tie").showModal();
  setTimeout(() => {
    document.querySelector("#tie").close();
  }, 1500);
  clearBoard();
};

//MAIN
scoreboardSet();

document.querySelectorAll(".gameboard button").forEach((field) => {
  field.addEventListener("click", (e) => {
    e.preventDefault;
    if (e.target.nodeName == "BUTTON" || e.target.disabled == false) {
      e.target.setAttribute("disabled", "disabled");
      if (turn == true) {
        e.target.innerHTML = "X";
        stat.innerHTML = "Player O turn";
        turn = !turn;
        checkWin();
      } else {
        e.target.innerHTML = "O";
        stat.innerHTML = "Player X turn";
        turn = !turn;
        checkWin();
      }
    }
  });
});

document.querySelector("#clrBoard").addEventListener("click", () => {
  clearBoard();
  stat.innerHTML = "Game Start: Player X turn";
  turn = true;
});

document.querySelector("#save").addEventListener("click", () => {
  localStorage.xwins = xwins;
  localStorage.owins = owins;
  document.querySelector("#scoreSave").showModal();
  setTimeout(() => {
    document.querySelector("#scoreSave").close();
  }, 1500);
});

document.querySelector("#reset").addEventListener("click", () => {
  document.querySelector("#delConfirm").showModal();
});

document.querySelector("#by").addEventListener("click", () => {
  xwins = 0;
  owins = 0;
  scoreboardUpdate();
  localStorage.clear();
  document.querySelector("#scoreDel").showModal();
  setTimeout(() => {
    document.querySelector("#scoreDel").close();
  }, 1500);
  document.querySelector("#delConfirm").close();
});

document.querySelector("#bn").addEventListener("click", () => {
  document.querySelector("#delConfirm").close();
});
