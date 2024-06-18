import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MenuList } from '@/components/Menu';
import { useFetchMenus } from '@/stores/queries/useMenuQueries';

const Menu = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const { data: menus } = useFetchMenus(selectedCategory);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
  }, [category]);

  const handleCategoryClick = (category) => {
    navigate(`/menu/${category}`);
  };

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'stirfryEasyDishes', label: '볶음&간단' },
    { value: 'soup', label: '탕' },
    { value: 'friedFoods', label: '튀김' },
    { value: 'fruitsDesserts', label: '과일&디저트' }
  ];

  return (
    <div>
      <StCategoryList>
        {categories.map((category) => (
          <StCategoryItem
            key={category.value}
            selected={selectedCategory === category.value}
            onClick={() => handleCategoryClick(category.value)}
          >
            {category.label}
          </StCategoryItem>
        ))}
      </StCategoryList>
      <MenuList menus={menus} />
    </div>
  );
};

export default Menu;

const StCategoryList = styled.ul`
  display: flex;
  gap: 10px;
`;

const StCategoryItem = styled.li`
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  padding: 5px 10px;
  border-radius: 5px;
`;
