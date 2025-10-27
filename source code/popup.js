const inputBox = document.getElementById("userText");
const speakBtn = document.getElementById("speakBtn");

function speakText(text) {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

speakBtn.addEventListener("click", () => {
  const text = inputBox.value.trim();
  if (text !== "") {
    speakText(text);
    inputBox.value = "";
  }
});

// Optional: allow Enter key to speak
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") speakBtn.click();
});
