import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MenuCategory, MenuList } from '@/components/Menu';
import SectionTitle from '@/components/Typography/SectionTitle';
import { useInfiniteFetchMenus } from '@/stores/queries/useMenuQueries';

const categories = [
  { value: 'all', label: '전체' },
  { value: 'stirfryEasyDishes', label: '볶음&간단' },
  { value: 'soup', label: '탕' },
  { value: 'friedFoods', label: '튀김' },
  { value: 'fruitsDesserts', label: '과일&디저트' }
];

const Menu = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const { data: menus = [], fetchNextPage, hasNextPage, isPending } = useInfiniteFetchMenus(selectedCategory);

  const onCategoryChange = (category) => {
    navigate(`/menu/${category}`);
  };

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  if (isPending) return;

  return (
    <StMenuContainer>
      <SectionTitle size="l" weight="700">
        메뉴소개
      </SectionTitle>
      <MenuCategory categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
      <MenuList menus={menus} />
      <StInView ref={ref} />
    </StMenuContainer>
  );
};

const StMenuContainer = styled.div`
  height: 100%;
`;

const StInView = styled.div`
  height: 20px;
`;

export default Menu;
