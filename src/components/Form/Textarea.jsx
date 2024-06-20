import { forwardRef } from 'react';
import styled from 'styled-components';

/**
 * Textarea 컴포넌트
 *
 * @param {string} className - 추가적인 CSS 클래스를 지정합니다.
 * @param {string} placeholder - 텍스트 영역의 플레이스홀더를 지정합니다.
 * @param {...Object} props - 추가적인 속성을 지정할 수 있습니다.
 *
 * @example
 * <Textarea placeholder="내용을 입력하세요" />
 */

const Textarea = forwardRef((props, ref) => {
  return <StTextarea {...props} ref={ref} />;
});

const StTextarea = styled.textarea`
  border: none;
  resize: none;
  outline: none;
  padding: 24px 32px;
  border-radius: 12px;
  background-color: #11151b;
  font-size: 18px;
  font-weight: 500;
  color: #c6c6c6;
  height: 250px;
  width: 100%;
  line-height: 140%;

  &[type='password']:not(:placeholder-shown) {
    font: small-caption;
    font-size: 34px;
  }
`;

Textarea.displayName = 'Textarea';

export default Textarea;
