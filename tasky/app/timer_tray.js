const electron = require("electron");
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, toggleWindow) {
    super(iconPath);

    this.toggleWindow = toggleWindow;
    this.setToolTip("Timer App");

    if (process.platform === "darwin" || process.platform === "win32") {
      this.on("click", this.onClick.bind(this));
    } else {
      this.showMenu();
    }

    this.on("right-click", this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    //Click event bounds
    const { x, y } = bounds;
    // console.log(bounds);

    //Window height and width
    const { height, width } = this.toggleWindow.getBounds();

    if (this.toggleWindow.isVisible()) {
      this.toggleWindow.hide();
    } else {
      const yPosition = process.platform === "darwin" ? y : y - height;
      this.toggleWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width
      });
      this.toggleWindow.show();
    }
  }

  onRightClick() {
    const menuTemplate =
      Menu.buildFromTemplate[
        {
          role: "quit"
        }
      ];

    this.popUpContextMenu(menuTemplate);
  }

  //Linux only function
  showMenu() {
    const toggleWindow = this.toggleWindow;
    const { width, height } = toggleWindow.getBounds();
    const { screen } = electron;

    const win = screen.getPrimaryDisplay();

    const trayMenu = Menu.buildFromTemplate([
      {
        label: "Toggle",
        click() {
          if (toggleWindow.isVisible()) {
            toggleWindow.hide();
          } else {
            toggleWindow.setBounds({
              x: win.bounds.width - width,
              y: win.bounds.y,
              width: 300,
              height: 500
            });
            toggleWindow.show();
          }
        }
      },
      {
        label: "Quit",
        click: () => app.quit()
      }
    ]);

    this.setContextMenu(trayMenu);
  }
}

module.exports = TimerTray;
