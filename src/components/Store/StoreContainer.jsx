import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import styled, { css } from 'styled-components';
import { Typography } from '@/components/Typography';
import SectionTitle from '@/components/Typography/SectionTitle';
import { respondTo } from '@/styles/theme';
import iconSearch from '@/assets/icons/icon_search.svg';
import Loader from '../Loader';

const StoreContainer = () => {
  const [map, setMap] = useState(null);
  const [ps, setPs] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('1943');
  const [pagination, setPagination] = useState(null);
  const [searchedOnce, setSearchedOnce] = useState(false);

  const searchPlaces = (keyword) => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!');
      return;
    }

    if (!ps) {
      console.error('Kakao 지도 API가 로드되지 않았습니다.');
      return;
    }

    ps.keywordSearch(keyword, placesSearchCB);
  };

  const placesSearchCB = (data, status, paginationObj) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlacesList(data);
      setPagination(paginationObj);
      displayPlacesOnMap(data);
      setSearchedOnce(true);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      setPlacesList([]);
      setPagination(null);
      setSearchedOnce(true);
    } else {
      alert('검색 결과 중 오류가 발생했습니다.');
      setSearchedOnce(true);
    }
  };

  const displayPlacesOnMap = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    removeMarkers();

    places.forEach((place) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = addMarker(placePosition, place.place_name);
      bounds.extend(placePosition);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        map.panTo(marker.getPosition());
      });
    });

    map.setBounds(bounds);
  };

  const addMarker = (position, title) => {
    const imageSrc = 'https://ifh.cc/g/mBWY0S.png';
    const imageSize = new window.kakao.maps.Size(30, 30);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(30, 30),
      spriteOrigin: new window.kakao.maps.Point(0, 0),
      offset: new window.kakao.maps.Point(15, 30)
    };

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new window.kakao.maps.Marker({
      position,
      image: markerImage,
      title
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim()) {
        setSearchTerm(searchTerm.trim());
        setSearchedOnce(false);
        searchPlaces(searchTerm.trim());
      } else {
        alert('검색어를 입력하세요!');
      }
    }
  };

  const handleClickPlace = (index) => {
    const marker = markers[index];
    const position = marker.getPosition();

    map.panTo(position);

    const bounds = new window.kakao.maps.LatLngBounds();
    bounds.extend(position);
    map.setBounds(bounds);
  };

  useEffect(() => {
    const loadMap = () => {
      window.kakao.maps.load(() => {
        const mapInstance = new window.kakao.maps.Map(document.getElementById('map'), {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5
        });
        setMap(mapInstance);
        setPs(new window.kakao.maps.services.Places());
      });
    };

    loadMap();
  }, []);

  useEffect(() => {
    if (ps && searchTerm) {
      const debouncedSearch = debounce(searchPlaces, 1000);
      debouncedSearch(searchTerm);

      return () => {
        debouncedSearch.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ps, searchTerm]);

  return (
    <>
      <SectionTitle size="l" weight="700">
        매장찾기
      </SectionTitle>
      <StMapWrap>
        <Loader display css={loaderStyle} />
        <StMap id="map" />
        <StSearchBox>
          <StParagraph>찾으실 매장을 검색해주세요</StParagraph>
          <StForm onSubmit={(e) => e.preventDefault()}>
            <StInput
              type="text"
              id="keyword"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Search..."
            />
          </StForm>

          <StListBox>
            <>
              {searchedOnce && placesList.length === 0 && <StParagraph>검색 결과가 없습니다.</StParagraph>}
              <ul>
                {placesList.map((place, index) => (
                  <StItem key={index} onClick={() => handleClickPlace(index)}>
                    <Typography as="strong" size="s" color="#232323" weight="700">
                      {place.place_name}
                    </Typography>
                    <Typography as="p" size="xs" color="#b0b0b0">
                      {place.address_name}
                    </Typography>
                  </StItem>
                ))}
              </ul>
            </>

            {pagination && (
              <StPagination>
                {[...Array(pagination.last)].map((_, index) => (
                  <StButton key={index + 1} onClick={() => pagination.gotoPage(index + 1)} type="button">
                    {index + 1}
                  </StButton>
                ))}
              </StPagination>
            )}
          </StListBox>
        </StSearchBox>
      </StMapWrap>
    </>
  );
};

const StMapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 607px;
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;

  ${respondTo.mobile(css`
    height: auto;
    padding-bottom: 100px;
  `)}
`;

const StMap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;

  ${respondTo.mobile(css`
    position: relative;
    height: 300px;
  `)}
`;

const StSearchBox = styled.div`
  position: absolute;
  top: 56px;
  left: 44px;
  width: 332px;
  height: 446px;
  padding: 30px 0;
  border: 1px solid #eceef6;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.03);
  overflow: hidden;
  z-index: 9;

  ${respondTo.mobile(css`
    position: relative;
    top: -20px;
    left: unset;
    width: 100%;
    height: 100%;
    height: 300px;
  `)}
`;

const StParagraph = styled.p`
  line-height: 18px;
  color: #333333;
  font-size: 15px;
  font-weight: 700;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const StForm = styled.form`
  position: relative;
  height: 43px;
  padding: 0 20px;
`;

const StInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #eceef6;
  border-radius: 8px;
  padding: 8px 13px 8px 41px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  background: url(${iconSearch}) no-repeat 15px / 18px 18px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #c4c4c4;
    font-size: 16px;
  }
`;

const StListBox = styled.div`
  position: absolute;
  top: 135px;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #a8a8a8;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }
`;

const StItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const StPagination = styled.div`
  text-align: center;
`;

const StButton = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const loaderStyle = css`
  position: absolute;
`;

export default StoreContainer;
