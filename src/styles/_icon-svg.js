import {css} from 'lit';

export const IconSVG = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--c-orange-700, #ff6200);
  }
  svg {
    width: var(--icon-size, 24px);
    height: var(--icon-size, 24px);
    stroke: var(--icon-color, currentColor);
  }
`;
