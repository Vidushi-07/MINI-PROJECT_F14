# 🧩 Bridging the Silence: Phone Calls for Deaf People to Attend and Communicate  
📘 **A Socially Relevant Mini Project — Panimalar Engineering College (CSE Department, 2025)**  

---

## 🎯 Project Overview  

People with hearing and speech impairments face major barriers in real-time communication — especially during **phone calls, meetings, and emergencies**.  
This project bridges that gap by developing an **AI-powered communication platform** that enables two-way interaction between hearing and non-hearing individuals using:  

🎙️ **Speech-to-Text (STT):** Converts spoken voice into readable text.  
💬 **Text-to-Speech (TTS):** Converts typed messages into natural-sounding speech.  
✋ **(Optional)** Sign Language Recognition using AI frameworks like MediaPipe or TensorFlow.  

The platform promotes **accessibility, inclusivity, and independence** for people with hearing and speech disabilities.  

---

## ⚙️ Features  

✅ Real-time speech recognition & caption display  
✅ Live text-to-speech response with natural voice output  
✅ Low-latency communication using browser APIs  
✅ Noise handling & context-aware STT processing  
✅ User-friendly floating UI integrated with Zoom Web Client  
✅ Secure & privacy-focused (no external data storage)  

---

## 🧠 System Architecture  

**Three-tier structure:**  

1. **Presentation Layer:** Web interface (Zoom plugin / Browser extension)  
2. **Application Layer:** Handles STT, TTS, and real-time text routing  
3. **Processing Layer:** AI modules for speech recognition, synthesis & noise filtering  

---

## 💻 Implementation Details  

**Languages & Tools:**  
- HTML, CSS, JavaScript  
- Web Speech API (for STT and TTS)  
- Chrome Extension Manifest v3  
- Optional: VB-Cable / Voicemeeter for virtual audio routing  

---

## 🚀 How to Run the Project  

### 🧩 STEP 1 — Set Up Files  
Create a new folder called **zoom-accessibility-plugin** and put these files inside:  
```
1) manifest.json  
2) content.js  
3) popup.html  
4) popup.js
```

---

### ⚙️ STEP 2 — Load in Chrome  
1. Open Chrome → go to `chrome://extensions/`  
2. Enable **Developer mode** (top-right corner)  
3. Click **Load unpacked**  
4. Select your `zoom-accessibility-plugin` folder  
5. It will now appear in your extension list 🎉  

---

### 🧠 STEP 3 — Test the Plugin  
1. Open any page (Zoom web app or another site)  
2. You’ll see a small floating black caption box  
3. Start speaking — your words appear live (STT)  

---

### 🔊 STEP 4 — (Optional) Use VB-Cable to Route Audio into Zoom  

If you want others in Zoom to hear the TTS voice:  
1. Install VB-Cable (extract the ZIP → right-click `VBCABLE_Setup_x64.exe` → **Run as Administrator → Install driver**).  
2. Reboot your PC.  
3. Open **Sound settings → Recording tab**  
   - Enable **CABLE Output (VB-Audio Virtual Cable)**.  
4. In **Zoom > Settings > Audio > Microphone**, choose **CABLE Output**.  
5. In **Windows Sound → Playback tab**, right-click **CABLE Input → Set as Default Device**.  
   - This makes system/TTS audio feed into Zoom.  

---

### 🧩 STEP 5 — Verify Everything  

| Test | Expected Result |
|------|------------------|
| You speak | Text appears in caption box |
| You type  | Text turns to speech for the other user |

---

## 👥 Team Members  

👩‍💻 **Varshita Sarwan** — 211423104719  
👩‍💻 **Vidushi Ganeshika M** — 211423104730  

---

## 🧑‍🏫 Guide  

**Dr. V. Subedha, M.Tech., Ph.D.**  
**Institution:** Panimalar Engineering College (Autonomous), Affiliated to Anna University, Chennai  

---
