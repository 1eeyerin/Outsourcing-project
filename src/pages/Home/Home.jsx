import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useScrollToTop from '@/hooks/useScrollToTop';
import Button from '@/components/Button/Button';
import Header from '@/components/Layout/Header';
import MenuList from '@/components/Menu/MenuList';
import supabase from '@/supabase/supabaseClient';
import 'swiper/css/pagination';
import 'swiper/css';

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop();

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
    <>
      <Header css={headerStyle} />
      <StyledSwiper
        direction={'vertical'}
        spaceBetween={30}
        slidesPerView={1}
        mousewheel={true}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination]}
      >
        <SwiperSlide>
          <SlideWrapper>
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
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <StMenuSection>
              <StMenuHeader>
                <StMenuTitle>메뉴소개</StMenuTitle>
                <StMenuViewMore to="/menu">더보기</StMenuViewMore>
              </StMenuHeader>
              <StMenuListContainer>
                <MenuList menus={menus} />
              </StMenuListContainer>
            </StMenuSection>
          </SlideWrapper>
        </SwiperSlide>
        <SwiperSlide>
          <SlideWrapper>
            <StSpaceSection>
              <StSectionTitle>공간소개</StSectionTitle>
              <StSpaceImages>
                <StSpaceImage src="/images/main-space-1.png" alt="Space 1" />
                <StSpaceImage src="/images/main-space-2.png" alt="Space 2" />
                <StSpaceImage src="/images/main-space-3.png" alt="Space 3" />
              </StSpaceImages>
            </StSpaceSection>
          </SlideWrapper>
        </SwiperSlide>
      </StyledSwiper>
    </>
  );
};

const spacing = {
  small: '20px',
  medium: '30px',
  large: '60px',
  xlarge: '75px',
  xxlarge: '230px'
};

const headerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100vh;

  .swiper-pagination {
    display: none;
  }
`;

const SlideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StMainSection = styled.section`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StIntroSection = styled.div`
  width: 100%;
  margin-left: ${spacing.large};
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1400px;
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
  width: 1400px;
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
