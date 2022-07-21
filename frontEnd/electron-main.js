const { app, BrowserWindow } = require("electron");
var win;
function createWindow() {
  win = new BrowserWindow({
    backgroundColor: "#ffffff",
    fullscreen: false,
    webPreferences: {
      webSecurity: false,
    },
  });
  win.openDevTools();
  // win.maximize();
  const path = `file://${__dirname}/dist/index.html`;
  console.log(path, "path");
  win.loadURL(path);
  win.on("closed", function () {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});

app.on("before-quit", function (e) {});
