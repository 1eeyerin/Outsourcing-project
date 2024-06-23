import { css } from 'styled-components';

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1400
};

export const mobile = (styles) => css`
  @media (max-width: ${breakpoints.mobile}px) {
    ${styles}
  }
`;

export const tablet = (styles) => css`
  @media (max-width: ${breakpoints.tablet}px) {
    ${styles}
  }
`;

export const desktop = (styles) => css`
  @media (max-width: ${breakpoints.desktop}px) {
    ${styles}
  }
`;
