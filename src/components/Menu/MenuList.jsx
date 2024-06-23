import styled, { css } from 'styled-components';
import { respondTo } from '@/styles/theme';
import MenuItem from './MenuItem';

const MenuList = ({ menus }) => {
  if (!menus) return null;

  return (
    <StMenuList>
      {menus.map((menu, index) => (
        <MenuItem as="li" key={index} menu={menu} />
      ))}
    </StMenuList>
  );
};

const StMenuList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 28px;
  justify-content: center;
  gap: 20px 13px;

  ${respondTo.tablet(css`
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  `)}
`;

export default MenuList;
