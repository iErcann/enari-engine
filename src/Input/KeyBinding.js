export var Key = /* @__PURE__ */ ((Key2) => {
  Key2["Forward"] = "Forward";
  Key2["Right"] = "Right";
  Key2["Left"] = "Left";
  Key2["Backward"] = "Backward";
  Key2["Jump"] = "Jump";
  Key2["Left_Click"] = "Left_Click";
  Key2["Right_Click"] = "Right_Click";
  Key2["Shift"] = "Shift";
  Key2["Use"] = "Use";
  Key2["One"] = "One";
  Key2["Reload"] = "Reload";
  Key2["Two"] = "Two";
  Key2["Three"] = "Three";
  Key2["Four"] = "Four";
  Key2["Five"] = "Five";
  return Key2;
})(Key || {});
export class KeyBinding {
  key;
  isPressed = false;
  justPressed = false;
  justReleased = false;
  constructor(key) {
    this.key = key;
  }
  setPressed(pressed) {
    this.isPressed = pressed;
    this.justPressed = pressed;
  }
  onKeyUp() {
    this.isPressed = false;
    this.justReleased = true;
  }
  resetRelease() {
    this.justReleased = false;
    this.justPressed = false;
  }
}

