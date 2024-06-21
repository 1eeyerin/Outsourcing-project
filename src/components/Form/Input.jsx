import { forwardRef } from 'react';
import styled from 'styled-components';

/**
 * Input 컴포넌트
 *
 * @param {string} type - 입력 필드의 타입을 지정합니다. 기본값은 'text'입니다.
 * @param {...Object} props - 추가적인 속성을 지정할 수 있습니다.
 *
 * @example
 * <Input type="email" placeholder="이메일을 입력하세요" />
 */

const Input = forwardRef(({ type = 'text', css, ...props }, ref) => {
  return <StInput type={type} $css={css} {...props} ref={ref} />;
});

const StInput = styled.input`
  border: none;
  outline: none;
  height: 70px;
  padding: 24px 32px;
  border-radius: 12px;
  background-color: #11151b;
  font-size: 18px;
  font-weight: 500;
  color: #c6c6c6;

  &[type='password']:not(:placeholder-shown) {
    font: small-caption;
    font-size: 34px;
  }

  ${(props) => props.css};
`;

Input.displayName = 'Input';

export default Input;
