import MenuItem from './MenuItem';

const MenuList = ({ menus }) => {
  return <div>{menus && menus.map((menu, index) => <MenuItem key={index} menu={menu} />)}</div>;
};

export default MenuList;
