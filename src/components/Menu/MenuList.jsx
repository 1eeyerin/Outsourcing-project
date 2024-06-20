import styled from 'styled-components';
import MenuItem from './MenuItem';

const MenuList = ({ menus }) => {
  if (!menus) return null;

  return (
    <StMenuList>
      {menus.map((menu, index) => (
        <MenuItem key={index} menu={menu} />
      ))}
    </StMenuList>
  );
};

const StMenuList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 28px;
  justify-content: center;
  gap: 20px 13px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

export default MenuList;
