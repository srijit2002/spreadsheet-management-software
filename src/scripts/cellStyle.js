let sheet = [];
class ArraySet{
  constructor(){
   this.set=new Set();
  }
  add(arr) {
    this.set.add(JSON.stringify(arr));
  }
  delete(arr) {
    this.set.delete(arr.toString(arr));
  }
  getAllAsArray(){
    let data=[];
    this.set.forEach (value=>{
      data.push(JSON.parse(value));
    })
    return data;
  }
}
for (let row = 0; row < ROW; row++) {
  let sheetRow = [];
  for (let col = 0; col < COL; col++) {
    let cell = {
      value: "",
      formula: "",
      children: new ArraySet(),
      font_family: STYLES_DEFAULT.FONT_FAMILY,
      bold: STYLES_DEFAULT.BOLD,
      italic: STYLES_DEFAULT.ITALIC,
      underline: STYLES_DEFAULT.UNDERLINE,
      background_color: STYLES_DEFAULT.BACKGROUND_COLOR,
      text_align_left: STYLES_DEFAULT.TEXT_ALIGN_LEFT,
      text_align_center: STYLES_DEFAULT.TEXT_ALIGN_CENTER,
      text_align_right: STYLES_DEFAULT.TEXT_ALIGN_RIGHT,
    };
    sheetRow.push(cell);
  }
  sheet.push(sheetRow);
}
