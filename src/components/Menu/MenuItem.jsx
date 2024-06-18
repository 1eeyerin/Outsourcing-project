const MenuItem = ({ menu }) => (
  <div>
    {menu.thumbnail && <img src={menu.thumbnail} alt={menu.title} style={{ maxWidth: '100px' }} />}
    <h3>{menu.title}</h3>
    <p>{menu.content}</p>
  </div>
);

export default MenuItem;
