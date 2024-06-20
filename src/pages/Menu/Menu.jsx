import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MenuCategory, MenuList } from '@/components/Menu';
import { useFetchMenus } from '@/stores/queries/useMenuQueries';

const Menu = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const { data: menus } = useFetchMenus(selectedCategory);

  const onCategoryChange = (category) => {
    navigate(`/menu/${category}`);
  };

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'stirfryEasyDishes', label: '볶음&간단' },
    { value: 'soup', label: '탕' },
    { value: 'friedFoods', label: '튀김' },
    { value: 'fruitsDesserts', label: '과일&디저트' }
  ];
  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  return (
    <StMenuContainer>
      <StMenuTitle>메뉴소개</StMenuTitle>
      <MenuCategory categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
      <MenuList menus={menus} />
    </StMenuContainer>
  );
};

const StMenuContainer = styled.div`
  margin-top: 80px;
  height: 100%;
`;
const StMenuTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 84px;
  text-align: center;
`;

export default Menu;
