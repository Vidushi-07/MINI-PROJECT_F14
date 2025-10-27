console.log("Zoom Accessibility Plugin Loaded");

// --------------------
// Floating captions (STT output)
// --------------------
const captionDiv = document.createElement("div");
captionDiv.style.position = "fixed";
captionDiv.style.bottom = "10px";
captionDiv.style.right = "10px";
captionDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
captionDiv.style.color = "white";
captionDiv.style.padding = "8px";
captionDiv.style.borderRadius = "5px";
captionDiv.style.fontSize = "14px";
captionDiv.style.maxWidth = "300px";
captionDiv.style.zIndex = "2147483647";
captionDiv.style.wordWrap = "break-word";
captionDiv.style.pointerEvents = "none";
document.body.appendChild(captionDiv);

// --------------------
// Input box for TTS
// --------------------
const inputBox = document.createElement("input");
inputBox.type = "text";
inputBox.placeholder = "Type your message here";
inputBox.style.position = "fixed";
inputBox.style.bottom = "50px";
inputBox.style.left = "10px";
inputBox.style.zIndex = "2147483647";
inputBox.style.width = "300px";
inputBox.style.height = "30px";
inputBox.style.fontSize = "14px";
inputBox.style.padding = "5px";
inputBox.style.border = "2px solid #333";
inputBox.style.borderRadius = "5px";
inputBox.style.backgroundColor = "white";
inputBox.style.color = "black";
document.body.appendChild(inputBox);

// Speak button (optional)
const sendBtn = document.createElement("button");
sendBtn.textContent = "Speak";
sendBtn.style.position = "fixed";
sendBtn.style.bottom = "50px";
sendBtn.style.left = "320px";
sendBtn.style.zIndex = "2147483647";
sendBtn.style.height = "30px";
sendBtn.style.fontSize = "14px";
sendBtn.style.padding = "5px";
sendBtn.style.borderRadius = "5px";
document.body.appendChild(sendBtn);

// Dropdown for audio output
const deviceSelect = document.createElement("select");
deviceSelect.style.position = "fixed";
deviceSelect.style.bottom = "90px";
deviceSelect.style.left = "10px";
deviceSelect.style.zIndex = "2147483647";
document.body.appendChild(deviceSelect);

// Load available audio output devices and auto-select VB-Cable
async function loadAudioDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const outputs = devices.filter(d => d.kind === "audiooutput");
  deviceSelect.innerHTML = "";

  let vbCableFound = false;

  outputs.forEach(d => {
    const option = document.createElement("option");
    option.value = d.deviceId;
    option.textContent = d.label || `Speaker ${deviceSelect.length + 1}`;
    deviceSelect.appendChild(option);

    // Auto-select VB-Cable if found
    if (d.label.toLowerCase().includes("vb-cable")) {
      deviceSelect.value = d.deviceId;
      vbCableFound = true;
      console.log(`Auto-selected VB-Cable: ${d.label}`);
    }
  });

  if (!vbCableFound && outputs.length > 0) {
    deviceSelect.value = outputs[0].deviceId; // default to first device
  }
}
loadAudioDevices();

// Hidden audio element for routing TTS
const audioElement = document.createElement("audio");
audioElement.autoplay = true;
document.body.appendChild(audioElement);

// TTS function
async function speakText(text) {
  if (!text) return;

  // Stop any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";

  // Play via speech synthesis
  speechSynthesis.speak(utterance);

  // Route audio to selected device if supported
  const deviceId = deviceSelect.value;
  if (deviceId && audioElement.setSinkId) {
    try {
      await audioElement.setSinkId(deviceId);
      console.log(`TTS routed to device: ${deviceId}`);
    } catch (err) {
      console.error("Error setting audio output device:", err);
    }
  }
}

// Speak button click (optional)
sendBtn.onclick = () => {
  const text = inputBox.value.trim();
  if (text !== "") {
    speakText(text);
    inputBox.value = ""; // clear after speaking
  }
};

// --------------------
// Live typing-to-speech (with debounce)
// --------------------
let typingTimer;
const typingDelay = 400; // ms

inputBox.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    const text = inputBox.value.trim();
    if (text !== "") {
      speakText(text);
    }
  }, typingDelay);
});

// --------------------
// Live Captions (STT)
// --------------------
if (!('webkitSpeechRecognition' in window)) {
  alert("Your browser does not support Web Speech API. Please use Chrome.");
} else {
  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    captionDiv.textContent = transcript;
  };

  recognition.onerror = (event) => {
    console.error("STT Error:", event.error);
  };

  recognition.start();
}
