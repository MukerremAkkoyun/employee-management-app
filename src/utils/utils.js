// using by ViewportController
// used by ViewportController
export function getViewportClass() {
  const width = window.innerWidth;

  let deviceType = '';
  let viewportSize = '';

  switch (true) {
    case width >= 1400:
      deviceType = 'desktop';
      viewportSize = 'viewport-extra-extra-large';
      break;
    case width >= 1200:
      deviceType = 'desktop';
      viewportSize = 'viewport-extra-large';
      break;
    case width >= 992:
      deviceType = 'tablet';
      viewportSize = 'viewport-large';
      break;
    case width >= 768:
      deviceType = 'tablet';
      viewportSize = 'viewport-medium';
      break;
    case width >= 576:
      deviceType = 'mobile';
      viewportSize = 'viewport-small';
      break;
    default:
      deviceType = 'mobile';
      viewportSize = 'viewport-extra-small';
      break;
  }

  return `${deviceType} ${viewportSize}`;
}
