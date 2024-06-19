import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { darkenHex } from '@/styles/utils';

/**
 * Button 컴포넌트
 *
 * @param {string} className - 추가적인 CSS 클래스를 지정합니다.
 * @param {string} [type='button'] - 버튼의 타입을 지정합니다. 기본값은 'button'입니다.
 * @param {string} [variant='default'] - 버튼의 스타일 변형을 지정합니다. 기본값은 'default'입니다.
 * @param {boolean} [fullWidth=false] - 버튼이 전체 너비를 차지할지 여부를 지정합니다. 기본값은 false입니다.
 * @param {boolean} [rounded=false] - 버튼의 모서리를 둥글게 할지 여부를 지정합니다. 기본값은 false입니다.
 * @param {string} href - 링크로 사용할 경우, 링크의 URL을 지정합니다.
 * @param {...Object} props - 추가적인 속성을 지정할 수 있습니다.
 *
 * @example
 * <Button variant="rounded" fullWidth>Click Me</Button>
 */

const Button = forwardRef(
  ({ className, type = 'button', variant = 'default', fullWidth = false, rounded = false, href, ...props }, ref) => {
    const StyledComponent = href ? StLink : StButton;
    const buttonProps = href ? { to: href, ...props } : { type, ...props };

    return (
      <StyledComponent
        ref={ref}
        className={className}
        $variant={variant}
        $fullWidth={fullWidth}
        $rounded={rounded}
        {...buttonProps}
      />
    );
  }
);

const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 700;
  height: 50px;
  padding: 10px 24px;
  transition: 0.15s ease-in-out;
  color: #000000;
  background-color: #ffffff;

  &:hover {
    background-color: ${darkenHex('#ffffff', 10)};
    transform: scale(0.99);
  }
`;

const variantStyles = {
  default: css`
    width: 190px;
  `,
  rounded: css`
    border-radius: 12px;
  `
};

const StButton = styled.button`
  ${baseStyles}
  ${(props) => variantStyles[props.$variant] || variantStyles.default}
  ${(props) => props.$fullWidth && 'width: 100%;'}
`;

const StLink = styled(Link)`
  ${baseStyles}
  ${(props) => variantStyles[props.$variant] || variantStyles.default}
  ${(props) => props.$fullWidth && 'width: 100%;'}
`;

Button.displayName = 'Button';

export { Button };
