
# 🚀 Float Hub: The Ultimate Floating Video Player

![Electron](https://img.shields.io/badge/Framework-Electron.js-47848F?style=for-the-badge&logo=electron)
![NodeJS](https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=nodedotjs)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows)

**Float Hub** is a lightweight, high-performance Picture-in-Picture (PiP) application designed for multitaskers. Whether you're a developer watching a tutorial while coding or a student taking notes during a lecture, Float Hub keeps your video exactly where you need it—**on top of everything else.**

---

## 📺 Why Float Hub?

Most browsers hide your video the moment you switch tabs. **Float Hub** breaks that barrier by creating a dedicated, transparent-capable, and "Always-on-Top" window that stays visible no matter what app you are using.

### ✨ Key Features
* 🔗 **Smart URL Support:** Paste any YouTube link and start watching instantly.
* 📌 **Pinned Mode:** Stays floating above VS Code, Browsers, and PDF readers.
* 🖼️ **Frameless Design:** A modern, minimal UI that doesn't distract you with bulky window borders.
* 📐 **Custom Controls:** Easily resize, move, and toggle the "Float" status.
* ⚡ **Zero Bloat:** Built with Vanilla JS and CSS for maximum speed and low RAM usage.

---

## 📥 Getting Started (User Guide)

### For Regular Users
1.  Go to the **[Releases](https://github.com/SoamyaDevelops/Float-Hub/releases)** section on the right.
2.  Download the latest `float_hub-setup.exe`.
3.  Run the installer (Click "Run Anyway" if Windows SmartScreen appears).
4.  Paste your link and enjoy!

### For Developers (Local Setup)
If you want to modify the code or contribute:
1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/SoamyaDevelops/Float-Hub.git](https://github.com/SoamyaDevelops/Float-Hub.git)
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run in Development Mode:**
    ```bash
    npm start
    ```
4.  **Build your own Installer:**
    ```bash
    npm run make
    ```

---

## 🛠️ How it Works (The Tech Stack)

* **Electron.js:** Used to create the cross-platform desktop environment.
* **Node.js:** Manages the backend logic and local file serving.
* **Vanilla JS & CSS3:** All UI logic and styling are handwritten without heavy frameworks to ensure the app remains "feather-light."
* **Inter-Process Communication (IPC):** Uses Electron's `ipcMain` and `ipcRenderer` to bridge the gap between the window and the system.

---

## 🗺️ Roadmap & Future Goals
- [ ] **Multi-Platform Support:** Adding Vimeo, Twitch, and Dailymotion.
- [ ] **Global Hotkeys:** Control volume/play/pause without clicking the window.
- [ ] **Dark/Light Themes:** Customizable UI accents.
- [ ] **macOS & Linux Support:** Coming in future builds.

---

## 🤝 Contributing & Feedback
Contributions make the open-source world go 'round! 
* **Found a bug?** Open an [Issue](https://github.com/SoamyaDevelops/Float-Hub/issues).
* **Have a feature idea?** Submit a Pull Request!
* **Like the project?** Give it a ⭐ to show your support!

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for details.

Developed with ❤️ by **Soamya Sharma**
