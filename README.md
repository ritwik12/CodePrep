# CodePrep Python - Interactive Universal LeetCode Practice Suite

🔗 **Live Demo:** [https://ritwik12.github.io/CodePrep/](https://ritwik12.github.io/CodePrep/)

CodePrep Python is an advanced, fully client-side web application designed to help developers practice algorithmic coding problems (specifically LeetCode-style questions) directly in the browser. 

Using **Pyodide** (Python compiled to WebAssembly) and the **Monaco Editor** (the engine behind VS Code), CodePrep provides a full-featured development environment without requiring any backend server or external compiler.

---

## 🚀 Key Features

- **In-Browser Python Execution**: Run and test Python code securely on your local machine using Pyodide (Wasm).
- **Monaco Code Editor**: Professional editing experience featuring syntax highlighting, auto-completions, bracket matching, and editor settings.
- **Dynamic Stack & Parser Visualizer**: Step-by-step evaluation visualizer for expression parsing algorithms, displaying active token evaluation, operator stack, and values stack changes.
- **Custom Question Creator**: Expand your question database! Add your own custom problems, write test cases, define starter code, and save them directly to local storage.
- **Interview Prep Roadmap**: Track your learning progress across major computer science topics (Graphs, Sliding Window, Dynamic Programming, Stacks, Arrays & Hashing).
- **Mock Interview Mode**: Simulates a live technical interview with a countdown timer, hidden test cases, and random question selection.
- **Local Storage Solution Caching**: Automatically saves your code progress, completed questions, stats, and custom problems, preserving your state across sessions.

---

## 🎨 Tech Stack

- **Frontend Core**: Semantic HTML5, Vanilla JavaScript (ES6+ Modules)
- **Styling**: Modern, fluid CSS3 featuring custom CSS variables, dark mode aesthetics, glassmorphism UI components, responsive grids, and interactive transitions
- **Python Compiler**: [Pyodide](https://pyodide.org/) (Python WebAssembly runtime)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) via CDN
- **Icons**: SVG vectors for pixel-perfect scaling and fast loading times

---

## 📂 Project Structure

```bash
├── index.html         # Main dashboard, workspace interface, and navigation views
├── styles.css         # Custom dark theme stylesheet, animations, and layouts
├── app.js             # Core application controller, Pyodide compiler hook, and state management
├── problems.js        # Default LeetCode-style problem set and metadata
├── visualizer.js      # Parser & stack evaluation execution visualizer logic
└── favicon.svg        # Scalable vector application icon
```

---

## 🛠️ How to Run Locally

Since CodePrep Python is a completely client-side application, you can run it using any simple static file server. 

### Method 1: Python HTTP Server (Recommended)
If you have Python installed, open your terminal in the project directory and run:
```bash
python3 -m http.server 8000
```
Then open your browser and navigate to `http://localhost:8000`.

### Method 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (if not already installed).
3. Click the **Go Live** button at the bottom-right corner of VS Code.

### Method 3: Node.js (http-server)
If you have Node/npm installed:
```bash
npx http-server -p 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 💡 How It Works under the Hood

1. **Python Sandbox**: When you click "Run Code" or "Submit", the JS engine invokes Pyodide. The starter template imports python utility structures like `List`, `Dict`, and `Optional` from the `typing` library.
2. **Dynamic Test Runner**: The test suite takes your solution class, instantiates it, and dynamically parses input parameters (e.g. lists, integers) to execute them against the selected problem's test suite, tracking actual vs. expected results.
3. **Execution State**: Standard out/error logs from Python are captured and piped to the UI log console.
