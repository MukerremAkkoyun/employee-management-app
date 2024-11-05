import {getViewportClass} from '../utils/utils';

/*

Using the viewport controller to manage responsive classes

*/

export class ViewportController {
  host;
  viewportClass = '';

  constructor(host) {
    this.host = host;
    this.host.addController(this);
    this.updateViewportClass();
    window.addEventListener('resize', this.updateViewportClass.bind(this));
  }

  updateViewportClass() {
    const newClass = getViewportClass();
    if (this.viewportClass !== newClass) {
      this.viewportClass = newClass;
      this.host.requestUpdate(); // Notify the host to update
    }
  }

  hostDisconnected() {
    window.removeEventListener('resize', this.updateViewportClass.bind(this));
  }
}
