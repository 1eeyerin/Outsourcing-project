import { css } from 'styled-components';

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1400
};

export const mobile = (...style) => css`
  @media (max-width: ${breakpoints.mobile}px) {
    ${css(...style)}
  }
`;

export const tablet = (...style) => css`
  @media (max-width: ${breakpoints.tablet}px) {
    ${css(...style)}
  }
`;

export const desktop = (...style) => css`
  @media (max-width: ${breakpoints.desktop}px) {
    ${css(...style)}
  }
`;
