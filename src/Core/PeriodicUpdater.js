export class PeriodicUpdater {
  interval;
  acc = 0;
  funcBinded;
  constructor(interval, func, context) {
    this.interval = interval;
    this.funcBinded = func.bind(context);
  }
  update(dt) {
    if (this.acc >= this.interval) {
      this.acc = 0;
      this.funcBinded(dt);
    } else {
      this.acc += dt * 1e3;
    }
  }
}