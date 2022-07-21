const cutButton = document.getElementById("cutButton");
const copyButton = document.getElementById("copyButton");
const pasteButton = document.getElementById("pasteButton");

copyButton.addEventListener("click", () => {
  if (prevActive != null) {
    prevActive.select();
    document.execCommand("copy", false);
  }
});

cutButton.addEventListener("click", () => {
  if (prevActive != null) {
    prevActive.select();
    document.execCommand("cut", false);
  }
});
pasteButton.addEventListener("click", () => {
  if (prevActive != null) {
    prevActive.select();
    navigator.clipboard.readText().then((text) => {
      prevActive.value = text;
    });
  }
});
