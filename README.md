# Wizzard Ai JS Widget

# Client

This main file here is the `wizzardai.js` file that holds all code to be inserted to an website as a third-party script. The `index.html` page loads this script with some text input examples.

The files `dev/script.js`, `css/style.css` and `dev/index.html` are only for `Development` purposes. They can be used to improve the widget functionality without having all code into one file (`wizzardai.js`)

# Server

Install `package.json`:

```
npm install
```

Run de development server (nodemon):

```bash
npm run dev
```

... or run the embedded nodejs server (no live reaload)

```
npm start
```

# Run client

Client can be run using an embedded server such as `VS Code Live-Server`

Right click on `index.html` from root folder -> Open with Live-Server

# Run development client

Right click on `dev/index.html` -> Open with Live-Server

# If CORS errors

If you get a CORS error replace the `127.0.0.1` from address bar with `localhost` and try again
