import styled from 'styled-components';

const StContainer = styled.div`
  max-width: 1400px;
`;

const StMainSection = styled.section`
  width: 100%;
  height: 634px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 75px auto 230px;
`;

const StIntroSection = styled.div`
  margin: 0 78px 0;
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
  margin-right: 60px;
`;

const StFindStoreButton = styled.button`
  font-size: 14px;
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

const StMenuSection = styled.section`
  margin-bottom: 230px;
`;

const StMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StMenuTitle = styled.h2`
  font-size: 24px;
`;

const StMenuViewMore = styled.p`
  font-size: 14px;
  color: #999;
  cursor: pointer;
`;

const StSpaceSection = styled.section`
  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding-bottom: 277px;
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
  margin: 0 30px 0 0;
  max-height: 100%;
`;

const Home = () => {
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
          <StFindStoreButton>매장찾기</StFindStoreButton>
        </StIntroSection>
        <StIntroImage src="/images/main-feature-bg.png" alt="Intro" />
      </StMainSection>
      <StMenuSection id="menu">
        <StMenuHeader>
          <StMenuTitle>메뉴소개</StMenuTitle>
          <StMenuViewMore>더보기</StMenuViewMore>
        </StMenuHeader>
      </StMenuSection>
      <StSpaceSection id="space">
        <h2>공간소개</h2>
        <StSpaceImages>
          <StSpaceImage src="/images/main-space-1.png" alt="Space 1" />
          <StSpaceImage src="/images/main-space-2.png" alt="Space 2" />
          <StSpaceImage src="/images/main-space-3.png" alt="Space 3" />
        </StSpaceImages>
      </StSpaceSection>
    </StContainer>
  );
};

export default Home;
