function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.getElementById('tile'), value => [0, 3, 6, 1, 2, 12, 25, 32, 64, 128, 256].includes(Number(value)));

document.querySelector('button').addEventListener('click', () => {
  const board = [];
  for (let i = 0; i < 8; i++) {
    document.getElementById(`t${i}`).value = 2 ** (i + Math.log2(document.getElementById('tile').value || 32));
    board.push(document.getElementById(`${i + 1}`).value || 0);
  }

  fetch(`https://2048-ai-11.cubeythecube.repl.co/move/${document.getElementById('tile').value}/${board.join('-')}`)
  .then((res) => res.json())
  .then((res) => {
    document.getElementById('result').innerText = `Move: ${res.move}\nSuccess Probability: ${res.prob}`;
  })
  .catch(() => undefined);
});