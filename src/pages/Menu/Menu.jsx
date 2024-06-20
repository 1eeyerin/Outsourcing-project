import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from '@/components/InfiniteScroll';
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
  const { data: menus = [], fetchNextPage, hasNextPage, isPending } = useInfiniteFetchMenus(selectedCategory, 4);

  const onCategoryChange = (category) => {
    navigate(`/menu/${category}`);
  };

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
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
        <MenuList menus={menus} />
      </InfiniteScroll>
    </StMenuContainer>
  );
};

const StMenuContainer = styled.div`
  height: 100%;
`;

export default Menu;
