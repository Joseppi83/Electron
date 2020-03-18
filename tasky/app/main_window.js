const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        //Line below ensures that app runs at full speed with resources when on blur
        backgroundThrottling: false
      }
    });

    this.loadURL(url);
    this.on("blur", this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
