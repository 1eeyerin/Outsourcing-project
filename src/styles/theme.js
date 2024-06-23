import * as mediaQueries from './mediaQueries';

export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff'
  }
};

export const respondTo = {
  mobile: mediaQueries.mobile,
  tablet: mediaQueries.tablet,
  desktop: mediaQueries.desktop
};
