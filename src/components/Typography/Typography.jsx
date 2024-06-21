import styled, { css } from 'styled-components';

const Typography = ({ as = 'p', size = 'l', weight = '400', color = '#ffffff', ...props }) => {
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
  xs: css`
    font-size: 15px;
  `
};

const StTypograph = styled.p`
  ${({ $size }) => sizeStyles[$size] || sizeStyles.s};
  font-weight: ${({ $weight }) => $weight};
  color: ${({ $color }) => $color};
`;

export default Typography;
