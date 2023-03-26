const refs = {
  startBtn: document.querySelector("[data-start]"),
  stopBtn: document.querySelector("[data-stop]"),
  bodyEl: document.querySelector("body"),
}
let timerId = null;

attributesToggle();

refs.startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
      refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  attributesToggle();
});

refs.stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  attributesToggle();
  console.log(`Interval with id ${timerId} has stopped!`);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function attributesToggle() {
  const startBtnIsDisabled = refs.startBtn.hasAttribute("disabled");
  const stopBtnIsDisabled = refs.stopBtn.hasAttribute("disabled");

  if (!startBtnIsDisabled && !stopBtnIsDisabled) {
    refs.stopBtn.setAttribute("disabled", true);
  } else if (!startBtnIsDisabled && stopBtnIsDisabled) {
      refs.startBtn.setAttribute("disabled", true);
      refs.stopBtn.removeAttribute("disabled"); 
  } else {
    refs.startBtn.removeAttribute("disabled");
    refs.stopBtn.setAttribute("disabled", true);
  }
}