import styled from 'styled-components';
import MenuItem from './MenuItem';

const MenuList = ({ menus }) => {
  return <StyledMenuList>{menus && menus.map((menu, index) => <MenuItem key={index} menu={menu} />)}</StyledMenuList>;
};

export default MenuList;

const StyledMenuList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
