import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/Button/Button';
import Header from '@/components/Layout/Header';
import MenuList from '@/components/Menu/MenuList';
import { Typography } from '@/components/Typography';
import { fetchLimitedMenus } from '@/supabase/menu';
import 'swiper/css/pagination';
import 'swiper/css';

const Home = () => {
  const [menuCount, setMenuCount] = useState(() => (window.innerWidth <= 768 ? 2 : 4));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setMenuCount(window.innerWidth <= 768 ? 2 : 4);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: menus, isPending } = useQuery({
    queryKey: ['fetchLimitedMenus', menuCount],
    queryFn: () => fetchLimitedMenus(menuCount),
    keepPreviousData: true
  });

  if (isPending) return null;

  return (
    <>
      <Header css={headerStyle} />
      <StyledSwiper
        direction={'vertical'}
        spaceBetween={30}
        slidesPerView={1}
        mousewheel={true}
        pagination={{ clickable: true }}
        speed={800}
        easing="ease-in-out"
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
                <StButton href="/store" aria-label="Find Store">
                  매장찾기
                </StButton>
              </StIntroSection>
              <StIntroImage src="/images/main-feature-bg.png" alt="Intro" />
            </StMainSection>
          </SlideWrapper>
        </SwiperSlide>
        {isMobile ? (
          <SwiperSlide>
            <SlideWrapper>
              <StMenuAndSpaceSection>
                <StMenuSection>
                  <StMenuHeader>
                    <Typography size="l" weight="500">
                      메뉴소개
                    </Typography>
                    <StMenuViewMore to="/menu">더보기</StMenuViewMore>
                  </StMenuHeader>
                  <StMenuListContainer>
                    <MenuList menus={menus} />
                  </StMenuListContainer>
                </StMenuSection>
                <StSpaceSection>
                  <Typography size="l" weight="500">
                    공간소개
                  </Typography>
                  <StSpaceImages>
                    <StSpaceImage src="/images/main-space-1.png" alt="Space 1" />
                    <StSpaceImage src="/images/main-space-2.png" alt="Space 2" />
                  </StSpaceImages>
                </StSpaceSection>
              </StMenuAndSpaceSection>
            </SlideWrapper>
          </SwiperSlide>
        ) : (
          <>
            <SwiperSlide>
              <SlideWrapper>
                <StMenuSection>
                  <StMenuHeader>
                    <Typography size="l" weight="500">
                      메뉴소개
                    </Typography>
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
                  <Typography size="l" weight="500">
                    공간소개
                  </Typography>
                  <StSpaceImages>
                    <StSpaceImage src="/images/main-space-1.png" alt="Space 1" />
                    <StSpaceImage src="/images/main-space-2.png" alt="Space 2" />
                    <StSpaceImage src="/images/main-space-3.png" alt="Space 3" />
                  </StSpaceImages>
                </StSpaceSection>
              </SlideWrapper>
            </SwiperSlide>
          </>
        )}
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StIntroSection = styled.div`
  margin: 0 ${spacing.xlarge};
  width: 100%;

  @media (max-width: 768px) {
    order: 2;
    margin: 0;
    padding: 0 ${spacing.small};
    margin-top: ${spacing.small};
  }
`;

const StIntroText1 = styled.h1`
  font-size: 48px;
  margin-bottom: 17px;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(60px);
  filter: blur(5px);
  transition: 0.8s ease-in-out;

  .swiper-slide-active & {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0px);
  }

  @media (max-width: 768px) {
    order: 3;
    font-size: 26px;
    font-weight: 400;
  }
`;

const StIntroText2 = styled.p`
  font-size: 16px;
  margin-bottom: 65px;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(60px);
  filter: blur(5px);
  transition: 0.8s 0.1s ease-in-out;

  .swiper-slide-active & {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0px);
  }

  @media (max-width: 768px) {
    order: 4;
    font-size: 13px;
    font-weight: 400;
  }
`;

const StIntroImage = styled.img`
  height: 634px;
  object-fit: contain;
  margin-right: ${spacing.large};
  opacity: 0;
  transform: translateY(30px);
  transition: 0.8s 0.3s ease-in-out;

  .swiper-slide-active & {
    opacity: 1;
    transform: translateY(0px);
  }

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    margin-bottom: 16px;
    aspect-ratio: 3/2;
    height: auto;
    object-fit: cover;
    padding: 0 ${spacing.small};
  }
`;

const StMenuSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1400px;
  padding: 0 ${spacing.medium};
`;

const StMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: space-between;
    width: 400px;
  }
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
  margin-top: 18px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 30%;
    height: 30%;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media (max-width: 1200px) {
    ul {
      grid-template-columns: repeat(2, 1fr);
    }

    li:nth-child(3),
    li:nth-child(4) {
      display: none;
    }
  }
`;

const StSpaceSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.medium};
  width: 1400px;
  margin-top: ${spacing.large};
`;

const StSpaceImages = styled.div`
  width: 100%;
  max-width: 1185px;
  height: 557px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    margin-top: 0px;
    max-width: 300px;
    justify-content: center;
    padding: 0 ${spacing.small};
  }
`;

const StSpaceImage = styled.img`
  flex: 1;
  margin: 0 ${spacing.small} 0 0;
  max-height: 100%;
  object-fit: cover;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 200px;
    margin: 10px 0;
  }
`;

const StButton = styled(Button)`
  opacity: 0;
  transform: translateY(30px);
  transition: 0.8s 0.2s ease-in-out;

  .swiper-slide-active & {
    opacity: 1;
    transform: translateY(0px);
  }

  @media (max-width: 768px) {
    order: 5;
    margin-top: 0px;
    width: 100%;
  }
`;

const StMenuAndSpaceSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 350px;
`;
export default Home;
