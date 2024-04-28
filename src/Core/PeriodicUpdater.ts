import { IUpdatable } from '../Interface/IUpdatable'

export class PeriodicUpdater implements IUpdatable {
  private interval: number
  private acc = 0
  private funcBinded: any
  constructor(interval: number, func: Function, context: any) {
    this.interval = interval
    this.funcBinded = func.bind(context)
  }
  update(dt: number): void {
    if (this.acc >= this.interval) {
      this.acc = 0
      this.funcBinded(dt)
    } else {
      this.acc += dt * 1000
    }
  }
}
