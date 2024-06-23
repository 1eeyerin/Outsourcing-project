import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfiniteScroll from '@/components/InfiniteScroll';
import { MenuCategory, MenuList } from '@/components/Menu';
import SectionTitle from '@/components/Typography/SectionTitle';
import { useInfiniteFetchMenus } from '@/stores/queries/useMenuQueries';

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
      <MenuCategory selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
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
