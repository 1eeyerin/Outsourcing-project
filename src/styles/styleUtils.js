import styled, { css } from 'styled-components';

export const ellipsisStyle = (line = 1) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
`;

export const e11yHidden = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
`;

export const StyledDivider = styled.div`
  width: 1px;
  height: ${({ $height }) => `${$height}px`};
`;
