import styled from 'styled-components';
import MenuItem from './MenuItem';

const MenuList = ({ menus }) => {
  return <StMenuList>{menus && menus.map((menu, index) => <MenuItem key={index} menu={menu} />)}</StMenuList>;
};

const StMenuList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 28px;
  gap: 13px;
`;

export default MenuList;
