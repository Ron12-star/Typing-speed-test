
```markdown
# ⌨️ Typing Speed Test Game

A web-based **Typing Speed Test** built with HTML, CSS, and JavaScript. The game measures your typing speed (WPM), accuracy, and gives real-time feedback. A Node.js + Express server is used to serve the files.

---
```
## 🚀 Features

- Random sentence generator
- Real-time character highlighting and error detection
- Timer-based performance calculation
- Displays Words Per Minute (WPM), Characters Per Minute (CPM), and Accuracy
- Clean, responsive UI
- Restart option to try again

## 🧑‍💻 Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| **Frontend**| HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Assets**  | PNG image for visual reference |



## 📁 Project Structure

```

TYPING-SPEED-TEST/
├── assets/
│   └── Typing master.png         # Screenshot or UI image
├── node\_modules/                 # Dependencies
├── public/
│   ├── index.html                # Game UI
│   └── Style.css                 # Styling
├── .gitignore
├── Index.js                      # JavaScript logic
├── Server.js                     # Express server
├── package.json
├── package-lock.json
└── README.md                     # You're reading it!

```


## 📸 Screenshot

![Typing Speed Test Screenshot](./assets/Typing%20master.png)



## ⚙️ How to Run Locally

1. **Clone the repository:**
```bash
git clone https://github.com/Ron12-star/typing-speed-test.git
cd typing-speed-test
````

2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
node Server.js
```

4. **Open in browser:**

```
http://localhost:7777
```


## 🧠 How It Works

* `Index.js` contains the logic for:

  * Timer start on first keystroke
  * Comparing user input with the given text
  * Calculating WPM, CPM, and accuracy
  * Resetting the game
* `Style.css` handles layout and animation
* Express serves both `/public` files and `Index.js`



## 💡 Future Ideas

* Fetch random quotes from an API
* Add leaderboard or user score tracking
* Support multiple difficulty levels
* Dark/light mode toggle




## 🙌 Author

Created by Ronak


