export class SpinnerService {
  constructor() {
    this.requests = 0;
  }

  attachComponent(component) {
    this.component = component;
    this.update();
  }

  up() {
    this.requests++;
    this.update();
  }

  down() {
    this.requests--;
    this.update();
  }

  update() {
    if (!this.component) return;
    if (this.requests) {
      this.component.show();
    } else {
      this.component.hide();
    }
  }
}
