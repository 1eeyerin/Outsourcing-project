import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Button';
import MenuList from '@/components/Menu/MenuList';
import supabase from '@/supabase/supabaseClient';

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const { data, error } = await supabase.from('menus').select('title, content, thumbnail, category').limit(4);

        if (error) throw new Error(error.message);

        setMenus(data);
      } catch (error) {
        console.error('Error loading menus:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMenus();
  }, []);

  if (isLoading) return null;

  return (
    <StContainer>
      <StMainSection>
        <StIntroSection>
          <StIntroText1>
            1943: 전통과 현대가
            <br />
            어우러진 공간
          </StIntroText1>
          <StIntroText2>
            1943 Drink, Laugh, and Immerse Yourself
            <br />
            in a Classic Atmosphere
          </StIntroText2>
          <Button href="/store" aria-label="Find Store">
            매장찾기
          </Button>
        </StIntroSection>
        <StIntroImage src="/images/main-feature-bg.png" alt="Intro" />
      </StMainSection>
      <StMenuSection>
        <StMenuHeader>
          <StMenuTitle>메뉴소개</StMenuTitle>
          <StMenuViewMore to="/menu">더보기</StMenuViewMore>
        </StMenuHeader>
        <StMenuListContainer>
          <MenuList menus={menus} />
        </StMenuListContainer>
      </StMenuSection>
      <StSpaceSection>
        <StSectionTitle>공간소개</StSectionTitle>
        <StSpaceImages>
          <StSpaceImage src="/images/main-space-1.png" alt="Space 1" />
          <StSpaceImage src="/images/main-space-2.png" alt="Space 2" />
          <StSpaceImage src="/images/main-space-3.png" alt="Space 3" />
        </StSpaceImages>
      </StSpaceSection>
    </StContainer>
  );
};

const spacing = {
  small: '20px',
  medium: '30px',
  large: '60px',
  xlarge: '75px',
  xxlarge: '230px'
};

const StContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${spacing.xlarge};
`;

const StMainSection = styled.section`
  width: 100%;
  height: 634px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${spacing.xlarge} auto;
`;

const StIntroSection = styled.div`
  margin: 0 ${spacing.large};
`;

const StIntroText1 = styled.h1`
  font-size: 48px;
  margin-bottom: 17px;
  line-height: 1.2;
`;

const StIntroText2 = styled.p`
  font-size: 16px;
  margin-bottom: 65px;
  line-height: 1.5;
`;

const StIntroImage = styled.img`
  height: 634px;
  object-fit: contain;
  margin-right: ${spacing.xlarge};
`;

const StMenuSection = styled.section`
  margin-bottom: ${spacing.xxlarge};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StMenuTitle = styled.h2`
  font-size: 24px;
`;

const StMenuViewMore = styled(Link)`
  font-size: 14px;
  color: #777777;
  cursor: pointer;
  text-decoration: none;
`;

const StMenuListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${spacing.medium};
`;

const StSpaceSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.medium};
  padding-bottom: 277px;
`;

const StSectionTitle = styled.h2`
  font-size: 24px;
`;

const StSpaceImages = styled.div`
  width: 100%;
  max-width: 1185px;
  height: 557px;
  display: flex;
  justify-content: space-between;
`;

const StSpaceImage = styled.img`
  flex: 1;
  margin: 0 ${spacing.small} 0 0;
  max-height: 100%;
`;

export default Home;
