
const BOLD_ICON = document.getElementById("boldIcon");
const ITALIC_ICON = document.getElementById("italicIcon");
const UNDERLINE_ICON = document.getElementById("underLineIcon");
const BACKGROUND_COLOR = document.getElementById("backgroundColorIcon");
const TEXT_ALIGN_LEFT = document.getElementById("textLeftIcon");
const TEXT_ALIGN_CENTER = document.getElementById("textCenterIcon");
const TEXT_ALIGN_RIGHT = document.getElementById("textRightIcon");
const FONT_FAMILY_SELECTOR = document.getElementById("font_family_selector");
const addressOutput = document.getElementById("cell_address_selector");
const sheetContainer = document.getElementById("sheetContainer");
let sheetAddressRow = document.createElement("section");
sheetAddressRow.setAttribute("class", "sheet__container__row__address");
let dummyCell = document.createElement("div");
dummyCell.setAttribute("class", "dummy cell cell__address cell__address__row");
sheetAddressRow.appendChild(dummyCell);
for (let i = 1; i <= 100; i++) {
  let addressCell = document.createElement("div");
  addressCell.setAttribute("class", "cell cell__address cell__address__row");
  addressCell.innerText = i;
  sheetAddressRow.appendChild(addressCell);
}
sheetContainer.appendChild(sheetAddressRow);
for (let col = 1; col <= COL; col++) {
  let sheetColumn = document.createElement("section");
  sheetColumn.setAttribute("class", "sheet__container__col");
  let columnAddress = document.createElement("div");
  columnAddress.setAttribute("class", "cell cell__address cell__address__col");
  columnAddress.innerText = String.fromCharCode(64 + col);
  sheetColumn.appendChild(columnAddress);
  for (let row = 1; row <= ROW; row++) {
    let cell = document.createElement("input");
    cell.setAttribute("class", "cell cell__data");
    cell.setAttribute("data-row", row);
    cell.setAttribute("data-col", col);
    sheetColumn.appendChild(cell);
    cell.addEventListener("click", () => {
      setAddressOnClick(cell, row, col);
      activeIcons(row, col);
      cell.style.fontFamily=FONT_FAMILY_SELECTOR.options[FONT_FAMILY_SELECTOR.selectedIndex].text;
    });
  }
  sheetContainer.appendChild(sheetColumn);
}
let prevActive = null;
function setAddressOnClick(cell, row, col) {
  if (prevActive != null) {
    prevActive.classList.remove("active");
  }
  prevActive = cell;
  prevActive.classList.add("active");
  addressOutput.value = `${String.fromCharCode(64 + col)} ${row}`;
}


function updateClass(element, className, flag) {
  if (flag) {
    if (!element.classList.contains(className))
      element.classList.add(className);
  } else {
    if (element.classList.contains(className))
      element.classList.remove(className);
  }
}

BOLD_ICON.addEventListener("click", () => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.bold = !cell.bold;
  updateClass(prevActive, "font--bold", cell.bold);
  updateClass(BOLD_ICON, "icon--active", cell.bold);
});
ITALIC_ICON.addEventListener("click", () => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.italic = !cell.italic;
  updateClass(prevActive, "font--italic", cell.italic);
  updateClass(ITALIC_ICON, "icon--active", cell.italic);
});
UNDERLINE_ICON.addEventListener("click", () => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.underline = !cell.underline;
  updateClass(prevActive, "text--underline", cell.underline);
  updateClass(UNDERLINE_ICON, "icon--active", cell.underline);
});

BACKGROUND_COLOR.children[0].addEventListener("change", (e) => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.background_color = e.target.value;
  prevActive.style.backgroundColor = e.target.value;
  updateClass(BACKGROUND_COLOR, "icon--active", cell.background_color);
});
TEXT_ALIGN_LEFT.addEventListener("click", () => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.text_align_left = !cell.text_align_left;
  updateClass(prevActive, "text__align--left", cell.text_align_left);
  updateClass(TEXT_ALIGN_LEFT, "icon--active", cell.text_align_left);
  TEXT_ALIGN_CENTER.classList.remove("icon--active");
  TEXT_ALIGN_RIGHT.classList.remove("icon--active");
  cell.text_align_center = false;
  cell.text_align_right = false;
  prevActive.classList.remove("text__align--right");
  prevActive.classList.remove("text__align--center");
});
TEXT_ALIGN_CENTER.addEventListener("click", () => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.text_align_center = !cell.text_align_center;
  updateClass(prevActive, "text__align--center", cell.text_align_center);
  updateClass(TEXT_ALIGN_CENTER, "icon--active", cell.text_align_center);
  TEXT_ALIGN_LEFT.classList.remove("icon--active");
  TEXT_ALIGN_RIGHT.classList.remove("icon--active");
  cell.text_align_left = false;
  cell.text_align_right = false;
  prevActive.classList.remove("text__align--left");
  prevActive.classList.remove("text__align--right");
});
TEXT_ALIGN_RIGHT.addEventListener("click", () => {
  let rowIndex = Number(prevActive.getAttribute("data-row"));
  let colIndex = Number(prevActive.getAttribute("data-col"));
  let cell = sheet[rowIndex][colIndex];
  cell.text_align_right = !cell.text_align_right;
  updateClass(prevActive, "text__align--right", cell.text_align_right);
  updateClass(TEXT_ALIGN_RIGHT, "icon--active", cell.text_align_right);
  TEXT_ALIGN_CENTER.classList.remove("icon--active");
  TEXT_ALIGN_LEFT.classList.remove("icon--active");
  cell.text_align_center = false;
  cell.text_align_left = false;
  prevActive.classList.remove("text__align--center");
  prevActive.classList.remove("text__align--left");
});

function activeIcon(icon, key, cellStyles) {
  if (cellStyles[key]) {
    if (!icon.classList.contains("icon--active")) {
      icon.classList.add("icon--active");
    }
  } else {
    if (icon.classList.contains("icon--active")) {
      icon.classList.remove("icon--active");
    }
  }
}
function activeIcons(row, col) {
  let cellStyles = sheet[row][col];
  activeIcon(BOLD_ICON, "bold", cellStyles);
  activeIcon(ITALIC_ICON, "italic", cellStyles);
  activeIcon(UNDERLINE_ICON, "underline", cellStyles);
  activeIcon(TEXT_ALIGN_LEFT, "text_align_left", cellStyles);
  activeIcon(TEXT_ALIGN_CENTER, "text_align_center", cellStyles);
  activeIcon(TEXT_ALIGN_RIGHT, "text_align_right", cellStyles);
  BACKGROUND_COLOR.children[0].value = cellStyles.background_color;
  FONT_FAMILY_SELECTOR.selectedIndex = cellStyles.font_family;
}

FONT_FAMILY_SELECTOR.addEventListener("change", (e) => {
  if (prevActive != null) {
    let rowIndex = Number(prevActive.getAttribute("data-row"));
    let colIndex = Number(prevActive.getAttribute("data-col"));
    sheet[rowIndex][colIndex].font_family = e.target.selectedIndex;
    prevActive.style.fontFamily=e.target.options[e.target.selectedIndex].text;
  }
});

document.getElementById("font_size_selector").addEventListener("change",(e)=>{
  let cells=document.querySelectorAll(".cell");
  cells.forEach(cell=>{
    cell.style.fontSize=`${e.target.value}px`;
  })
})
