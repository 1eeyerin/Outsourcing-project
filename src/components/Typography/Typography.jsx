import styled, { css } from 'styled-components';

const Typography = ({ as = 'h2', size = 'l', weight = 'regular', color = '#ffffff', ...props }) => {
  return <StTypograph as={as} $size={size} $weight={weight} $color={color} {...props} />;
};

const sizeStyles = {
  l: css`
    font-size: 24px;
  `,
  m: css`
    font-size: 20px;
  `,
  s: css`
    font-size: 16px;
  `,
  sm: css`
    font-size: 15px;
  `
};

const weightStyles = {
  b: css`
    font-weight: 700;
  `,
  m: css`
    font-weight: 500;
  `,
  r: css`
    font-weight: 400;
  `
};

const StTypograph = styled.h2`
  ${({ $size }) => sizeStyles[$size] || sizeStyles.s};
  ${({ $weight }) => weightStyles[$weight] || weightStyles.r};
  text-align: center;
  margin-bottom: 58px;
`;
export default Typography;
