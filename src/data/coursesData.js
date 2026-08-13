// Courses Data — access model: registration is free. A single one-time
// acceptance fee (see /src/data/accessConfig.js) unlocks ALL courses.
//
// Each lesson now carries:
//   content       — array of {type, heading, body} cards for the AI learning engine
//   needs_runtime — true for lessons where a live code editor is shown
//   assignment    — the task the student must complete and submit

export const COURSES = [
  // ─────────────────────────────────────────────────────────────────────────────
  // WEB DEVELOPMENT — 16 Weeks
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Engineering',
    instructor: 'Kingshima Lead',
    duration: '16 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    description: 'Go from zero to a full-stack developer — HTML, CSS, JavaScript, React, Node.js, APIs, and a live deployment.',
    curriculum: [
      {
        week: 1,
        title: 'How the Web Works',
        theme: 'Foundations',
        color: '#ff6d40',
        lessons: [
          {
            id: 'wd-1-1',
            title: 'What Happens When You Visit a Website',
            duration: '35 min',
            description: 'DNS, servers, browsers, and the request-response cycle — demystified.',
            video_url: '',
            needs_runtime: false,
            resources: ['How the Web Works — Visual Guide'],
            assignment: 'Draw a simple diagram showing what happens from typing a URL to seeing a page. Describe each step in your own words.',
            content: [
              { type: 'concept', heading: 'The Internet vs the Web', body: 'The internet is the physical network of cables and wireless connections linking billions of devices. The World Wide Web (WWW) is just one service that runs on top of it — the one that serves web pages via the HTTP protocol.' },
              { type: 'concept', heading: 'DNS — the Phone Book of the Internet', body: 'When you type "google.com", your computer asks a DNS (Domain Name System) server to translate that human-readable name into an IP address like 142.250.80.46, which is the actual address of Google\'s server.' },
              { type: 'concept', heading: 'HTTP Request → Server → Response', body: 'Your browser sends an HTTP GET request to the server at that IP address. The server processes it and sends back HTML, CSS, and JavaScript files. Your browser then renders those files into the page you see.' },
              { type: 'tip', heading: 'Dev Tools Network Tab', body: 'Open your browser\'s Dev Tools (F12), go to the Network tab, and reload any page. You\'ll see every single request your browser makes — try it on this page right now.' },
              { type: 'example', heading: 'The Full Journey', body: 'You type "kingshima.org" → DNS returns an IP → browser sends GET / → server returns HTML → browser parses HTML → browser fetches CSS and JS → page renders on your screen. This all happens in under 500ms.' }
            ]
          },
          {
            id: 'wd-1-2',
            title: 'Your First HTML Page',
            duration: '40 min',
            description: 'Write valid HTML from scratch — tags, elements, attributes, and document structure.',
            video_url: '',
            needs_runtime: true,
            resources: ['HTML5 Element Reference'],
            assignment: 'Build an HTML page about yourself — with a heading, a short paragraph, an image, and a list of 3 things you want to build.',
            content: [
              { type: 'concept', heading: 'HTML is the Skeleton', body: 'HTML (HyperText Markup Language) defines the structure and meaning of web content. It uses "tags" like <h1>, <p>, <img> to describe what each piece of content is.' },
              { type: 'concept', heading: 'Anatomy of an HTML Tag', body: 'Most tags come in pairs: an opening tag <p> and a closing tag </p>. Everything between them is the element\'s content. Some tags are self-closing, like <img />' },
              { type: 'example', heading: 'A Minimal HTML Page', body: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>This is my first webpage.</p>\n  </body>\n</html>' },
              { type: 'tip', heading: 'Semantic HTML Matters', body: 'Use <header>, <main>, <footer>, <article> instead of wrapping everything in <div>. Search engines and screen readers understand semantic HTML, which helps with both SEO and accessibility.' }
            ]
          },
          {
            id: 'wd-1-3',
            title: 'Styling with CSS',
            duration: '45 min',
            description: 'Connect a stylesheet, use selectors, and apply colours, fonts, and spacing.',
            video_url: '',
            needs_runtime: true,
            resources: ['CSS Selectors Cheat Sheet'],
            assignment: 'Style your HTML page from the last lesson — add a background colour, choose a Google Font, set heading sizes, and add padding/margins.',
            content: [
              { type: 'concept', heading: 'CSS is the Skin', body: 'CSS (Cascading Style Sheets) controls how HTML elements look — colour, size, font, spacing, layout. You write CSS rules as: selector { property: value; }' },
              { type: 'example', heading: 'A CSS Rule', body: 'h1 {\n  color: #6c47ff;\n  font-size: 2rem;\n  font-family: "Inter", sans-serif;\n}\n\np {\n  line-height: 1.6;\n  color: #555;\n}' },
              { type: 'concept', heading: 'The Box Model', body: 'Every HTML element is a box with: content → padding → border → margin. Understanding this model is the key to controlling spacing and layout in CSS.' },
              { type: 'tip', heading: 'Use CSS Custom Properties', body: 'Define reusable values at the top of your CSS: :root { --primary: #6c47ff; }. Then use them anywhere: color: var(--primary);. This makes restyling your entire site trivial.' }
            ]
          }
        ],
        assignment: 'Publish a styled HTML profile page with your name, bio, and a list of goals.'
      },
      {
        week: 2,
        title: 'Layout & Responsive Design',
        theme: 'CSS Layouts',
        color: '#f59e0b',
        lessons: [
          {
            id: 'wd-2-1',
            title: 'Flexbox — One-Dimensional Layout',
            duration: '50 min',
            description: 'Align and distribute elements in a row or column with Flexbox.',
            video_url: '',
            needs_runtime: true,
            resources: ['Flexbox Visual Guide'],
            assignment: 'Build a navigation bar and a card row using Flexbox. Cards should wrap on small screens.',
            content: [
              { type: 'concept', heading: 'Flexbox is for 1D Layouts', body: 'Flexbox (display: flex) is designed to lay elements out in a single direction — either a row or a column. It\'s perfect for navbars, card rows, and centering elements.' },
              { type: 'example', heading: 'Centering with Flexbox', body: '.container {\n  display: flex;\n  justify-content: center;  /* horizontal */\n  align-items: center;      /* vertical */\n  gap: 1rem;\n}' },
              { type: 'tip', heading: 'flex: 1 is your best friend', body: 'Adding flex: 1 to a child makes it grow to fill available space. Combine this with a fixed-width sidebar (width: 280px) for classic two-column layouts.' }
            ]
          },
          {
            id: 'wd-2-2',
            title: 'CSS Grid — Two-Dimensional Layout',
            duration: '50 min',
            description: 'Build complex page layouts with CSS Grid rows and columns.',
            video_url: '',
            needs_runtime: true,
            resources: ['CSS Grid Cheat Sheet'],
            assignment: 'Recreate a simple webpage layout with a header, sidebar, main content area, and footer using CSS Grid.',
            content: [
              { type: 'concept', heading: 'Grid is for 2D Layouts', body: 'CSS Grid lets you place elements in both rows AND columns simultaneously. It\'s the tool for full page layouts.' },
              { type: 'example', heading: 'A Classic Page Grid', body: '.page {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: auto 1fr auto;\n  min-height: 100vh;\n}' },
              { type: 'tip', heading: 'Use fr units', body: 'The fr unit means "fraction of available space". grid-template-columns: 1fr 2fr creates two columns where the second is twice as wide as the first.' }
            ]
          },
          {
            id: 'wd-2-3',
            title: 'Mobile-First & Media Queries',
            duration: '40 min',
            description: 'Build for small screens first, then scale up with media queries.',
            video_url: '',
            needs_runtime: true,
            resources: ['Mobile-First Checklist'],
            assignment: 'Make your grid layout from the last lesson responsive — single column on mobile, two columns on tablet and above.',
            content: [
              { type: 'concept', heading: 'Mobile-First means start small', body: 'Write your CSS for the smallest screen first. Then add @media queries to add complexity at larger sizes. This prevents "unbreaking" a desktop layout on mobile.' },
              { type: 'example', heading: 'Media Query Breakpoints', body: '/* Mobile (default — no query needed) */\n.grid { grid-template-columns: 1fr; }\n\n/* Tablet */\n@media (min-width: 768px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}\n\n/* Desktop */\n@media (min-width: 1200px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}' },
              { type: 'tip', heading: 'Test with Dev Tools', body: 'Press Ctrl+Shift+M in Chrome DevTools to toggle the device toolbar and test your layout at different screen sizes.' }
            ]
          }
        ],
        assignment: 'Build a responsive product card grid that shows 1 column on mobile, 2 on tablet, 3 on desktop.'
      },
      {
        week: 3,
        title: 'JavaScript Fundamentals',
        theme: 'Core JS Concepts',
        color: '#a78bfa',
        lessons: [
          {
            id: 'wd-3-1',
            title: 'Variables, Types & Operators',
            duration: '45 min',
            description: 'let, const, strings, numbers, booleans, and arithmetic.',
            video_url: '',
            needs_runtime: true,
            resources: ['JS Basics Handout'],
            assignment: 'Write a script that calculates the total cost of a shopping cart (price × quantity for 3 items) and logs the result.',
            content: [
              { type: 'concept', heading: 'Variables Store Data', body: 'Use const for values that don\'t change, let for values that do. Avoid var — it has confusing scoping rules.' },
              { type: 'example', heading: 'Types in JavaScript', body: 'const name = "Kingshima";      // string\nconst age = 25;                 // number\nconst isStudent = true;         // boolean\nconst scores = [90, 85, 92];    // array\nconst user = { name, age };     // object' },
              { type: 'concept', heading: 'Template Literals', body: 'Use backtick strings to embed variables: `Hello, ${name}! You are ${age} years old.`  — much cleaner than "Hello, " + name + "!"' }
            ]
          },
          {
            id: 'wd-3-2',
            title: 'Functions & Control Flow',
            duration: '50 min',
            description: 'Write functions, use if/else, and loop over data with for and forEach.',
            video_url: '',
            needs_runtime: true,
            resources: ['Functions & Loops Guide'],
            assignment: 'Write a function that takes an array of test scores and returns the average, the highest score, and the lowest score.',
            content: [
              { type: 'concept', heading: 'Functions are Reusable Blocks', body: 'A function wraps a piece of logic so you can run it multiple times with different inputs (parameters) and get back outputs (return values).' },
              { type: 'example', heading: 'Arrow Function Syntax', body: 'const greet = (name) => {\n  return `Hello, ${name}!`;\n};\n\n// Short form (implicit return)\nconst double = (n) => n * 2;\n\nconsole.log(greet("Kingshima")); // Hello, Kingshima!\nconsole.log(double(5));          // 10' },
              { type: 'tip', heading: 'forEach vs for...of', body: 'Use array.forEach(item => ...) when you want to run a function on each item. Use for (const item of array) when you might need to break early.' }
            ]
          },
          {
            id: 'wd-3-3',
            title: 'Arrays & Objects',
            duration: '45 min',
            description: 'Create, read, update, and transform arrays and objects.',
            video_url: '',
            needs_runtime: true,
            resources: ['Array Methods Cheat Sheet'],
            assignment: 'Given an array of student objects ({name, score}), write code to: filter out students who scored below 50, map the rest to just their names, and sort alphabetically.',
            content: [
              { type: 'concept', heading: 'Arrays are Ordered Lists', body: 'Arrays store multiple values. The three most powerful array methods are: .map() (transform each item), .filter() (keep items that match), and .reduce() (accumulate into one value).' },
              { type: 'example', heading: 'Map, Filter, Reduce', body: 'const scores = [45, 78, 92, 61, 33];\n\n// Keep scores above 60\nconst passing = scores.filter(s => s > 60); // [78, 92, 61]\n\n// Double each score\nconst doubled = scores.map(s => s * 2); // [90, 156, 184, 122, 66]\n\n// Sum all scores\nconst total = scores.reduce((sum, s) => sum + s, 0); // 309' },
              { type: 'concept', heading: 'Objects Store Key-Value Pairs', body: 'Objects are like dictionaries. Access properties with dot notation (user.name) or bracket notation (user["name"]). Destructure to pull out multiple properties at once: const { name, email } = user;' }
            ]
          }
        ],
        assignment: 'Build a student grade calculator: takes an array of {name, scores[]} objects and outputs a report card with each student\'s average and grade (A/B/C/F).'
      },
      {
        week: 4,
        title: 'DOM Manipulation',
        theme: 'Making Pages Interactive',
        color: '#34d399',
        lessons: [
          {
            id: 'wd-4-1',
            title: 'Selecting & Modifying Elements',
            duration: '45 min',
            description: 'Use querySelector, textContent, innerHTML, and classList to control the page.',
            video_url: '',
            needs_runtime: true,
            resources: ['DOM API Quick Reference'],
            assignment: 'Build a live character counter for a textarea that turns red when the user exceeds 280 characters.',
            content: [
              { type: 'concept', heading: 'The DOM is a Tree', body: 'The Document Object Model (DOM) is JavaScript\'s representation of the HTML page as a tree of objects. You can read and change any part of the page through the DOM.' },
              { type: 'example', heading: 'Selecting and Changing Elements', body: '// Select one element\nconst title = document.querySelector("h1");\ntitle.textContent = "New Title";\ntitle.style.color = "red";\n\n// Add/remove CSS classes\ntitle.classList.add("active");\ntitle.classList.toggle("hidden");' },
              { type: 'tip', heading: 'Prefer classList over style', body: 'Set styles via CSS classes (classList.add) rather than element.style.property. This keeps your JS clean and your styles in CSS where they belong.' }
            ]
          },
          {
            id: 'wd-4-2',
            title: 'Events — Responding to User Actions',
            duration: '45 min',
            description: 'addEventListener, event objects, and common event types.',
            video_url: '',
            needs_runtime: true,
            resources: ['Event Types Reference'],
            assignment: 'Build a dynamic to-do list: input + button that adds items to a list, and clicking an item marks it as done (strikethrough + grey).',
            content: [
              { type: 'concept', heading: 'Events are User Signals', body: 'Events fire when something happens: a click, a keypress, a form submit, a scroll. You attach "listeners" to elements to run code when these events occur.' },
              { type: 'example', heading: 'addEventListener Pattern', body: 'const btn = document.querySelector("#myBtn");\n\nbtn.addEventListener("click", (event) => {\n  console.log("Clicked!", event.target);\n  event.target.textContent = "Clicked!";\n});\n\n// Prevent form default behaviour\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  // handle form...\n});' },
              { type: 'tip', heading: 'Event Delegation', body: 'Instead of adding listeners to every list item, add ONE listener to the parent list and check event.target to know which item was clicked. Much more efficient for dynamic lists.' }
            ]
          },
          {
            id: 'wd-4-3',
            title: 'Building a Mini-App with the DOM',
            duration: '60 min',
            description: 'Combine HTML, CSS, and JS to build a complete interactive mini-app.',
            video_url: '',
            needs_runtime: true,
            resources: ['Mini-App Starter Template'],
            assignment: 'Build a tip calculator: takes a bill amount and tip percentage, shows the tip amount, total, and per-person split.',
            content: [
              { type: 'concept', heading: 'The App Loop', body: 'Almost every web app follows the same loop: (1) User does something → (2) JS reads input → (3) JS computes → (4) JS updates the DOM. Master this cycle and you can build anything.' },
              { type: 'example', heading: 'Reading Input Values', body: '// Get value from an input field\nconst amount = parseFloat(document.querySelector("#amount").value);\nconst pct    = parseFloat(document.querySelector("#pct").value);\n\n// Compute\nconst tip   = amount * (pct / 100);\nconst total = amount + tip;\n\n// Show result\ndocument.querySelector("#result").textContent = `Tip: ₦${tip.toFixed(2)}`;' },
              { type: 'tip', heading: 'Validate Input', body: 'Always check if an input is a valid number before computing: if (isNaN(amount) || amount <= 0) { showError("Enter a valid amount"); return; }' }
            ]
          }
        ],
        assignment: 'Build a quiz app: 5 multiple-choice questions, tracks score, shows result and correct answers at the end.'
      },
      {
        week: 5,
        title: 'Async JavaScript & APIs',
        theme: 'Fetching Data from the Internet',
        color: '#f472b6',
        lessons: [
          {
            id: 'wd-5-1',
            title: 'Callbacks, Promises & Async/Await',
            duration: '50 min',
            description: 'Understand asynchronous JavaScript and write clean async code.',
            video_url: '',
            needs_runtime: true,
            resources: ['Async JS Visual Guide'],
            assignment: 'Rewrite a promise chain (.then/.catch) version of a fetch call using async/await syntax.',
            content: [
              { type: 'concept', heading: 'JS is Single-Threaded', body: 'JavaScript runs one thing at a time. When it needs to wait (for a network request, a file read, a timer), it starts the task and moves on — then comes back when the result is ready. This is asynchronous execution.' },
              { type: 'example', heading: 'async/await Pattern', body: 'async function getUser(id) {\n  try {\n    const response = await fetch(`/api/users/${id}`);\n    if (!response.ok) throw new Error("User not found");\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error("Failed:", error.message);\n  }\n}' },
              { type: 'tip', heading: 'Always use try/catch with await', body: 'Any awaited operation can fail. Wrap async code in try { } catch(err) { } so you can handle errors gracefully instead of the app crashing silently.' }
            ]
          },
          {
            id: 'wd-5-2',
            title: 'Working with REST APIs',
            duration: '50 min',
            description: 'Fetch data from public APIs, handle JSON, and display it on the page.',
            video_url: '',
            needs_runtime: true,
            resources: ['Fetch API Cheat Sheet', 'Public APIs List'],
            assignment: 'Fetch data from a free public API (e.g. Open Library, Rest Countries, or JSONPlaceholder) and display a list of results on a styled page.',
            content: [
              { type: 'concept', heading: 'What is a REST API?', body: 'A REST API is a server that returns data (usually JSON) in response to HTTP requests. GET requests fetch data, POST creates, PUT/PATCH updates, DELETE removes.' },
              { type: 'example', heading: 'Fetching from a Public API', body: 'async function loadCountry(name) {\n  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);\n  const [country] = await res.json();\n  \n  document.querySelector("#flag").src = country.flags.svg;\n  document.querySelector("#name").textContent = country.name.common;\n  document.querySelector("#pop").textContent = `Population: ${country.population.toLocaleString()}`;\n}' },
              { type: 'tip', heading: 'Check Response Status', body: 'fetch() only throws on network errors, not HTTP errors like 404. Always check response.ok or response.status before reading the body.' }
            ]
          },
          {
            id: 'wd-5-3',
            title: 'Local Storage & Session Storage',
            duration: '35 min',
            description: 'Persist data in the browser so it survives page refreshes.',
            video_url: '',
            needs_runtime: true,
            resources: ['Web Storage API Guide'],
            assignment: 'Add persistence to your to-do app: items should survive a page refresh. Also add a "Clear All" button.',
            content: [
              { type: 'concept', heading: 'Browser Storage Options', body: 'localStorage persists until cleared manually. sessionStorage is wiped when the tab closes. Both store strings — use JSON.stringify/parse for objects.' },
              { type: 'example', heading: 'localStorage Pattern', body: '// Save\nlocalStorage.setItem("todos", JSON.stringify(todos));\n\n// Load\nconst saved = localStorage.getItem("todos");\nconst todos = saved ? JSON.parse(saved) : [];\n\n// Remove\nlocalStorage.removeItem("todos");' }
            ]
          }
        ],
        assignment: 'Build a weather dashboard that fetches data from a weather API and saves the last searched city in localStorage.'
      },
      {
        week: 6,
        title: 'Intro to React',
        theme: 'Component-Based UI',
        color: '#38bdf8',
        lessons: [
          {
            id: 'wd-6-1',
            title: 'Why React? Components & JSX',
            duration: '45 min',
            description: 'Understand the component model and write your first JSX.',
            video_url: '',
            needs_runtime: false,
            resources: ['React Quick-Start Guide'],
            assignment: 'Create 3 React components: a ProfileCard, a Badge, and a Button. Compose them together in App.jsx.',
            content: [
              { type: 'concept', heading: 'React Thinks in Components', body: 'React breaks UIs into small, reusable pieces called components. A component is a JavaScript function that returns JSX (HTML-like syntax). Every button, card, and page section becomes its own component.' },
              { type: 'example', heading: 'Your First Component', body: 'function ProfileCard({ name, role, avatar }) {\n  return (\n    <div className="card">\n      <img src={avatar} alt={name} />\n      <h2>{name}</h2>\n      <p>{role}</p>\n    </div>\n  );\n}\n\n// Usage\n<ProfileCard name="Tolu" role="Developer" avatar="/tolu.jpg" />' },
              { type: 'tip', heading: 'JSX is not HTML', body: 'In JSX, use className instead of class, and htmlFor instead of for. Curly braces {} let you embed any JavaScript expression inside JSX.' }
            ]
          },
          {
            id: 'wd-6-2',
            title: 'State & useState Hook',
            duration: '50 min',
            description: 'Add interactivity to React components with the useState hook.',
            video_url: '',
            needs_runtime: false,
            resources: ['useState Hook Reference'],
            assignment: 'Build an interactive counter with +, -, and Reset buttons. Then build a toggle that shows/hides a piece of text.',
            content: [
              { type: 'concept', heading: 'State is Dynamic Data', body: 'State is data that can change over time and causes the UI to re-render when it does. In React, you declare state with useState: const [count, setCount] = useState(0);' },
              { type: 'example', heading: 'useState Counter', body: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n      <button onClick={() => setCount(count - 1)}>-</button>\n      <button onClick={() => setCount(0)}>Reset</button>\n    </div>\n  );\n}' },
              { type: 'tip', heading: 'Never mutate state directly', body: 'Always use the setter function: setCount(count + 1). Never do count++ or count = 5. React needs to know state changed to trigger a re-render.' }
            ]
          },
          {
            id: 'wd-6-3',
            title: 'Props & Component Composition',
            duration: '45 min',
            description: 'Pass data between components with props and build composable UIs.',
            video_url: '',
            needs_runtime: false,
            resources: ['React Props Deep Dive'],
            assignment: 'Build a colour palette generator: parent holds an array of colours in state, passes them as props to a ColourSwatch child component.',
            content: [
              { type: 'concept', heading: 'Props Flow Down', body: 'Props (properties) are how you pass data from a parent component to its children. They\'re like function parameters for components. Props are read-only — a child cannot modify the props it receives.' },
              { type: 'example', heading: 'Props Pattern', body: 'function Alert({ type, message }) {\n  const colours = { info: "blue", warning: "orange", error: "red" };\n  return (\n    <div style={{ color: colours[type] }}>\n      {message}\n    </div>\n  );\n}\n\n// Parent uses it:\n<Alert type="warning" message="Your session expires soon." />' }
            ]
          }
        ],
        assignment: 'Build a React task manager: add tasks, mark complete, delete tasks, filter by "All / Active / Done".'
      },
      {
        week: 7,
        title: 'React Hooks & Data Fetching',
        theme: 'useEffect & API Integration',
        color: '#c084fc',
        lessons: [
          {
            id: 'wd-7-1',
            title: 'useEffect & Side Effects',
            duration: '50 min',
            description: 'Run code after renders — fetch data, subscribe to events, set up timers.',
            video_url: '',
            needs_runtime: false,
            resources: ['useEffect Deep Dive'],
            assignment: 'Build a live clock component that updates every second using useEffect and setInterval. Clean up the interval when the component unmounts.',
            content: [
              { type: 'concept', heading: 'Side Effects Live in useEffect', body: 'A "side effect" is anything that reaches outside the component: fetching data, subscribing to events, setting timers, updating the document title. useEffect is where these live.' },
              { type: 'example', heading: 'useEffect with Cleanup', body: 'useEffect(() => {\n  const timer = setInterval(() => {\n    setTime(new Date());\n  }, 1000);\n\n  // Cleanup runs when component unmounts\n  return () => clearInterval(timer);\n}, []); // [] = run once on mount' },
              { type: 'tip', heading: 'The Dependency Array', body: '[] means run once. [userId] means re-run when userId changes. No array means run after every render (usually wrong). Getting this right prevents infinite loops and stale data.' }
            ]
          },
          {
            id: 'wd-7-2',
            title: 'Fetching API Data in React',
            duration: '50 min',
            description: 'Combine useEffect + fetch to load and display data from an API.',
            video_url: '',
            needs_runtime: false,
            resources: ['Data Fetching Patterns'],
            assignment: 'Build a GitHub profile viewer: search any username, fetch their public data from the GitHub API, and display avatar, bio, repo count, and followers.',
            content: [
              { type: 'concept', heading: 'The Data Fetching Pattern', body: 'The standard React pattern: (1) useState for data + loading + error, (2) useEffect with fetch inside, (3) set state with the result, (4) render conditionally based on loading/error/data.' },
              { type: 'example', heading: 'Complete Fetch Pattern', body: 'const [data, setData] = useState(null);\nconst [loading, setLoading] = useState(true);\nconst [error, setError] = useState(null);\n\nuseEffect(() => {\n  async function load() {\n    try {\n      const res = await fetch("/api/items");\n      if (!res.ok) throw new Error("Failed to load");\n      setData(await res.json());\n    } catch (err) {\n      setError(err.message);\n    } finally {\n      setLoading(false);\n    }\n  }\n  load();\n}, []);' }
            ]
          },
          {
            id: 'wd-7-3',
            title: 'Custom Hooks',
            duration: '45 min',
            description: 'Extract reusable logic into your own custom hooks.',
            video_url: '',
            needs_runtime: false,
            resources: ['Custom Hooks Guide'],
            assignment: 'Extract the data-fetching logic from the last lesson into a useFetch(url) custom hook. Use it in two different components.',
            content: [
              { type: 'concept', heading: 'Custom Hooks = Reusable Logic', body: 'If you find yourself copying the same useState + useEffect pattern into multiple components, extract it into a custom hook (a function starting with "use"). Hooks can use other hooks.' },
              { type: 'example', heading: 'useFetch Custom Hook', body: 'function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch(url)\n      .then(r => r.json())\n      .then(setData)\n      .catch(setError)\n      .finally(() => setLoading(false));\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Usage\nconst { data, loading } = useFetch("/api/posts");' }
            ]
          }
        ],
        assignment: 'Build a news aggregator that fetches headlines from a public API and lets you filter by category. Extract fetch logic into a custom hook.'
      },
      {
        week: 8,
        title: 'React Router & Multi-Page Apps',
        theme: 'Navigation & URL Structure',
        color: '#fb923c',
        lessons: [
          {
            id: 'wd-8-1',
            title: 'Client-Side Routing with React Router',
            duration: '45 min',
            description: 'Set up routes, Link components, and navigate between pages.',
            video_url: '',
            needs_runtime: false,
            resources: ['React Router v6 Docs'],
            assignment: 'Build a 3-page React app (Home, About, Portfolio) with a working navigation bar that highlights the active page.',
            content: [
              { type: 'concept', heading: 'SPA vs MPA', body: 'A Single Page Application (SPA) loads one HTML file and swaps content in JavaScript without full page reloads. React Router simulates "pages" by rendering different components based on the URL.' },
              { type: 'example', heading: 'React Router Setup', body: 'import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        <Link to="/">Home</Link>\n        <Link to="/about">About</Link>\n      </nav>\n      <Routes>\n        <Route path="/" element={<HomePage />} />\n        <Route path="/about" element={<AboutPage />} />\n        <Route path="/user/:id" element={<UserPage />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}' }
            ]
          },
          {
            id: 'wd-8-2',
            title: 'Dynamic Routes & URL Parameters',
            duration: '45 min',
            description: 'Build product detail pages and profile pages with dynamic URL segments.',
            video_url: '',
            needs_runtime: false,
            resources: ['useParams Hook Guide'],
            assignment: 'Build a blog with a list page and individual post detail pages. Clicking a post navigates to /posts/:id with the full content.',
            content: [
              { type: 'concept', heading: 'Dynamic Segments with :param', body: 'A route like /product/:id matches /product/1, /product/42, /product/shoes. Inside the component, useParams() gives you the actual value.' },
              { type: 'example', heading: 'useParams', body: 'import { useParams } from "react-router-dom";\n\nfunction PostPage() {\n  const { id } = useParams();\n  const { data: post } = useFetch(`/api/posts/${id}`);\n  \n  if (!post) return <p>Loading...</p>;\n  return <article><h1>{post.title}</h1><p>{post.body}</p></article>;\n}' }
            ]
          },
          {
            id: 'wd-8-3',
            title: 'Protected Routes & Auth Flow',
            duration: '50 min',
            description: 'Guard routes that require login and redirect unauthenticated users.',
            video_url: '',
            needs_runtime: false,
            resources: ['Auth Pattern Guide'],
            assignment: 'Add a login page to your blog. Protect the "New Post" page — unauthenticated users are redirected to /login. After login, redirect back to the intended page.',
            content: [
              { type: 'concept', heading: 'Protected Route Pattern', body: 'A ProtectedRoute component checks if the user is logged in. If yes, it renders the requested page. If no, it redirects to the login page using React Router\'s <Navigate>.' },
              { type: 'example', heading: 'ProtectedRoute Component', body: 'function ProtectedRoute({ children }) {\n  const { user } = useAuth();\n  \n  if (!user) {\n    return <Navigate to="/login" replace />;\n  }\n  \n  return children;\n}\n\n// Usage\n<Route path="/admin" element={\n  <ProtectedRoute><AdminPage /></ProtectedRoute>\n} />' }
            ]
          }
        ],
        assignment: 'Build a mini e-commerce site: product list, product detail page, cart page, and a protected "checkout" route.'
      },
      {
        week: 9,
        title: 'Forms & Data Entry',
        theme: 'Controlled Forms & Validation',
        color: '#4ade80',
        lessons: [
          {
            id: 'wd-9-1',
            title: 'Controlled Components & Form State',
            duration: '45 min',
            description: 'Manage form inputs with React state and handle submissions.',
            video_url: '',
            needs_runtime: false,
            resources: ['React Forms Guide'],
            assignment: 'Build a registration form with name, email, password, and confirm password. Validate all fields on submit.',
            content: [
              { type: 'concept', heading: 'Controlled = React Owns the Value', body: 'In a controlled component, the input\'s value is always tied to React state. Every keystroke calls setState. React is the "single source of truth" for the input value.' },
              { type: 'example', heading: 'Controlled Input Pattern', body: 'const [form, setForm] = useState({ name: "", email: "" });\n\nconst handleChange = (e) => {\n  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));\n};\n\n<input\n  name="email"\n  value={form.email}\n  onChange={handleChange}\n/>' }
            ]
          },
          {
            id: 'wd-9-2',
            title: 'Client-Side Validation',
            duration: '40 min',
            description: 'Validate user input before submission and show helpful error messages.',
            video_url: '',
            needs_runtime: false,
            resources: ['Form Validation Patterns'],
            assignment: 'Add real-time validation to your registration form: email format check, password minimum 8 chars, passwords match. Show error messages under each field.',
            content: [
              { type: 'concept', heading: 'Validate on Submit AND on Change', body: 'Validate on submit to catch everything. Optionally validate on change after the first submit attempt so users see errors cleared in real time as they fix them.' },
              { type: 'example', heading: 'Validation Function', body: 'function validate(form) {\n  const errors = {};\n  if (!form.email.includes("@")) errors.email = "Enter a valid email";\n  if (form.password.length < 8)  errors.password = "Min 8 characters";\n  if (form.password !== form.confirm) errors.confirm = "Passwords don\'t match";\n  return errors;\n}' }
            ]
          },
          {
            id: 'wd-9-3',
            title: 'File Uploads & Multi-Step Forms',
            duration: '50 min',
            description: 'Handle file inputs and split long forms into steps.',
            video_url: '',
            needs_runtime: false,
            resources: ['Multi-Step Form Pattern'],
            assignment: 'Build a 3-step job application form: Step 1 (personal info), Step 2 (experience), Step 3 (upload CV + submit). Show a progress indicator.',
            content: [
              { type: 'concept', heading: 'Multi-Step = State Machine', body: 'Track the current step in state. Each step renders a different form section. Validate before allowing the next step. Only submit to the server on the final step.' },
              { type: 'example', heading: 'Step Controller', body: 'const [step, setStep] = useState(1);\n\nconst next = () => {\n  if (validateStep(step)) setStep(s => s + 1);\n};\n\n{step === 1 && <PersonalInfoForm />}\n{step === 2 && <ExperienceForm />}\n{step === 3 && <UploadForm onSubmit={handleFinalSubmit} />}' }
            ]
          }
        ],
        assignment: 'Build a complete user onboarding flow: 4 steps, progress bar, validation at each step, summary review before final submit.'
      },
      {
        week: 10,
        title: 'Node.js & Server-Side JavaScript',
        theme: 'Backend Basics',
        color: '#2dd4bf',
        lessons: [
          {
            id: 'wd-10-1',
            title: 'Node.js Fundamentals',
            duration: '45 min',
            description: 'Run JavaScript outside the browser and understand the Node ecosystem.',
            video_url: '',
            needs_runtime: false,
            resources: ['Node.js Getting Started'],
            assignment: 'Write a Node.js script that reads a JSON file of students, filters those who passed, and writes a new file with only the passing students.',
            content: [
              { type: 'concept', heading: 'Node is JS on the Server', body: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It lets you run JS outside the browser — on a server, in a terminal, or as part of a build tool.' },
              { type: 'concept', heading: 'CommonJS vs ESModules', body: 'Node originally used require(). Modern Node supports import/export (ESModules). Next.js uses ESModules. Add "type": "module" to package.json, or use the .mjs extension.' },
              { type: 'example', heading: 'File System Module', body: 'import fs from "fs/promises";\n\nconst students = JSON.parse(await fs.readFile("students.json", "utf8"));\nconst passing = students.filter(s => s.score >= 50);\nawait fs.writeFile("passing.json", JSON.stringify(passing, null, 2));' }
            ]
          },
          {
            id: 'wd-10-2',
            title: 'Building a REST API with Express',
            duration: '60 min',
            description: 'Create GET, POST, PUT, DELETE routes with Express.js.',
            video_url: '',
            needs_runtime: false,
            resources: ['Express.js Quick Start'],
            assignment: 'Build a REST API for a book collection: GET /books, POST /books, GET /books/:id, PUT /books/:id, DELETE /books/:id. Store data in-memory for now.',
            content: [
              { type: 'concept', heading: 'Express is Minimal by Design', body: 'Express is a minimal Node.js framework for building APIs. It handles routing, middleware, and response helpers. Everything else — auth, validation, ORM — you add yourself.' },
              { type: 'example', heading: 'Express Route Pattern', body: 'import express from "express";\nconst app = express();\napp.use(express.json());\n\nconst books = [];\n\napp.get("/books", (req, res) => res.json(books));\n\napp.post("/books", (req, res) => {\n  const book = { id: Date.now(), ...req.body };\n  books.push(book);\n  res.status(201).json(book);\n});\n\napp.listen(3000, () => console.log("API running on port 3000"));' }
            ]
          },
          {
            id: 'wd-10-3',
            title: 'Middleware & Error Handling',
            duration: '40 min',
            description: 'Write middleware functions for logging, auth checking, and error handling.',
            video_url: '',
            needs_runtime: false,
            resources: ['Express Middleware Guide'],
            assignment: 'Add middleware to your book API: a request logger, a simple API key auth check, and a global error handler.',
            content: [
              { type: 'concept', heading: 'Middleware is a Pipeline', body: 'Every request in Express passes through a chain of middleware functions (req, res, next) => {}. Call next() to pass to the next function, or res.json() to respond.' },
              { type: 'example', heading: 'Auth Middleware', body: 'function requireApiKey(req, res, next) {\n  const key = req.headers["x-api-key"];\n  if (key !== process.env.API_KEY) {\n    return res.status(401).json({ error: "Unauthorized" });\n  }\n  next();\n}\n\n// Apply to specific routes\napp.post("/books", requireApiKey, createBook);\n\n// Global error handler (4 params = error handler)\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ error: "Something went wrong" });\n});' }
            ]
          }
        ],
        assignment: 'Build a Task API with Express: CRUD for tasks, middleware-based auth, input validation, and proper error handling. Test with Postman or Insomnia.'
      },
      {
        week: 11,
        title: 'Databases with Supabase',
        theme: 'Persistent Data Storage',
        color: '#60a5fa',
        lessons: [
          {
            id: 'wd-11-1',
            title: 'SQL Basics & Supabase Tables',
            duration: '45 min',
            description: 'Write SELECT, INSERT, UPDATE, DELETE queries and design a basic schema.',
            video_url: '',
            needs_runtime: false,
            resources: ['SQL Basics Cheat Sheet', 'Supabase Table Editor Guide'],
            assignment: 'Create a "products" table in Supabase with id, name, price, stock. Insert 5 products, query them sorted by price, update one price, delete one product.',
            content: [
              { type: 'concept', heading: 'SQL is the Language of Databases', body: 'SQL (Structured Query Language) is used to query and manipulate data in relational databases. Supabase is a hosted PostgreSQL database with a friendly dashboard and a JavaScript client.' },
              { type: 'example', heading: 'Basic SQL Queries', body: '-- Select all products\nSELECT * FROM products ORDER BY price ASC;\n\n-- Insert a product\nINSERT INTO products (name, price, stock) VALUES (\'Keyboard\', 12500, 50);\n\n-- Update price\nUPDATE products SET price = 14000 WHERE id = 3;\n\n-- Delete\nDELETE FROM products WHERE stock = 0;' }
            ]
          },
          {
            id: 'wd-11-2',
            title: 'Supabase JS Client — CRUD Operations',
            duration: '50 min',
            description: 'Use the Supabase JS client to read, write, and query your database from JavaScript.',
            video_url: '',
            needs_runtime: false,
            resources: ['Supabase JS Client Docs'],
            assignment: 'Build a React component that fetches products from Supabase and displays them. Add a form to create new products.',
            content: [
              { type: 'concept', heading: 'Supabase Client mirrors SQL', body: 'The Supabase JS client lets you write SQL-like queries in JavaScript: .select(), .insert(), .update(), .delete(), .eq(), .order(), .limit().' },
              { type: 'example', heading: 'CRUD with Supabase JS', body: 'import { createClient } from "@supabase/supabase-js";\nconst supabase = createClient(url, key);\n\n// Read\nconst { data } = await supabase.from("products").select("*").order("price");\n\n// Create\nawait supabase.from("products").insert({ name: "Mouse", price: 5000 });\n\n// Update\nawait supabase.from("products").update({ price: 6000 }).eq("id", 4);\n\n// Delete\nawait supabase.from("products").delete().eq("id", 4);' }
            ]
          },
          {
            id: 'wd-11-3',
            title: 'Row Level Security & Auth',
            duration: '45 min',
            description: 'Secure your database so users can only access their own data.',
            video_url: '',
            needs_runtime: false,
            resources: ['Supabase RLS Guide'],
            assignment: 'Enable RLS on your products table. Write a policy that allows users to only read/edit their own products (where user_id = auth.uid()).',
            content: [
              { type: 'concept', heading: 'RLS = Database-Level Auth', body: 'Row Level Security (RLS) lets you write SQL policies that control which rows each user can see or modify. It\'s enforced at the database level — not just in your app code.' },
              { type: 'example', heading: 'RLS Policy Example', body: '-- Enable RLS on the table\nALTER TABLE products ENABLE ROW LEVEL SECURITY;\n\n-- Users can only select their own products\nCREATE POLICY "select_own" ON products\n  FOR SELECT USING (user_id = auth.uid());\n\n-- Users can only insert their own products\nCREATE POLICY "insert_own" ON products\n  FOR INSERT WITH CHECK (user_id = auth.uid());' }
            ]
          }
        ],
        assignment: 'Add a Supabase backend to your task manager: sign up / login with Supabase auth, store tasks per user, enforce RLS so users only see their own tasks.'
      },
      {
        week: 12,
        title: 'Next.js Foundations',
        theme: 'Full-Stack React Framework',
        color: '#a3e635',
        lessons: [
          {
            id: 'wd-12-1',
            title: 'File-Based Routing in Next.js',
            duration: '45 min',
            description: 'Understand the App Router, layouts, and page files.',
            video_url: '',
            needs_runtime: false,
            resources: ['Next.js App Router Docs'],
            assignment: 'Create a Next.js app with 3 pages (Home, Blog, Contact) using the App Router. Add a shared layout with a nav and footer.',
            content: [
              { type: 'concept', heading: 'Next.js adds Server-Side Power', body: 'Next.js is a React framework that adds server-side rendering, file-based routing, API routes, and static generation — all in one package.' },
              { type: 'concept', heading: 'App Router: src/app/', body: 'In the App Router, every folder under src/app/ with a page.jsx file becomes a route. layout.jsx wraps all children in that folder. This is where Kingshima\'s site is built.' },
              { type: 'example', heading: 'Folder Structure = URL Structure', body: 'src/app/\n  page.jsx           → /\n  layout.jsx         → shared layout for all pages\n  blog/\n    page.jsx         → /blog\n    [slug]/\n      page.jsx       → /blog/my-post-title\n  api/\n    hello/\n      route.js       → /api/hello' }
            ]
          },
          {
            id: 'wd-12-2',
            title: 'Server Components vs Client Components',
            duration: '50 min',
            description: 'Understand when to use server vs client components and how they interact.',
            video_url: '',
            needs_runtime: false,
            resources: ['Server vs Client Components Guide'],
            assignment: 'Refactor your blog to fetch posts in a Server Component (no useEffect) and add a "Like" button as a Client Component ("use client").',
            content: [
              { type: 'concept', heading: 'Server Components Run on the Server', body: 'By default, all components in the App Router are Server Components. They run on the server, can directly query databases, and send only HTML to the client — no JS bundle for that component.' },
              { type: 'concept', heading: '"use client" for Interactivity', body: 'Add "use client" at the top of any component that uses useState, useEffect, event handlers, or browser APIs. These components hydrate in the browser and are interactive.' },
              { type: 'tip', heading: 'Keep the boundary low', body: 'Push "use client" as far down the component tree as possible. Wrap only the interactive parts (a button, a modal) — keep data-fetching parents as Server Components.' }
            ]
          },
          {
            id: 'wd-12-3',
            title: 'API Routes & Server Actions',
            duration: '45 min',
            description: 'Build backend endpoints with API routes and handle form mutations with Server Actions.',
            video_url: '',
            needs_runtime: false,
            resources: ['Next.js API Routes Docs'],
            assignment: 'Add a contact form to your Next.js site. Submit sends a POST to an API route that validates the data and sends a confirmation email using Nodemailer.',
            content: [
              { type: 'concept', heading: 'API Routes in Next.js', body: 'Files named route.js inside src/app/api/ become API endpoints. They export async functions named after HTTP methods: GET, POST, PUT, DELETE.' },
              { type: 'example', heading: 'A Next.js API Route', body: '// src/app/api/contact/route.js\nimport { NextResponse } from "next/server";\n\nexport async function POST(req) {\n  const { name, email, message } = await req.json();\n  \n  if (!name || !email) {\n    return NextResponse.json({ error: "Missing fields" }, { status: 400 });\n  }\n  \n  // Send email, save to DB, etc.\n  \n  return NextResponse.json({ success: true });\n}' }
            ]
          }
        ],
        assignment: 'Build a full-stack Next.js blog: posts stored in Supabase, server component for the list, client component for comments, API route for submitting comments.'
      },
      {
        week: 13,
        title: 'Authentication & User Sessions',
        theme: 'Login, Registration & Security',
        color: '#f87171',
        lessons: [
          {
            id: 'wd-13-1',
            title: 'Auth Concepts — Sessions, JWTs & Cookies',
            duration: '40 min',
            description: 'Understand how authentication works across HTTP.',
            video_url: '',
            needs_runtime: false,
            resources: ['Auth Concepts Visual Guide'],
            assignment: 'Write a 1-page explanation of how JWT authentication works — from login to protected route access — with a flow diagram.',
            content: [
              { type: 'concept', heading: 'Authentication vs Authorization', body: 'Authentication = Who are you? (login). Authorization = What are you allowed to do? (permissions). Both are required for secure apps.' },
              { type: 'concept', heading: 'JWT — JSON Web Tokens', body: 'A JWT is a signed, encoded token containing claims (user id, role, expiry). The server signs it with a secret key. The client stores it and sends it with every request. The server verifies the signature — no database lookup needed.' },
              { type: 'tip', heading: 'Store JWTs in httpOnly Cookies', body: 'Don\'t store JWTs in localStorage — they\'re accessible to JavaScript and vulnerable to XSS. Store them in httpOnly cookies instead, which are inaccessible to scripts.' }
            ]
          },
          {
            id: 'wd-13-2',
            title: 'Supabase Auth — Email & Social Login',
            duration: '50 min',
            description: 'Implement sign up, sign in, and social OAuth with Supabase Auth.',
            video_url: '',
            needs_runtime: false,
            resources: ['Supabase Auth Docs'],
            assignment: 'Add full auth to your Next.js blog: email/password registration, login, Google OAuth, and a logout button. Persist session across page refreshes.',
            content: [
              { type: 'concept', heading: 'Supabase Auth is Full-Featured', body: 'Supabase Auth handles email/password, magic links, OAuth (Google, GitHub), phone OTP, session management, and row-level security integration — all out of the box.' },
              { type: 'example', heading: 'Sign Up & Sign In', body: '// Sign Up\nconst { data, error } = await supabase.auth.signUp({ email, password });\n\n// Sign In\nconst { data, error } = await supabase.auth.signInWithPassword({ email, password });\n\n// Google OAuth\nawait supabase.auth.signInWithOAuth({ provider: "google" });\n\n// Sign Out\nawait supabase.auth.signOut();\n\n// Get current user\nconst { data: { user } } = await supabase.auth.getUser();' }
            ]
          },
          {
            id: 'wd-13-3',
            title: 'Protecting Routes & Server-Side Session Checks',
            duration: '45 min',
            description: 'Check auth status on the server and redirect unauthenticated users.',
            video_url: '',
            needs_runtime: false,
            resources: ['Next.js + Supabase SSR Guide'],
            assignment: 'Protect the /dashboard route in your Next.js app: server-side session check, redirect to /login if not authenticated, show personalised content if authenticated.',
            content: [
              { type: 'concept', heading: 'Server-Side Auth Checks are Safer', body: 'Never rely solely on client-side auth checks for protected routes — a user can bypass them. Always verify the session server-side (in a Server Component or middleware) before rendering protected content.' },
              { type: 'example', heading: 'Server Component Auth Guard', body: 'import { createServerClient } from "@supabase/ssr";\nimport { redirect } from "next/navigation";\n\nexport default async function DashboardPage() {\n  const supabase = createServerClient(/* ... */);\n  const { data: { user } } = await supabase.auth.getUser();\n  \n  if (!user) redirect("/login");\n  \n  return <div>Welcome, {user.email}</div>;\n}' }
            ]
          }
        ],
        assignment: 'Fully secure your blog: server-side auth on all protected routes, middleware for session refresh, user profile page showing their posts only.'
      },
      {
        week: 14,
        title: 'Performance & Optimisation',
        theme: 'Fast, Accessible Web Apps',
        color: '#fbbf24',
        lessons: [
          {
            id: 'wd-14-1',
            title: 'Web Performance Fundamentals',
            duration: '45 min',
            description: 'Core Web Vitals, image optimisation, and lazy loading.',
            video_url: '',
            needs_runtime: false,
            resources: ['Core Web Vitals Guide', 'Next.js Image Optimisation'],
            assignment: 'Run a Lighthouse audit on one of your projects. Screenshot the results, identify the 3 lowest scores, and implement fixes for each.',
            content: [
              { type: 'concept', heading: 'Core Web Vitals', body: 'Google measures web performance with Core Web Vitals: LCP (Largest Contentful Paint — loading), INP (Interaction to Next Paint — interactivity), CLS (Cumulative Layout Shift — visual stability). These affect both UX and SEO ranking.' },
              { type: 'tip', heading: 'Use next/image for Images', body: 'Next.js\'s <Image> component automatically resizes, converts to WebP, lazy-loads, and prevents layout shift. Never use raw <img> tags for important images in Next.js.' },
              { type: 'concept', heading: 'Code Splitting is Automatic in Next.js', body: 'Next.js automatically splits your code by route — each page only loads the JS it needs. Use dynamic() for heavy components you want to lazy-load further.' }
            ]
          },
          {
            id: 'wd-14-2',
            title: 'SEO & Metadata in Next.js',
            duration: '35 min',
            description: 'Add page titles, meta descriptions, Open Graph tags, and structured data.',
            video_url: '',
            needs_runtime: false,
            resources: ['Next.js Metadata API Docs'],
            assignment: 'Add proper metadata to all pages of your Next.js project: unique titles, descriptions, OG images. Use dynamic metadata for blog post pages.',
            content: [
              { type: 'concept', heading: 'Metadata Drives SEO', body: 'Title tags and meta descriptions are the text Google shows in search results. Open Graph tags control how your link looks when shared on WhatsApp, Twitter, LinkedIn.' },
              { type: 'example', heading: 'Next.js Metadata Export', body: '// Static metadata\nexport const metadata = {\n  title: "My Blog — Kingshima",\n  description: "...",\n  openGraph: { title: "...", images: ["/og.png"] },\n};\n\n// Dynamic metadata for post pages\nexport async function generateMetadata({ params }) {\n  const post = await getPost(params.slug);\n  return { title: post.title, description: post.excerpt };\n}' }
            ]
          },
          {
            id: 'wd-14-3',
            title: 'Accessibility (a11y) Fundamentals',
            duration: '40 min',
            description: 'Make your app usable by everyone — keyboard nav, ARIA, colour contrast.',
            video_url: '',
            needs_runtime: false,
            resources: ['Web Accessibility Checklist', 'ARIA Roles Reference'],
            assignment: 'Run an axe DevTools accessibility audit on your project. Fix at least 5 accessibility issues. Document what you changed and why.',
            content: [
              { type: 'concept', heading: 'Accessibility is Not Optional', body: 'Inaccessible websites exclude people with visual, motor, or cognitive disabilities. In many countries, accessibility is also a legal requirement for public-facing apps.' },
              { type: 'tip', heading: 'Quick Wins for a11y', body: '1. Every <img> needs alt text. 2. Use semantic HTML (button, nav, main, not just divs). 3. Ensure 4.5:1 colour contrast ratio. 4. All interactive elements must be keyboard-focusable. 5. Add aria-label to icon buttons.' }
            ]
          }
        ],
        assignment: 'Optimise your blog for Core Web Vitals (Lighthouse score ≥ 90), add complete metadata, fix all critical accessibility issues reported by axe.'
      },
      {
        week: 15,
        title: 'Deployment & DevOps Basics',
        theme: 'Shipping to Production',
        color: '#34d399',
        lessons: [
          {
            id: 'wd-15-1',
            title: 'Deploying to Vercel',
            duration: '35 min',
            description: 'Connect your GitHub repo and deploy a Next.js app in minutes.',
            video_url: '',
            needs_runtime: false,
            resources: ['Vercel Deploy Guide'],
            assignment: 'Deploy your Next.js blog to Vercel. Configure environment variables. Share the live URL.',
            content: [
              { type: 'concept', heading: 'Vercel is Purpose-Built for Next.js', body: 'Vercel is the company behind Next.js. Deploying there gives you automatic preview deployments per PR, Edge CDN, and zero-config Next.js support.' },
              { type: 'concept', heading: 'Environment Variables in Production', body: 'Never commit .env.local to Git. Add environment variables in Vercel\'s dashboard (Project Settings → Environment Variables). Vercel injects them at build time and runtime.' },
              { type: 'tip', heading: 'Preview Deployments', body: 'Every git push to a branch creates a preview URL on Vercel. Share these with clients or teammates for feedback before merging to main.' }
            ]
          },
          {
            id: 'wd-15-2',
            title: 'Custom Domains & HTTPS',
            duration: '30 min',
            description: 'Connect a custom domain and configure automatic SSL.',
            video_url: '',
            needs_runtime: false,
            resources: ['Domain Setup Guide'],
            assignment: 'Connect a domain (you can use a free .is-a.dev subdomain if you don\'t have one) to your Vercel deployment. Confirm HTTPS is working.',
            content: [
              { type: 'concept', heading: 'DNS and Domain Setup', body: 'After buying a domain, you point it to Vercel by adding an A record (for apex domains like kingshima.com) or a CNAME record (for subdomains like www.kingshima.com) in your domain registrar\'s DNS settings.' },
              { type: 'concept', heading: 'HTTPS is Automatic on Vercel', body: 'Vercel automatically provisions and renews TLS certificates via Let\'s Encrypt. Your site is HTTPS from day one — no configuration needed.' }
            ]
          },
          {
            id: 'wd-15-3',
            title: 'CI/CD & GitHub Actions Basics',
            duration: '40 min',
            description: 'Automate linting and testing on every push with a GitHub Actions workflow.',
            video_url: '',
            needs_runtime: false,
            resources: ['GitHub Actions Quick Start'],
            assignment: 'Write a GitHub Actions workflow that runs "npm run lint" and "npm run build" on every push to main. Fix any lint errors it finds.',
            content: [
              { type: 'concept', heading: 'CI/CD = Automated Quality Gates', body: 'Continuous Integration/Continuous Deployment (CI/CD) runs automated checks (tests, linting, builds) before code is merged or deployed. It catches issues before users ever see them.' },
              { type: 'example', heading: 'Basic GitHub Actions Workflow', body: '# .github/workflows/ci.yml\nname: CI\non: [push, pull_request]\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run build' }
            ]
          }
        ],
        assignment: 'Your blog is live on a custom domain, CI/CD runs on every push, and Lighthouse scores are all green. Document your deployment setup in a README.'
      },
      {
        week: 16,
        title: 'Capstone Project',
        theme: 'Build & Ship a Full-Stack Product',
        color: '#818cf8',
        lessons: [
          {
            id: 'wd-16-1',
            title: 'Planning Your Capstone',
            duration: '45 min',
            description: 'Define your product, create a feature list, and design your database schema.',
            video_url: '',
            needs_runtime: false,
            resources: ['Product Scoping Template', 'ERD Design Guide'],
            assignment: 'Write a one-page product spec for your capstone: what problem it solves, who uses it, core features (max 5), and a database schema diagram.',
            content: [
              { type: 'concept', heading: 'Scope Small, Ship Real', body: 'The #1 mistake in capstone projects is overscoping. Pick ONE core workflow and do it excellently. You can always add features after launch — you can\'t undo never shipping.' },
              { type: 'tip', heading: 'Good Capstone Ideas', body: 'A local business booking system, a community event board, a personal finance tracker, a recipe sharing app, a portfolio with a CMS backend. Pick something you\'d actually use.' }
            ]
          },
          {
            id: 'wd-16-2',
            title: 'Building Your Capstone',
            duration: '120 min',
            description: 'Apply everything: Next.js, Supabase, auth, API routes, and polished UI.',
            video_url: '',
            needs_runtime: false,
            resources: ['Full-Stack Checklist'],
            assignment: 'Build your capstone: working auth, CRUD for your core entity, responsive UI, server-side data fetching, at least one API route. Push to GitHub.',
            content: [
              { type: 'tip', heading: 'Build Vertically, Not Horizontally', body: 'Build one feature all the way from database → API → UI before starting the next. Don\'t build all the database tables first, then all the API routes, then all the UI.' },
              { type: 'concept', heading: 'Use the Patterns You\'ve Learned', body: 'Controlled forms, error handling, loading states, protected routes, server components for data, client components for interactivity. These patterns exist to make your app solid.' }
            ]
          },
          {
            id: 'wd-16-3',
            title: 'Deploy, Present & Reflect',
            duration: '60 min',
            description: 'Ship your capstone live and document what you built.',
            video_url: '',
            needs_runtime: false,
            resources: ['README Template', 'Project Showcase Guide'],
            assignment: 'Deploy your capstone to Vercel with a custom domain. Write a README with setup instructions and a demo video/screenshots. Submit the live URL and GitHub link.',
            content: [
              { type: 'concept', heading: 'Your Portfolio is Your Resume', body: 'As a developer, your GitHub and live projects ARE your CV. Every shipped project is evidence of your ability. Take the time to write a good README — it\'s the first thing a potential employer or client will read.' },
              { type: 'tip', heading: 'Record a Demo Video', body: 'A 2-3 minute Loom video walking through your capstone is more powerful than any written description. Show the real product working. Put the link in your README.' }
            ]
          }
        ],
        assignment: 'Submit your live capstone URL, GitHub repo, and a demo video. Include what problem it solves, your biggest technical challenge, and what you\'d build next.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // GRAPHIC DESIGN — 4 Weeks
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'graphic-design',
    title: 'Graphic Design (Canva & Mobile)',
    category: 'Design',
    instructor: 'Creative Director',
    duration: '4 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    description: 'Design scroll-stopping graphics and brand visuals using Canva — right from your phone, no laptop needed.',
    curriculum: [
      {
        week: 1,
        title: 'Canva Basics on Mobile',
        theme: 'Getting Comfortable in Canva',
        color: '#ff6d40',
        lessons: [
          {
            id: 'gd-1-1',
            title: 'Navigating the Canva App',
            duration: '30 min',
            description: 'Learn your way around templates, elements, and the editor.',
            video_url: '',
            needs_runtime: false,
            resources: ['Canva Quick-Start Guide'],
            assignment: 'Recreate one template in your own style. Screenshot and submit.',
            content: [
              { type: 'concept', heading: 'Canva is the Designer\'s Shortcut', body: 'Canva is a drag-and-drop design platform available on mobile and web. It gives you professional templates, stock images, fonts, and design elements — without needing to learn Photoshop.' },
              { type: 'concept', heading: 'Key Areas of the App', body: 'Home: templates and recent designs. Editor: your canvas with the element panel, text tool, uploads, and background. Layers: control the order of elements. Download: export your finished design.' },
              { type: 'tip', heading: 'Use Templates as a Starting Point', body: 'Never start with a blank canvas when learning. Pick a template close to what you want, then swap out colours, fonts, images, and text to make it yours. This teaches you design patterns quickly.' }
            ]
          },
          {
            id: 'gd-1-2',
            title: 'Text & Layout That Work',
            duration: '35 min',
            description: 'Simple rules for text that reads well and looks clean.',
            video_url: '',
            needs_runtime: false,
            resources: ['Layout Basics Sheet'],
            assignment: 'Design 3 text-based quote graphics using only Canva. Each must use a different layout approach.',
            content: [
              { type: 'concept', heading: 'Hierarchy Guides the Eye', body: 'Design hierarchy tells the viewer what to read first. Use size, weight, and colour to create a clear order: headline (biggest, boldest) → subheading → body text → caption.' },
              { type: 'concept', heading: 'The Rule of Three for Text', body: 'Limit yourself to 3 text styles per design: one for headlines, one for body, one for accents. More than 3 looks chaotic. Less is always more in typography.' },
              { type: 'tip', heading: 'Alignment Creates Order', body: 'Always align text to a consistent edge (left, right, or centre — not mixed). Turn on Canva\'s alignment guides to snap elements into position precisely.' }
            ]
          },
          {
            id: 'gd-1-3',
            title: 'Picking Colours & Fonts',
            duration: '30 min',
            description: 'Choose combinations that look intentional, not random.',
            video_url: '',
            needs_runtime: false,
            resources: ['Colour Pairing Guide'],
            assignment: 'Build a simple 3-colour, 2-font palette in Canva. Use it to design one social media post.',
            content: [
              { type: 'concept', heading: '60-30-10 Colour Rule', body: '60% of your design uses the dominant colour (usually a neutral). 30% is the secondary colour. 10% is the accent — your pop of colour that draws the eye to key elements.' },
              { type: 'concept', heading: 'Pair Fonts with Contrast', body: 'Pair a display font (decorative, for headlines) with a readable font (clean, for body text). Never pair two display fonts. A safe pair: any serif + any sans-serif.' },
              { type: 'tip', heading: 'Coolors.co for Palette Inspiration', body: 'Visit coolors.co or the Canva colour palette generator to find pre-made palettes. Lock the colours you love and keep generating until the full palette clicks.' }
            ]
          }
        ],
        assignment: 'Design a 3-post Instagram carousel using your own colour palette and font pairing.'
      },
      {
        week: 2,
        title: 'Branding & Content Design',
        theme: 'Designing for a Business',
        color: '#a78bfa',
        lessons: [
          {
            id: 'gd-2-1',
            title: 'Building a Simple Brand Kit',
            duration: '40 min',
            description: 'Logo, colours, and fonts — kept consistent across every design.',
            video_url: '',
            needs_runtime: false,
            resources: ['Brand Kit Template'],
            assignment: 'Create a one-page brand kit for a real or imaginary business: logo (text or icon-based), primary/secondary colours with hex codes, 2 fonts.',
            content: [
              { type: 'concept', heading: 'A Brand Kit is Your Design Bible', body: 'A brand kit defines the visual rules for a business: the exact logo files, the exact colour hex codes, and the exact fonts. Anyone designing for the brand uses this kit — so everything looks consistent.' },
              { type: 'concept', heading: 'Logo Variations', body: 'A complete logo system has: a primary logo (full version), a secondary logo (stacked or horizontal), a logomark (icon only for app icons and favicons), and a text-only version.' },
              { type: 'tip', heading: 'Use Canva\'s Brand Hub', body: 'Canva Pro has a Brand Hub where you save your colours, fonts, and logos. Every new design auto-applies your brand styles. This is a massive time saver for clients.' }
            ]
          },
          {
            id: 'gd-2-2',
            title: 'Flyers & Posters That Sell',
            duration: '40 min',
            description: 'Design promotional graphics people actually stop to read.',
            video_url: '',
            needs_runtime: false,
            resources: ['Flyer Layout Pack'],
            assignment: 'Design a promotional flyer for a real or imaginary event. Must include: event name, date/time, location, and a clear call to action.',
            content: [
              { type: 'concept', heading: 'F-Pattern Reading', body: 'People scan printed materials in an F-pattern: they read across the top, then scan down the left side. Place your most important info (headline, date, CTA) along these paths.' },
              { type: 'concept', heading: 'The 5-Second Test', body: 'A good flyer communicates its core message in 5 seconds. Cover it up, uncover it briefly, and ask someone what they saw. If they can\'t name the event or the CTA, redesign.' },
              { type: 'tip', heading: 'High Contrast for Outdoor Printing', body: 'For posters viewed from a distance or in bright light, use high-contrast colour combinations (dark on light or light on dark) and avoid thin, light fonts.' }
            ]
          },
          {
            id: 'gd-2-3',
            title: 'Social Media Templates',
            duration: '35 min',
            description: 'Build reusable templates so you can design fast, every week.',
            video_url: '',
            needs_runtime: false,
            resources: ['Template Starter Pack'],
            assignment: 'Build a set of 3 reusable Canva templates (post, story, carousel cover) for a single brand. Swap only the text and image — the layout stays the same.',
            content: [
              { type: 'concept', heading: 'Templates = Consistent Content at Speed', body: 'A template is a locked layout with only the variable parts (text, images) changeable. Once you build a template, creating next week\'s content takes 5 minutes, not 2 hours.' },
              { type: 'concept', heading: 'Platform Size Guide', body: 'Instagram Post: 1080×1080px. Instagram Story: 1080×1920px. Twitter/X Post: 1600×900px. Facebook Cover: 1640×856px. Canva has pre-sized templates for all of these.' },
              { type: 'tip', heading: 'Duplicate, Don\'t Recreate', body: 'In Canva, right-click a design and "Make a copy". Never start from scratch when you have a template. Change only what needs to change — the brand consistency does the rest.' }
            ]
          }
        ],
        assignment: 'Create a mini brand kit plus 5 branded social posts for a single business, using your reusable templates.'
      },
      {
        week: 3,
        title: 'Client-Ready Design Skills',
        theme: 'Getting Paid to Design',
        color: '#34d399',
        lessons: [
          {
            id: 'gd-3-1',
            title: 'Working With a Client Brief',
            duration: '35 min',
            description: 'Turn a client\'s vague request into a clear design direction.',
            video_url: '',
            needs_runtime: false,
            resources: ['Client Brief Template'],
            assignment: 'Fill out a client brief template for a sample client request: "I need social media designs for my new hair salon." Extract the who, what, why, tone, and deliverables.',
            content: [
              { type: 'concept', heading: 'Never Start Without a Brief', body: 'A client brief answers: Who is the audience? What is the goal? What is the tone (professional, playful, bold, minimal)? What are the deliverables (files, sizes, formats) and deadline?' },
              { type: 'concept', heading: 'Ask Before You Design', body: 'The most expensive mistake is designing the wrong thing beautifully. Ask clarifying questions upfront: Do they have existing brand materials? Do they have competitor references? What do they NOT want?' },
              { type: 'tip', heading: 'Show Concepts, Not One Final Design', body: 'Present 2-3 initial concepts in different directions (e.g., bold and minimal, colourful and playful). Let the client choose a direction before you polish. This saves you from hours of revision.' }
            ]
          },
          {
            id: 'gd-3-2',
            title: 'Exporting & Delivering Files',
            duration: '25 min',
            description: 'Get files sized and formatted the way clients expect.',
            video_url: '',
            needs_runtime: false,
            resources: ['Export Settings Cheat Sheet'],
            assignment: 'Export one design in 3 different formats: PNG (for web/social), PDF Print (for printing), and SVG (for logo files). Note the differences.',
            content: [
              { type: 'concept', heading: 'Format Guide', body: 'PNG: web images, social media posts — transparent background supported. JPEG: photos where file size matters. PDF: print-ready documents and presentations. SVG: logos and icons — infinitely scalable. MP4/GIF: animated designs.' },
              { type: 'concept', heading: 'Resolution for Print', body: 'Web images can be 72 DPI. Print designs need 300 DPI. When setting up a Canva design for printing, select the correct print dimensions in centimetres/inches, not pixels.' },
              { type: 'tip', heading: 'Organise Deliverables in a Folder', body: 'Create one folder per client per project. Name files descriptively: ClientName_LogoPrimary_v2.png. Never send a client "design (3) final FINAL.png".' }
            ]
          },
          {
            id: 'gd-3-3',
            title: 'Building a Design Portfolio',
            duration: '35 min',
            description: 'Put your best work in one place people can find.',
            video_url: '',
            needs_runtime: false,
            resources: ['Portfolio Layout Ideas'],
            assignment: 'Create a design portfolio — either a curated Canva document, a Behance profile, or a dedicated Instagram account. Include at least 5 pieces from this course.',
            content: [
              { type: 'concept', heading: 'Quality Over Quantity', body: 'Show 6-10 of your absolute best pieces. One great piece is worth 10 mediocre ones. Only include work you\'re proud of — clients will assume the rest of your work is at the same level.' },
              { type: 'concept', heading: 'Context Sells Your Work', body: 'Don\'t just show the design — show it in context. A logo mockup on a business card, a social post on a phone screen. Canva has free mockup templates for this.' },
              { type: 'tip', heading: 'Keep it Updated', body: 'Add each new client project to your portfolio. A portfolio is never "done" — it\'s a living document of your best work.' }
            ]
          }
        ],
        assignment: 'Complete one real or mock client brief end-to-end: brief → concepts → revision → final files → delivered.'
      },
      {
        week: 4,
        title: 'Advanced Techniques & Freelancing',
        theme: 'Level Up & Get Clients',
        color: '#38bdf8',
        lessons: [
          {
            id: 'gd-4-1',
            title: 'Canva Pro Features for Professionals',
            duration: '35 min',
            description: 'Magic Resize, Background Remover, Brand Hub, and Bulk Create.',
            video_url: '',
            needs_runtime: false,
            resources: ['Canva Pro Feature Guide'],
            assignment: 'Use Canva\'s Magic Resize to adapt one design to 5 different platform sizes simultaneously. Use Background Remover on a product photo.',
            content: [
              { type: 'concept', heading: 'Magic Resize Saves Hours', body: 'Design once, then use Magic Resize to instantly adapt your design to Instagram Post, Story, Facebook, Twitter, and LinkedIn sizes simultaneously.' },
              { type: 'concept', heading: 'Bulk Create for Content Batching', body: 'Upload a CSV spreadsheet with different text/image data, and Canva\'s Bulk Create generates dozens of unique designs from one template. Perfect for personalised invitations, product cards, or certificate generation.' },
              { type: 'tip', heading: 'Background Remover for Product Photos', body: 'The Canva Pro Background Remover tool can isolate products from photos in one click. Combine this with your brand templates for clean, professional product posts.' }
            ]
          },
          {
            id: 'gd-4-2',
            title: 'Pricing Your Design Work',
            duration: '30 min',
            description: 'Set fair prices, write proposals, and handle revision requests professionally.',
            video_url: '',
            needs_runtime: false,
            resources: ['Design Pricing Guide', 'Proposal Template'],
            assignment: 'Write a professional pricing menu for 3 services: Social Media Package, Brand Kit, and Flyer Design. Include what\'s included and what costs extra.',
            content: [
              { type: 'concept', heading: 'Project vs Hourly Pricing', body: 'Beginners often undercharge hourly. Package pricing (e.g., "5 branded posts for ₦15,000") is easier to sell, protects you from scope creep, and lets you get faster over time without earning less.' },
              { type: 'concept', heading: 'What to Include in a Package', body: 'List: deliverables (e.g., 5 posts, PNG + PDF), number of revision rounds included, turnaround time, and what is NOT included. Clarity prevents disputes.' },
              { type: 'tip', heading: 'Revisions are Normal — Unlimited is Not', body: 'Include 2 rounds of revisions in every package. After that, charge per round. Document this in your proposal before starting any project.' }
            ]
          },
          {
            id: 'gd-4-3',
            title: 'Getting Your First Design Clients',
            duration: '40 min',
            description: 'Where to find clients, how to pitch, and how to manage the relationship.',
            video_url: '',
            needs_runtime: false,
            resources: ['Client Outreach Script', 'Freelance Platform Guide'],
            assignment: 'Send a design pitch (via DM or email) to 3 real local businesses. Document each outreach: who you contacted, what you offered, and their response.',
            content: [
              { type: 'concept', heading: 'Your First Clients are Around You', body: 'Don\'t start on Fiverr. Your first clients are: local businesses that have ugly social media, small brands you already follow, friends with businesses, schools, churches, NGOs. Offer to do the first project at a reduced rate for a testimonial.' },
              { type: 'concept', heading: 'The Pitch Formula', body: '"Hi [Name], I noticed [specific problem with their current design]. I\'m a graphic designer and I think I could help [specific outcome]. I\'d love to share a concept for free — would you be open to a quick chat?" Specific + helpful + low friction.' },
              { type: 'tip', heading: 'Instagram is Your Portfolio AND Your Sales Tool', body: 'Post your work consistently. Add "Graphic Designer | DM for bookings" to your bio. Tag the businesses you\'ve worked with. Clients find you — you don\'t always have to find them.' }
            ]
          }
        ],
        assignment: 'Land one real paid or volunteer design client. Deliver the project, collect a testimonial, and add the work to your portfolio.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // DATA ANALYSIS — 8 Weeks
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    category: 'Data',
    instructor: 'Kingshima Lead',
    duration: '8 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    description: 'Learn to clean, analyse, and visualise real data using Google Sheets, SQL, and Python — and communicate findings clearly.',
    curriculum: [
      {
        week: 1,
        title: 'Data Foundations',
        theme: 'Getting Your Data Ready',
        color: '#ff6d40',
        lessons: [
          {
            id: 'da-1-1',
            title: 'What Data Analysis Actually Is',
            duration: '30 min',
            description: 'A plain-language look at what analysts really do day to day.',
            video_url: '',
            needs_runtime: false,
            resources: ['Intro Overview PDF'],
            assignment: 'Write down 5 specific questions that data could answer for a business, school, or community you are part of.',
            content: [
              { type: 'concept', heading: 'Data Analysis = Turning Raw Facts Into Decisions', body: 'A data analyst\'s job is to collect messy data, clean it, analyse it, and present findings that help someone make a better decision. The deliverable is not a spreadsheet — it\'s an insight.' },
              { type: 'concept', heading: 'The Analysis Pipeline', body: 'Every analysis follows roughly the same steps: (1) Define the question → (2) Collect data → (3) Clean data → (4) Explore/visualise → (5) Analyse → (6) Communicate findings. You\'ll work through each stage in this course.' },
              { type: 'tip', heading: 'Start with the Question, Not the Data', body: 'The most common mistake is diving into data before knowing what question you\'re trying to answer. A clear question tells you what data you need and what success looks like.' }
            ]
          },
          {
            id: 'da-1-2',
            title: 'Cleaning Messy Data',
            duration: '45 min',
            description: 'Fix errors, blanks, and duplicates before you analyse anything.',
            video_url: '',
            needs_runtime: false,
            resources: ['Data Cleaning Checklist'],
            assignment: 'Download the sample messy dataset (linked in resources). Clean it: remove duplicates, fix inconsistent formatting, fill in or flag missing values. Document every change you made.',
            content: [
              { type: 'concept', heading: 'Dirty Data Gives Wrong Answers', body: '"Garbage in, garbage out." If your source data has errors, duplicates, or inconsistencies, your analysis will confidently report the wrong answer. Cleaning is not optional — it\'s the foundation.' },
              { type: 'concept', heading: 'Common Data Problems', body: '1. Duplicate rows (same entry twice). 2. Inconsistent formatting ("Lagos", "lagos", "LAGOS"). 3. Missing values (blanks). 4. Incorrect data types (dates stored as text). 5. Outliers that are clearly errors (age = 999).' },
              { type: 'example', heading: 'Cleaning in Google Sheets', body: 'Remove duplicates: Data → Data Cleanup → Remove duplicates.\nFind blanks: Ctrl+F → search for nothing → Find All.\nStandardise text: =LOWER(A1), =TRIM(A1), =PROPER(A1).\nConvert text dates: =DATEVALUE(A1).' }
            ]
          },
          {
            id: 'da-1-3',
            title: 'Sorting & Filtering in Sheets',
            duration: '35 min',
            description: 'Quickly find what matters in a large dataset.',
            video_url: '',
            needs_runtime: false,
            resources: ['Sheets Shortcuts Sheet'],
            assignment: 'Using a dataset of your choice, answer 3 specific questions using only sorting, filtering, and COUNTIF/SUMIF formulas.',
            content: [
              { type: 'concept', heading: 'Filter Before You Analyse', body: 'Always filter your data before running calculations. Analysing a full dataset when you only care about a subset is a waste of time and can skew results.' },
              { type: 'example', heading: 'SUMIF and COUNTIF', body: '// Count rows where column A = "Lagos"\n=COUNTIF(A:A, "Lagos")\n\n// Sum column B where column A = "Lagos"\n=SUMIF(A:A, "Lagos", B:B)\n\n// Count rows meeting multiple conditions\n=COUNTIFS(A:A, "Lagos", C:C, ">50")' },
              { type: 'tip', heading: 'Freeze Header Row', body: 'Always freeze the first row (View → Freeze → 1 row) before sorting or filtering. This keeps your column headers visible as you scroll through large datasets.' }
            ]
          }
        ],
        assignment: 'Take a messy public dataset from raw to clean. Document every cleaning decision and submit both the original and cleaned files.'
      },
      {
        week: 2,
        title: 'Spreadsheet Analysis',
        theme: 'Formulas, Pivots & Lookups',
        color: '#f59e0b',
        lessons: [
          {
            id: 'da-2-1',
            title: 'Essential Formulas',
            duration: '50 min',
            description: 'SUM, AVERAGE, IF, VLOOKUP, INDEX/MATCH — the analyst\'s daily toolkit.',
            video_url: '',
            needs_runtime: false,
            resources: ['Formula Cheat Sheet'],
            assignment: 'Using the student grades dataset, calculate: class average, highest/lowest scores, pass rate (%), and look up individual student details by ID.',
            content: [
              { type: 'concept', heading: 'The Core Formula Set', body: 'SUM, COUNT, AVERAGE, MIN, MAX — basics. IF — conditional logic. VLOOKUP/XLOOKUP — look up a value in another table. TEXT — format numbers and dates. IFERROR — handle formula errors gracefully.' },
              { type: 'example', heading: 'XLOOKUP (Modern VLOOKUP)', body: '// Look up a student\'s score by their ID\n=XLOOKUP(F2, A:A, C:C, "Not found")\n\n// XLOOKUP(search value, search range, return range, if not found)\n// Much more flexible than VLOOKUP — can search left!' },
              { type: 'tip', heading: 'Use Named Ranges', body: 'Name your data ranges (Ctrl+Shift+F3 or Insert → Named Ranges). Then write =AVERAGE(Scores) instead of =AVERAGE(C2:C150). Formulas become self-documenting.' }
            ]
          },
          {
            id: 'da-2-2',
            title: 'Pivot Tables',
            duration: '50 min',
            description: 'Summarise and group large datasets in seconds with Pivot Tables.',
            video_url: '',
            needs_runtime: false,
            resources: ['Pivot Table Step-by-Step'],
            assignment: 'Create a pivot table from a sales dataset showing: total sales per region, average order value per product category, and top 5 products by revenue.',
            content: [
              { type: 'concept', heading: 'Pivot Tables = Instant Summaries', body: 'A pivot table lets you drag fields to Rows, Columns, and Values to instantly group and summarise your data in any combination — without writing a single formula.' },
              { type: 'concept', heading: 'The Four Areas', body: 'Rows: the categories you\'re grouping by (e.g., Region). Columns: a second dimension (e.g., Month). Values: what you\'re measuring (e.g., SUM of Sales). Filters: narrow down the entire table.' },
              { type: 'tip', heading: 'Slicers for Interactive Filtering', body: 'Add slicers to your pivot table (Insert → Slicer) for clickable filter buttons. This turns your pivot table into a simple interactive dashboard.' }
            ]
          },
          {
            id: 'da-2-3',
            title: 'Charts That Tell a Story',
            duration: '40 min',
            description: 'Pick the right chart type for your data and audience.',
            video_url: '',
            needs_runtime: false,
            resources: ['Chart Type Cheat Sheet'],
            assignment: 'Using your pivot table data, create 3 different chart types. For each, write one sentence explaining what insight this chart makes immediately obvious.',
            content: [
              { type: 'concept', heading: 'Chart Type Guide', body: 'Bar/Column: compare categories. Line: show change over time. Pie/Donut: show proportions (max 5 slices). Scatter: show correlation between two variables. Heatmap: show intensity across a matrix.' },
              { type: 'concept', heading: 'Less is More in Charts', body: 'Remove chart junk: gridlines, background colours, 3D effects, excessive labels. Every element that doesn\'t communicate data removes clarity. A clean chart communicates faster.' },
              { type: 'tip', heading: 'Colour for Meaning, Not Decoration', body: 'Use colour to highlight insights, not to make charts "look nice". Highlight one bar in a different colour to draw attention to the most important data point.' }
            ]
          }
        ],
        assignment: 'Build a sales analysis report: clean a dataset, build pivot tables, create 3 charts, and write a 1-page summary of 3 key findings.'
      },
      {
        week: 3,
        title: 'Dashboards',
        theme: 'Interactive Data Visualisation',
        color: '#a78bfa',
        lessons: [
          {
            id: 'da-3-1',
            title: 'Dashboard Design Principles',
            duration: '40 min',
            description: 'Layout, colour, and data hierarchy for decision-ready dashboards.',
            video_url: '',
            needs_runtime: false,
            resources: ['Dashboard Layout Template', 'Google Data Studio Intro'],
            assignment: 'Sketch (on paper or Canva) the layout of a 1-page dashboard for a school monitoring student performance. Identify the 5 KPIs to display.',
            content: [
              { type: 'concept', heading: 'A Dashboard Answers One Question', body: 'Every great dashboard has one primary question: "How is [X] performing?". Every metric on the dashboard should contribute to answering that question. Remove metrics that don\'t.' },
              { type: 'concept', heading: 'The Attention Hierarchy', body: 'Place the most important KPIs at the top left. Use large numbers (scorecards) for headline metrics. Use charts for trends and comparisons. Use tables only for detailed drill-down.' },
              { type: 'tip', heading: 'Limit to 7 Metrics', body: 'A dashboard with 20 metrics tells no story. Choose 5-7 KPIs that answer your primary question. If someone needs more, build a second, more detailed dashboard.' }
            ]
          },
          {
            id: 'da-3-2',
            title: 'Building Dashboards in Google Sheets',
            duration: '50 min',
            description: 'Combine pivot tables, charts, and slicers into a one-page dashboard.',
            video_url: '',
            needs_runtime: false,
            resources: ['Google Sheets Dashboard Template'],
            assignment: 'Build a complete sales dashboard in Google Sheets: key metrics at the top (revenue, orders, avg order value), a trend line chart, a breakdown by category, and at least one slicer.',
            content: [
              { type: 'concept', heading: 'Separate Data from Dashboard', body: 'Keep your raw data on one sheet, your pivot tables on another, and your dashboard on a clean third sheet. This keeps the dashboard sheet focused on presentation, not data.' },
              { type: 'example', heading: 'Scorecard KPIs with Dynamic References', body: '// In your dashboard sheet, reference calculated values:\n=\'Pivot Sheet\'!B2     // pulls total revenue from your pivot table\n=TEXT(B1,"₦#,##0")  // format as currency\n\n// Add conditional formatting:\n// Green if above target, red if below' },
              { type: 'tip', heading: 'Protect the Dashboard Sheet', body: 'Lock your dashboard sheet so stakeholders can\'t accidentally edit formulas. Sheets → Protect sheet → allow slicers to still work.' }
            ]
          },
          {
            id: 'da-3-3',
            title: 'Google Looker Studio (Free BI Tool)',
            duration: '45 min',
            description: 'Build an interactive web dashboard connected to your Google Sheets data.',
            video_url: '',
            needs_runtime: false,
            resources: ['Looker Studio Getting Started'],
            assignment: 'Connect your sales dataset to Looker Studio. Build a dashboard with a date range filter, a scorecard, a bar chart, and a table. Share the public link.',
            content: [
              { type: 'concept', heading: 'Looker Studio = Sharable Dashboards', body: 'Looker Studio (formerly Data Studio) creates shareable, interactive dashboards from Google Sheets, BigQuery, or other sources. Anyone with the link can explore the data in real time — no Sheets access needed.' },
              { type: 'concept', heading: 'Connecting a Data Source', body: 'In Looker Studio: Create → Data Source → Google Sheets → select your sheet. The tool reads your column headers and data types automatically. Then Create Report and start adding charts.' },
              { type: 'tip', heading: 'Date Controls for Time-Series Dashboards', body: 'Add a Date Range control from the toolbar. Every chart in the dashboard automatically filters by the selected date range — this turns a static report into an interactive analysis tool.' }
            ]
          }
        ],
        assignment: 'Build a published Looker Studio dashboard for a real or sample dataset. Write a 1-page narrative explaining 3 insights a business could act on.'
      },
      {
        week: 4,
        title: 'SQL for Data Analysis',
        theme: 'Querying Databases',
        color: '#34d399',
        lessons: [
          {
            id: 'da-4-1',
            title: 'SQL Fundamentals',
            duration: '50 min',
            description: 'SELECT, WHERE, ORDER BY, GROUP BY — query your first database.',
            video_url: '',
            needs_runtime: false,
            resources: ['SQL Basics Cheat Sheet', 'Mode Analytics SQL Tutorial'],
            assignment: 'Using a sample database (Mode Analytics or SQLiteOnline), write queries to: find all customers from Lagos, count orders per product, find the top 10 customers by spend.',
            content: [
              { type: 'concept', heading: 'SQL is the Language of Data', body: 'SQL (Structured Query Language) is the universal language for querying relational databases. Every data-driven company — from startups to banks — stores data in SQL databases. It\'s the highest-ROI skill a data analyst can learn.' },
              { type: 'example', heading: 'Core SQL Query Structure', body: 'SELECT customer_name, SUM(order_value) AS total_spend\nFROM orders\nWHERE order_date >= \'2024-01-01\'\nGROUP BY customer_name\nHAVING SUM(order_value) > 50000\nORDER BY total_spend DESC\nLIMIT 10;' },
              { type: 'tip', heading: 'Read the Query Order Mentally', body: 'SQL executes in this order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Understanding this prevents confusion about when you can use aliases and calculated columns.' }
            ]
          },
          {
            id: 'da-4-2',
            title: 'JOINs — Combining Tables',
            duration: '50 min',
            description: 'Use INNER, LEFT, and FULL JOINs to combine data across tables.',
            video_url: '',
            needs_runtime: false,
            resources: ['SQL JOIN Visual Guide'],
            assignment: 'Write queries that: JOIN customers to orders to get each customer\'s order history, LEFT JOIN products to find products with no orders, and calculate each customer\'s average order value.',
            content: [
              { type: 'concept', heading: 'JOINs Combine Related Tables', body: 'Real data is split across multiple tables. JOINs let you combine them. INNER JOIN: only rows that match in both tables. LEFT JOIN: all rows from the left table, matched or not. FULL JOIN: all rows from both.' },
              { type: 'example', heading: 'JOIN Syntax', body: 'SELECT c.name, o.order_date, o.total\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id\nWHERE c.city = \'Lagos\'\nORDER BY o.order_date DESC;' },
              { type: 'tip', heading: 'Use Table Aliases', body: 'FROM customers c — now you can write c.name instead of customers.name. Essential when JOINing multiple tables that have columns with the same name.' }
            ]
          },
          {
            id: 'da-4-3',
            title: 'Subqueries & Window Functions',
            duration: '50 min',
            description: 'Write subqueries and use ROW_NUMBER, RANK, and LAG for advanced analysis.',
            video_url: '',
            needs_runtime: false,
            resources: ['Window Functions Guide'],
            assignment: 'Write a query that ranks customers by total spend per city (rank 1 = highest spender in each city). Use a window function with PARTITION BY.',
            content: [
              { type: 'concept', heading: 'Window Functions Do Analytics', body: 'Window functions (OVER clause) perform calculations across rows related to the current row, without collapsing results like GROUP BY does. They\'re essential for ranking, running totals, and period comparisons.' },
              { type: 'example', heading: 'Window Function Examples', body: '-- Rank customers by spend within each city\nSELECT name, city, total_spend,\n  RANK() OVER (PARTITION BY city ORDER BY total_spend DESC) AS city_rank\nFROM customers;\n\n-- Running total of daily revenue\nSELECT order_date, daily_revenue,\n  SUM(daily_revenue) OVER (ORDER BY order_date) AS running_total\nFROM daily_sales;' }
            ]
          }
        ],
        assignment: 'Write a complete SQL analysis of an e-commerce dataset: top products, best customers, monthly revenue trend, cohort retention. Export results to Google Sheets and create one chart per insight.'
      },
      {
        week: 5,
        title: 'Python for Data Analysis',
        theme: 'Pandas & Data Manipulation',
        color: '#f472b6',
        lessons: [
          {
            id: 'da-5-1',
            title: 'Python Basics for Analysts',
            duration: '45 min',
            description: 'Variables, lists, dictionaries, and loops — just enough Python to start with data.',
            video_url: '',
            needs_runtime: false,
            resources: ['Python for Analysts Cheat Sheet', 'Google Colab Guide'],
            assignment: 'In a Google Colab notebook: read a CSV file with pandas, print its shape and first 5 rows, and describe the data types and basic statistics.',
            content: [
              { type: 'concept', heading: 'Use Google Colab — No Setup Needed', body: 'Google Colab is a free, cloud-based Python notebook. No installation, no configuration — just open colab.research.google.com, create a notebook, and start coding. Perfect for analysts.' },
              { type: 'example', heading: 'pandas Quick Start', body: 'import pandas as pd\n\n# Load a CSV\ndf = pd.read_csv("data.csv")\n\n# Explore\nprint(df.shape)       # (rows, columns)\nprint(df.head())      # first 5 rows\nprint(df.dtypes)      # data types\nprint(df.describe())  # stats: count, mean, min, max, quartiles' },
              { type: 'tip', heading: 'DataFrame = Spreadsheet in Python', body: 'A pandas DataFrame is like a Google Sheet in Python. Columns are pandas Series (like a column). You can filter, sort, group, merge, and reshape — with the full power of Python.' }
            ]
          },
          {
            id: 'da-5-2',
            title: 'Cleaning & Transforming Data with Pandas',
            duration: '50 min',
            description: 'Handle missing values, rename columns, and reshape dataframes.',
            video_url: '',
            needs_runtime: false,
            resources: ['Pandas Cleaning Cheat Sheet'],
            assignment: 'Take a messy dataset, clean it with pandas: drop duplicates, fill missing values, rename columns, filter rows, and create a new calculated column.',
            content: [
              { type: 'example', heading: 'Common pandas Cleaning Operations', body: '# Remove duplicates\ndf = df.drop_duplicates()\n\n# Handle missing values\ndf["age"].fillna(df["age"].median(), inplace=True)\ndf = df.dropna(subset=["email"])  # drop rows where email is null\n\n# Rename columns\ndf = df.rename(columns={"cust_nm": "customer_name"})\n\n# Create new column\ndf["revenue"] = df["price"] * df["quantity"]\n\n# Filter rows\nlagos_customers = df[df["city"] == "Lagos"]' }
            ]
          },
          {
            id: 'da-5-3',
            title: 'GroupBy, Merge & Visualise',
            duration: '50 min',
            description: 'Group data like SQL, merge DataFrames like SQL JOINs, and plot with matplotlib.',
            video_url: '',
            needs_runtime: false,
            resources: ['Pandas GroupBy Guide', 'Matplotlib Quick Start'],
            assignment: 'Using pandas: group a sales dataset by region and product, merge with a customer dataset, and create 2 matplotlib/seaborn charts showing key insights.',
            content: [
              { type: 'example', heading: 'GroupBy and Merge', body: '# GroupBy (like SQL GROUP BY)\nsales_by_region = df.groupby("region")["revenue"].agg(["sum", "mean", "count"])\n\n# Merge (like SQL JOIN)\nmerged = pd.merge(orders, customers, on="customer_id", how="left")\n\n# Plot\nimport matplotlib.pyplot as plt\nsales_by_region["sum"].plot(kind="bar")\nplt.title("Revenue by Region")\nplt.tight_layout()\nplt.show()' }
            ]
          }
        ],
        assignment: 'Complete a full pandas analysis project in a Colab notebook: load data → clean → group/summarise → merge with second table → 3 charts → written conclusions.'
      },
      {
        week: 6,
        title: 'Statistical Thinking',
        theme: 'From Data to Insight',
        color: '#38bdf8',
        lessons: [
          {
            id: 'da-6-1',
            title: 'Descriptive Statistics',
            duration: '40 min',
            description: 'Mean, median, standard deviation, percentiles — what they actually mean.',
            video_url: '',
            needs_runtime: false,
            resources: ['Statistics for Analysts Guide'],
            assignment: 'Calculate and interpret mean, median, mode, and standard deviation for a dataset. Explain in plain language what each tells you about the data.',
            content: [
              { type: 'concept', heading: 'Mean vs Median', body: 'The mean (average) is pulled by extreme values (outliers). The median (middle value) is not. For income data, house prices, or anything skewed, the median is more representative than the mean.' },
              { type: 'concept', heading: 'Standard Deviation', body: 'Standard deviation measures spread — how far data points typically are from the mean. Low SD = clustered around the mean. High SD = widely spread. It\'s the most common measure of variability.' },
              { type: 'example', heading: 'When Median Tells the Truth', body: 'CEO salary: ₦50M. 9 employees: ₦200K each.\nMean salary: (50M + 9×200K) / 10 = ₦5.18M — misleading!\nMedian salary: ₦200K — accurate picture of a "typical" employee.' }
            ]
          },
          {
            id: 'da-6-2',
            title: 'Correlation & Basic Regression',
            duration: '45 min',
            description: 'Measure relationships between variables and predict simple trends.',
            video_url: '',
            needs_runtime: false,
            resources: ['Correlation vs Causation Guide'],
            assignment: 'Find the correlation between two variables in a dataset. Plot a scatter chart with a trend line. Write a clear interpretation: what does the correlation mean, and what doesn\'t it tell you?',
            content: [
              { type: 'concept', heading: 'Correlation ≠ Causation', body: 'Correlation measures how two variables move together (-1 to +1). But correlation does NOT mean one causes the other. Ice cream sales and drowning deaths are correlated — both increase in summer. Cause: summer.' },
              { type: 'concept', heading: 'Linear Regression for Forecasting', body: 'A linear regression finds the best-fit line through a scatter plot. It lets you predict Y from X. Example: predict next month\'s sales based on ad spend. It assumes a linear relationship — always check the scatter plot first.' }
            ]
          },
          {
            id: 'da-6-3',
            title: 'Using AI to Accelerate Analysis',
            duration: '35 min',
            description: 'Use ChatGPT and AI tools to generate formulas, interpret data, and write findings faster.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Prompting for Data Analysts'],
            assignment: 'Use ChatGPT or Claude to: generate 3 complex formulas from plain-English descriptions, interpret a chart you created, and draft a findings summary from your analysis notes.',
            content: [
              { type: 'concept', heading: 'AI is a Force Multiplier for Analysts', body: 'You don\'t need to memorise every formula or function. Describe what you want in plain English and ask AI to generate it. Your job is to verify it works and understand what it does.' },
              { type: 'example', heading: 'Effective Prompts for Data Analysis', body: '"Write a Google Sheets formula that counts the number of orders in column B where the date in column A is in 2024 and the region in column C is \'Lagos\'."\n\n"I have this chart [paste description or screenshot]. What 3 insights would a data analyst highlight?"\n\n"Summarise these findings in 3 bullet points a non-technical CEO can act on: [paste your analysis notes]."' }
            ]
          }
        ],
        assignment: 'Build a complete data story: choose a public dataset, form a hypothesis, analyse it statistically, create visualisations, and write a 1-page report with 3 recommendations. Use AI to help draft the narrative.'
      },
      {
        week: 7,
        title: 'Real-World Analysis Projects',
        theme: 'Applied Analysis',
        color: '#c084fc',
        lessons: [
          {
            id: 'da-7-1',
            title: 'Marketing Analytics — Campaign Performance',
            duration: '45 min',
            description: 'Calculate CTR, conversion rate, CAC, and ROAS for a marketing campaign.',
            video_url: '',
            needs_runtime: false,
            resources: ['Marketing Metrics Glossary'],
            assignment: 'Analyse a sample marketing campaign dataset: calculate key metrics (CTR, conversion rate, CAC), identify the best and worst performing channels, and recommend where to increase or cut budget.',
            content: [
              { type: 'concept', heading: 'Key Marketing Metrics', body: 'CTR (Click-Through Rate) = Clicks / Impressions. Conversion Rate = Conversions / Clicks. CAC (Customer Acquisition Cost) = Ad Spend / New Customers. ROAS (Return on Ad Spend) = Revenue / Ad Spend.' },
              { type: 'tip', heading: 'Segment Before Averaging', body: 'A 5% average conversion rate could mean 10% on Instagram and 1% on LinkedIn. Always segment by channel, audience, and creative before averaging. Averages hide the story.' }
            ]
          },
          {
            id: 'da-7-2',
            title: 'Product Analytics — User Behaviour',
            duration: '45 min',
            description: 'Analyse a funnel, find where users drop off, and recommend fixes.',
            video_url: '',
            needs_runtime: false,
            resources: ['Funnel Analysis Guide'],
            assignment: 'Analyse a product funnel dataset (visits → signups → first purchase → repeat purchase). Calculate conversion at each stage, identify the biggest drop-off, and propose 2 hypotheses for why it\'s happening.',
            content: [
              { type: 'concept', heading: 'Funnel Analysis Finds Leaks', body: 'A funnel shows how many users complete each step of a process. The step with the biggest drop-off is your highest-leverage opportunity. Fix that step before anything else.' },
              { type: 'concept', heading: 'Cohort Analysis', body: 'Group users by when they signed up (weekly or monthly cohorts) and track their behaviour over time. This shows whether retention is improving or degrading as you make product changes.' }
            ]
          },
          {
            id: 'da-7-3',
            title: 'Financial Analytics — P&L Basics',
            duration: '40 min',
            description: 'Read a P&L, calculate margins, and identify profitability trends.',
            video_url: '',
            needs_runtime: false,
            resources: ['P&L Analysis Template'],
            assignment: 'Analyse a 12-month P&L dataset: calculate gross margin, operating margin, and net margin for each month. Identify the months where margin declined and hypothesise reasons.',
            content: [
              { type: 'concept', heading: 'The P&L in Plain English', body: 'Revenue - Cost of Goods Sold = Gross Profit. Gross Profit - Operating Expenses = Operating Profit. Operating Profit - Tax & Interest = Net Profit. Margins are these as percentages of Revenue.' },
              { type: 'tip', heading: 'MoM and YoY comparisons', body: 'Month-over-Month (MoM) shows recent trends. Year-over-Year (YoY) removes seasonal effects. Always compare both to understand whether a change is a real trend or just seasonality.' }
            ]
          }
        ],
        assignment: 'Pick one real domain (marketing, product, or finance) and conduct a full analysis using a real public dataset. Present 5 data-backed recommendations.'
      },
      {
        week: 8,
        title: 'Communicating Data & Capstone',
        theme: 'Presenting Insights That Drive Decisions',
        color: '#4ade80',
        lessons: [
          {
            id: 'da-8-1',
            title: 'Storytelling with Data',
            duration: '40 min',
            description: 'Structure a data presentation that leads to a decision.',
            video_url: '',
            needs_runtime: false,
            resources: ['Data Storytelling Framework', 'Presentation Template'],
            assignment: 'Restructure a sample data report using the Situation → Complication → Resolution storytelling framework. The output should be a 5-slide deck.',
            content: [
              { type: 'concept', heading: 'Lead with the Insight, Not the Method', body: 'Non-technical stakeholders don\'t care how you calculated it. They care what it means and what to do. Structure your report as: Situation (context) → Complication (the problem data reveals) → Resolution (what you recommend).' },
              { type: 'tip', heading: 'One Slide, One Insight', body: 'Each slide should make one point. Its title should be the takeaway, not the topic. Instead of "Sales by Region", write "Lagos drives 68% of revenue — other regions are under-invested."' }
            ]
          },
          {
            id: 'da-8-2',
            title: 'Building a Data Analyst Portfolio',
            duration: '35 min',
            description: 'Structure your projects on GitHub and craft a data analyst CV.',
            video_url: '',
            needs_runtime: false,
            resources: ['Data Analyst Portfolio Guide', 'GitHub README Template'],
            assignment: 'Push your best analysis project to GitHub with a comprehensive README (problem statement, dataset, methods, findings, and screenshots of charts). Share the URL.',
            content: [
              { type: 'concept', heading: 'GitHub is Your Data Analyst Portfolio', body: 'Share your Colab notebooks, SQL scripts, and Looker Studio links publicly on GitHub. Each repo should have a clear README explaining what question you answered and what you found.' },
              { type: 'tip', heading: '3 Projects Beat 10 Partial Ones', body: 'Three complete, well-documented, end-to-end analysis projects are worth more than 10 half-finished ones. Finish what you start and document it properly.' }
            ]
          },
          {
            id: 'da-8-3',
            title: 'Capstone — End-to-End Data Analysis',
            duration: '120 min',
            description: 'Conduct a complete data analysis project from raw data to stakeholder presentation.',
            video_url: '',
            needs_runtime: false,
            resources: ['Capstone Brief Template'],
            assignment: 'Choose a real public dataset. Frame a business question. Clean the data, analyse it (SQL or Python), build a dashboard (Sheets or Looker Studio), and present 3 actionable recommendations in a 5-slide deck or Looker Studio report. Submit the dataset, code, dashboard link, and presentation.',
            content: [
              { type: 'concept', heading: 'The Full Analyst Workflow', body: '(1) Business question → (2) Data collection → (3) Cleaning → (4) Exploration → (5) Analysis → (6) Visualisation → (7) Storytelling → (8) Recommendation. Your capstone must touch all 8 steps.' },
              { type: 'tip', heading: 'Use a Public Dataset You Care About', body: 'Great capstone datasets: Nigerian economic data (NBS), COVID data, football statistics, e-commerce datasets (Kaggle), World Bank development indicators. Passion for the subject makes the analysis sharper.' }
            ]
          }
        ],
        assignment: 'Your capstone submission: a complete end-to-end analysis published on GitHub and Looker Studio, with a 5-slide narrative deck and a 2-minute video walkthrough.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // AI AUTOMATIONS — 6 Weeks
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-automations',
    title: 'AI Automations',
    category: 'AI',
    instructor: 'Kingshima Lead',
    duration: '6 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    description: 'Use ChatGPT, Claude, and AI tools to automate real tasks, create content faster, and build custom AI workflows.',
    curriculum: [
      {
        week: 1,
        title: 'Talking to AI the Right Way',
        theme: 'Prompt Engineering',
        color: '#ff6d40',
        lessons: [
          {
            id: 'ai-1-1',
            title: 'Prompt Engineering Fundamentals',
            duration: '40 min',
            description: 'Get reliable, high-quality outputs from AI by writing better prompts.',
            video_url: '',
            needs_runtime: false,
            resources: ['Prompt Templates Pack'],
            assignment: 'Write 5 prompts for tasks you do weekly (drafting emails, summarising documents, planning, etc.). Test each in ChatGPT and Claude. Compare outputs and iterate until you\'re satisfied.',
            content: [
              { type: 'concept', heading: 'The Anatomy of a Great Prompt', body: 'Great prompts have: (1) Role — "You are a marketing expert." (2) Task — "Write a Facebook ad." (3) Context — "For a Nigerian hair salon targeting women 25-45." (4) Format — "3 variations, max 50 words each." (5) Constraints — "No emojis, professional tone."' },
              { type: 'concept', heading: 'Iteration is the Key Skill', body: 'No prompt is perfect on the first try. Generate → evaluate → refine → regenerate. The ability to identify what\'s wrong with an output and correct the prompt is more valuable than memorising prompt templates.' },
              { type: 'example', heading: 'Weak vs Strong Prompt', body: 'Weak: "Write a post about my business."\n\nStrong: "You are a social media manager for a Nigerian fintech startup. Write an Instagram caption (max 150 words) announcing our new instant transfer feature. Tone: professional but friendly. Include one clear call to action. No hashtags."' }
            ]
          },
          {
            id: 'ai-1-2',
            title: 'ChatGPT vs Claude — When to Use Which',
            duration: '35 min',
            description: 'A practical comparison so you know which tool to reach for.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Tools Comparison Sheet'],
            assignment: 'Run the same complex task through both ChatGPT and Claude. Document: which gave a better output, which required fewer iterations, and which you\'d use for this task type going forward.',
            content: [
              { type: 'concept', heading: 'ChatGPT Strengths', body: 'Best for: code generation, data analysis (with Code Interpreter), DALL-E image generation, browsing the web for current info, and general task automation via GPT Actions/plugins.' },
              { type: 'concept', heading: 'Claude Strengths', body: 'Best for: long document analysis (very large context window), nuanced writing, following complex multi-step instructions, and tasks where tone and voice quality matter (it\'s often considered a better writer).' },
              { type: 'tip', heading: 'Use Both — They\'re Complementary', body: 'Professionals use both. Draft in Claude, code in ChatGPT. Or use Claude to refine a rough draft, ChatGPT to implement it in code. The best AI workflow uses the right tool for each step.' }
            ]
          },
          {
            id: 'ai-1-3',
            title: 'AI for Your Daily Work',
            duration: '30 min',
            description: 'Map out where AI can take tasks off your plate right now.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Use Case Checklist'],
            assignment: 'Create a personal "AI task map": list every repeatable task you do weekly, identify which ones AI could handle 80%+ of, and pick the top 3 to automate this week.',
            content: [
              { type: 'concept', heading: 'Automate Repetitive, Not Creative', body: 'AI is best at tasks that are: repeatable, rule-based, language-intensive, and time-consuming. Your first automation targets should be: drafting routine emails, summarising documents, creating first drafts, and data formatting.' },
              { type: 'tip', heading: 'The 80/20 Rule for AI Tasks', body: 'If AI can do 80% of the work in 10 seconds, and you refine the last 20% yourself, you\'ve still saved enormous time. Don\'t reject AI outputs because they\'re not perfect — edit them instead.' }
            ]
          }
        ],
        assignment: 'Build a personal prompt library: 10 tested, refined prompts for your most common tasks. Store them in a Google Doc you\'ll actually use.'
      },
      {
        week: 2,
        title: 'AI for Visuals & Content',
        theme: 'Creating Faster with AI',
        color: '#a78bfa',
        lessons: [
          {
            id: 'ai-2-1',
            title: 'AI Image Generation',
            duration: '45 min',
            description: 'Generate high-quality visuals with DALL-E, Midjourney, and Ideogram.',
            video_url: '',
            needs_runtime: false,
            resources: ['Visual Prompt Library'],
            assignment: 'Generate 5 visuals for a real project: a product image, a social media banner, a blog header, a logo concept, and a background texture. Test across at least 2 tools.',
            content: [
              { type: 'concept', heading: 'Image Prompt Formula', body: 'Structure: [subject] + [style/medium] + [composition] + [lighting] + [colour palette] + [technical details]. Example: "A young Nigerian woman smiling at her phone, photography style, close-up portrait, natural golden hour light, warm tones, --ar 9:16"' },
              { type: 'concept', heading: 'Tool Overview', body: 'DALL-E 3 (in ChatGPT): easy, conversational prompts, great for quick social content. Midjourney: highest quality, photorealistic and artistic styles. Ideogram: excellent for text in images (logos, banners). Canva AI: great if you\'re already in Canva.' },
              { type: 'tip', heading: 'Iterate on Style', body: 'Generate one image, then ask AI to make variations: "Keep the same subject but change to a flat illustration style." Or: "Same composition but change lighting to studio lighting." Iteration unlocks creative control.' }
            ]
          },
          {
            id: 'ai-2-2',
            title: 'AI Video Generation',
            duration: '40 min',
            description: 'Create short video clips from text prompts using Sora, Runway, and Kling.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Video Tool Comparison'],
            assignment: 'Generate a 5-second promotional clip for a product or idea using at least one AI video tool (RunwayML, Kling, or Sora if available). Write the prompt that produced the best result.',
            content: [
              { type: 'concept', heading: 'AI Video Tools in 2025', body: 'Sora (OpenAI): highest quality, long clips. Runway Gen-3: great for short, cinematic clips. Kling: strong for product and realistic human motion. Luma Dream Machine: free tier available, good quality.' },
              { type: 'concept', heading: 'Video Prompt Tips', body: 'Be specific about: camera movement (slow zoom in, dolly shot, aerial view), action (a woman walking through a market), duration (5 seconds), and mood (energetic, calm, cinematic). Vague prompts produce generic outputs.' }
            ]
          },
          {
            id: 'ai-2-3',
            title: 'Batch-Creating Content with AI',
            duration: '35 min',
            description: 'Generate a month of content in one sitting using AI + Canva.',
            video_url: '',
            needs_runtime: false,
            resources: ['Batch Content Template'],
            assignment: 'Create 20 pieces of social media content in one session using AI: generate all 20 captions with ChatGPT, then create all 20 visuals using Canva AI or DALL-E, using consistent brand templates.',
            content: [
              { type: 'concept', heading: 'The Content Batching System', body: 'Step 1: Ask AI to generate a 30-day content calendar with topics. Step 2: For each topic, generate the caption. Step 3: Generate or adapt a visual. Step 4: Schedule with Buffer or Meta Business Suite. Do all 4 steps in bulk — don\'t switch between tasks.' },
              { type: 'example', heading: 'Batch Caption Prompt', body: '"Create 10 Instagram captions for a Nigerian hair salon. One caption per day for 10 days. Mix topics: tips, before/after descriptions, testimonial prompts, product highlights, and motivational. 100-150 words each. Friendly, warm tone. End each with a call to action."' }
            ]
          }
        ],
        assignment: 'Create a full 30-day social media content set for a real or mock brand: 30 captions (AI-generated, human-refined) + 30 visuals. Schedule 7 of them to post.'
      },
      {
        week: 3,
        title: 'Workflow Automation',
        theme: 'Making AI Do the Repetitive Stuff',
        color: '#34d399',
        lessons: [
          {
            id: 'ai-3-1',
            title: 'No-Code Automation with Make (Integromat)',
            duration: '50 min',
            description: 'Connect apps and automate workflows visually — no code needed.',
            video_url: '',
            needs_runtime: false,
            resources: ['Make.com Getting Started Guide'],
            assignment: 'Build a Make automation: when a new row is added to a Google Sheet, automatically send a welcome email via Gmail. Test it 3 times.',
            content: [
              { type: 'concept', heading: 'Make = Visual Workflow Builder', body: 'Make.com (formerly Integromat) lets you connect 1,500+ apps visually. A "Scenario" is a workflow: Trigger → Action → Action → ... No code needed. More powerful than Zapier, free tier is generous.' },
              { type: 'concept', heading: 'Trigger → Action Model', body: 'Every automation starts with a Trigger (an event that starts the workflow: "new row in Sheet", "new email received", "new form submission") and then runs one or more Actions ("send email", "create Notion page", "post to Slack").' },
              { type: 'tip', heading: 'Error Handling is Essential', body: 'Add error handlers to every critical step. If a step fails (e.g., email sending fails), Make can retry, send you an alert, or log the error to a Sheet. Unhandled errors mean silent failures.' }
            ]
          },
          {
            id: 'ai-3-2',
            title: 'Connecting AI to Your Workflows',
            duration: '45 min',
            description: 'Add AI steps to your Make automations — summarise, classify, generate.',
            video_url: '',
            needs_runtime: false,
            resources: ['Make + OpenAI Integration Guide'],
            assignment: 'Build a Make automation that: receives a new customer support email, sends it to the OpenAI module for classification and suggested reply, and saves both to a Google Sheet. Test with 3 sample emails.',
            content: [
              { type: 'concept', heading: 'AI as a Step in Your Workflow', body: 'Make\'s OpenAI module lets you send a prompt and receive a response as part of an automated workflow. Use AI to: classify input data, generate personalised responses, extract structured info from unstructured text, or summarise documents.' },
              { type: 'example', heading: 'Email Classification Prompt', body: '"Classify the following customer email into one of these categories: [Refund Request, Technical Issue, General Inquiry, Complaint, Compliment]. Then write a suggested reply in a friendly, professional tone.\n\nEmail: {{email_body}}\n\nReturn JSON: { \\"category\\": \\"...\\" , \\"reply\\": \\"...\\" }"' }
            ]
          },
          {
            id: 'ai-3-3',
            title: 'Building Multi-Step AI Pipelines',
            duration: '50 min',
            description: 'Chain AI steps together for complex, automated multi-stage workflows.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Pipeline Examples'],
            assignment: 'Build a 4+ step AI pipeline in Make: (1) Watch for new Typeform submission → (2) AI classifies the request → (3) AI generates a personalised response → (4) sends email → (5) logs to Notion database.',
            content: [
              { type: 'concept', heading: 'Pipelines Transform Complex Tasks', body: 'A pipeline breaks a complex task into sequential AI-powered steps. Each step\'s output becomes the next step\'s input. This lets you automate tasks that no single AI call could handle alone.' },
              { type: 'tip', heading: 'Test Each Step Individually', body: 'Before running the full pipeline, test each Make module individually. Check the output of each step before connecting to the next. This makes debugging much faster when something breaks.' }
            ]
          }
        ],
        assignment: 'Build and document a real automation pipeline that saves you at least 30 minutes per week. Record a 2-minute video showing it working.'
      },
      {
        week: 4,
        title: 'Custom AI Agents & GPTs',
        theme: 'Building AI That Works for You',
        color: '#f472b6',
        lessons: [
          {
            id: 'ai-4-1',
            title: 'Building Custom GPTs',
            duration: '45 min',
            description: 'Create a specialised AI assistant with a custom system prompt, knowledge base, and actions.',
            video_url: '',
            needs_runtime: false,
            resources: ['Custom GPT Builder Guide'],
            assignment: 'Build a Custom GPT for a specific use case (e.g., a customer support bot for your business, a study assistant for this course, or a Nigerian recipe generator). Test it thoroughly and share the link.',
            content: [
              { type: 'concept', heading: 'Custom GPTs are Specialised AI Assistants', body: 'A Custom GPT is a version of ChatGPT with a custom system prompt (instructions), optional knowledge files (PDFs, documents it can reference), and optional actions (it can call external APIs). Anyone with the link can use it.' },
              { type: 'concept', heading: 'System Prompt Best Practices', body: 'Be specific about: the assistant\'s role and persona, what it should and should NOT do, the tone and style of responses, how to handle requests outside its scope, and any domain-specific knowledge it should apply.' },
              { type: 'example', heading: 'Customer Support Bot System Prompt', body: '"You are a customer support assistant for Kingshima, a Nigerian tech education platform. You answer questions about our courses, pricing, payment, and student dashboard. If you don\'t know the answer, say so and offer to pass the question to the team. Always be friendly, concise, and helpful. Never make up course details you\'re unsure about."' }
            ]
          },
          {
            id: 'ai-4-2',
            title: 'AI Agents with Memory & Tools',
            duration: '50 min',
            description: 'Build AI agents that remember context, search the web, and take actions.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Agent Frameworks Overview'],
            assignment: 'Using Claude or ChatGPT\'s agent capabilities, build an AI that: researches a topic on the web, summarises findings, and produces a structured report. Document your prompting strategy.',
            content: [
              { type: 'concept', heading: 'Agents = AI + Tools + Memory', body: 'An AI agent is an LLM that can use tools (web search, code execution, API calls) and remember context across steps to complete multi-step tasks autonomously. The key difference from a chatbot: an agent plans and acts.' },
              { type: 'concept', heading: 'Claude Projects', body: 'Claude Projects let you give Claude persistent memory (uploaded documents and conversation history) and keep it focused on a specific task across multiple sessions — like a specialist assistant with full context of your work.' }
            ]
          },
          {
            id: 'ai-4-3',
            title: 'Building a Personal AI Workflow System',
            duration: '45 min',
            description: 'Design a complete AI-powered personal productivity system.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Workflow System Template'],
            assignment: 'Document your personal AI system: which tools you use for which tasks, your prompt library, your automation workflows, and your Custom GPTs. Create a reference guide you can share with someone else.',
            content: [
              { type: 'concept', heading: 'Build Your AI Stack', body: 'The most productive AI users have a system: a set of tools (ChatGPT + Claude + Make), a prompt library (Google Docs), saved Custom GPTs for recurring tasks, and automation workflows running in the background.' },
              { type: 'tip', heading: 'Document as You Build', body: 'Every time you create a useful prompt or workflow, write it down immediately. A well-documented AI system is an asset — you can share it, hand it off, or improve it over time.' }
            ]
          }
        ],
        assignment: 'Build and document 3 Custom GPTs for different use cases. Publish your AI system reference guide. Share one Custom GPT publicly.'
      },
      {
        week: 5,
        title: 'AI for Business Operations',
        theme: 'Automating Real Business Workflows',
        color: '#38bdf8',
        lessons: [
          {
            id: 'ai-5-1',
            title: 'AI-Powered Customer Communication',
            duration: '45 min',
            description: 'Automate lead follow-up, email sequences, and customer support using AI.',
            video_url: '',
            needs_runtime: false,
            resources: ['Customer Communication AI Playbook'],
            assignment: 'Build a 3-email welcome sequence for a new product/service using AI. Each email should feel personal, be triggered automatically, and include a clear next step.',
            content: [
              { type: 'concept', heading: 'Personalisation at Scale', body: 'AI can make mass communication feel personal. Merge customer name, company, recent action, and behaviour into every email — generated dynamically by AI, sent automatically by Make or Zapier.' },
              { type: 'example', heading: 'Personalised Email Generation Prompt', body: '"Write a 150-word follow-up email to {{customer_name}} who signed up for our platform {{days_since}} days ago but hasn\'t enrolled in a course yet. Their interests are {{interests}}. Friendly, not pushy. Mention one specific course they might like. End with a single CTA."' }
            ]
          },
          {
            id: 'ai-5-2',
            title: 'AI for Sales & Lead Generation',
            duration: '45 min',
            description: 'Use AI to research leads, write cold outreach, and qualify prospects.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Sales Playbook'],
            assignment: 'Research 5 real potential clients for a business you want to grow. For each, write a personalised cold outreach message using AI. Send at least 2 of them.',
            content: [
              { type: 'concept', heading: 'Research → Personalise → Reach Out', body: 'The highest-converting outreach is hyper-personalised. Use AI to research each prospect (find specific pain points from their social media/website), then generate a message that references something specific about their business.' },
              { type: 'tip', heading: 'Lead with Value, Not Your Pitch', body: '"I noticed your social media doesn\'t have consistent graphics — I made a sample post for you" converts better than "I\'m a graphic designer looking for clients." Give before you ask.' }
            ]
          },
          {
            id: 'ai-5-3',
            title: 'AI for Operations & Reporting',
            duration: '40 min',
            description: 'Automate weekly reports, meeting summaries, and internal documentation.',
            video_url: '',
            needs_runtime: false,
            resources: ['AI Operations Template Pack'],
            assignment: 'Build an automation that generates a weekly business report: pulls data from a Google Sheet, sends it to AI for summary and analysis, and emails the report to stakeholders every Monday morning.',
            content: [
              { type: 'concept', heading: 'Automate the Reporting Layer', body: 'Most reporting is just: collect data → format → narrate → distribute. All four steps can be automated with AI. The human role shifts from doing the report to reviewing it and acting on it.' },
              { type: 'example', heading: 'Weekly Report Generation Prompt', body: '"You are a business analyst. Based on this week\'s data:\n{{data_summary}}\n\nWrite a 200-word executive summary highlighting: the 3 most important insights, what changed vs last week, and one specific action the team should take this week. Use plain language. Be direct."' }
            ]
          }
        ],
        assignment: 'Automate one real business process end-to-end: from trigger to AI processing to output delivery. Document the ROI (time saved per week).'
      },
      {
        week: 6,
        title: 'Capstone — Your AI Automation Project',
        theme: 'Build Something Real',
        color: '#a3e635',
        lessons: [
          {
            id: 'ai-6-1',
            title: 'Scoping Your Automation Project',
            duration: '40 min',
            description: 'Define the problem, design the workflow, and plan the implementation.',
            video_url: '',
            needs_runtime: false,
            resources: ['Automation Project Scoping Template'],
            assignment: 'Write a 1-page project brief: the problem being solved, the current manual process, the proposed automation (step by step), estimated time saved per week, and tools needed.',
            content: [
              { type: 'concept', heading: 'The Best Automations Solve Real Pain', body: 'The highest-value automation project you can build is one that solves a real, current problem in your life or work. Ask: what takes the most time that is also repetitive and rule-based?' },
              { type: 'tip', heading: 'Start with the Manual Version', body: 'Before automating, manually do the process exactly as the automation will do it. This reveals edge cases, required data formats, and failure points before you build anything.' }
            ]
          },
          {
            id: 'ai-6-2',
            title: 'Build & Test Your Automation',
            duration: '120 min',
            description: 'Implement your capstone automation with AI, test it thoroughly, and handle errors.',
            video_url: '',
            needs_runtime: false,
            resources: ['Automation Testing Checklist'],
            assignment: 'Build your capstone automation. Test it with at least 10 different inputs, including edge cases. Document every error you encountered and how you fixed it.',
            content: [
              { type: 'concept', heading: 'Test Adversarially', body: 'After testing the happy path (normal inputs), test edge cases: empty inputs, very long inputs, non-English text, special characters, invalid data. Real-world inputs are messier than your test data.' },
              { type: 'tip', heading: 'Build in a Fallback', body: 'Every automation should have a fallback: if the AI step fails, send an alert to yourself or log the error. Silent failures in automations can cause serious problems — you won\'t notice until damage is done.' }
            ]
          },
          {
            id: 'ai-6-3',
            title: 'Document, Ship & Share',
            duration: '60 min',
            description: 'Document your automation for others to understand, deploy, and replicate.',
            video_url: '',
            needs_runtime: false,
            resources: ['Documentation Template', 'Sharing Automations Guide'],
            assignment: 'Submit your capstone: (1) A written description of the automation with a workflow diagram. (2) A link to the Make scenario or a video walkthrough. (3) A 2-minute demo video. (4) Estimated time saved per month.',
            content: [
              { type: 'concept', heading: 'Documentation is the Product', body: 'An automation with no documentation is a black box. If you leave or the tool breaks, no one can maintain it. Write documentation as if the next person who runs this has never seen it before.' },
              { type: 'tip', heading: 'The Most Valuable Skill', body: 'By the end of this course, you can do something most people can\'t: identify a problem, design a solution, and build AI-powered automation to solve it. That\'s a rare, marketable skill — use it.' }
            ]
          }
        ],
        assignment: 'Ship your capstone AI automation project. Submit: workflow diagram, scenario/code link, demo video, and a 1-page impact report (time saved, problems solved, what you\'d improve).'
      }
    ]
  }
];
