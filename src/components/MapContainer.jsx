import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StContainer = styled.div`
  height: 500px;
  padding: 56px 0;
  h2 {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 58px;
  }
`;

const StMapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 607px;
`;

const StMap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
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
  background-color: #fff;
  box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.03);
  overflow: hidden;
  z-index: 10;
  > p {
    color: #333;
    font-size: 15px;
    font-weight: 700;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  form {
    position: relative;
    height: 45px;
    padding: 0 20px;
    input {
      width: 100%;
      height: 100%;
      border: 1px solid #eceef6;
      border-radius: 8px;
      padding: 8px 13px;
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
      &:focus {
        outline: none;
      }
    }
    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }
`;
const StListBox = styled.div`
  position: absolute;
  top: 145px;
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  overflow-y: auto;
`;
const StItem = styled.li`
  padding: 24px;
  cursor: pointer;
  h5 {
    margin-bottom: 10px;
    color: #232323;
    font-size: 16px;
    font-weight: 700;
  }
  p {
    color: #b0b0b0;
    font-size: 13px;
  }
  &:hover {
    background-color: #f7f7f7;
  }
`;
const StPagination = styled.div`
  text-align: center;
  button {
    border: none;
    background-color: inherit;
    cursor: pointer;
  }
`;

const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [ps, setPs] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('1943');
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const loadMap = () => {
      window.kakao.maps.load(() => {
        const mapInstance = new window.kakao.maps.Map(document.getElementById('map'), {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3
        });
        setMap(mapInstance);
        setInfowindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
        setPs(new window.kakao.maps.services.Places());
      });
    };

    loadMap();
  }, []);

  useEffect(() => {
    if (ps && searchTerm) {
      searchPlaces(searchTerm);
    }
  }, [searchTerm, ps]);

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
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      setPlacesList([]);
    } else {
      alert('검색 결과 중 오류가 발생했습니다.');
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
        displayInfowindow(marker, place.place_name);
      });
    });

    map.setBounds(bounds);
  };

  const addMarker = (position, title) => {
    const imageSrc = 'https://ifh.cc/g/VVp1mZ.jpg';
    const imageSize = new window.kakao.maps.Size(50, 50);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(50, 50),
      spriteOrigin: new window.kakao.maps.Point(0, 0),
      offset: new window.kakao.maps.Point(25, 50)
    };

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage
    });

    marker.setMap(map);
    setMarkers((prevMarkers) => [...prevMarkers, marker]);

    return marker;
  };

  const displayInfowindow = (marker, title) => {
    infowindow.setContent(`<div style="padding:5px;z-index:1;">${title}</div>`);
    infowindow.open(map, marker);
  };

  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const handleClickPlace = (index) => {
    const marker = markers[index];
    map.panTo(marker.getPosition());
    displayInfowindow(marker, marker.getTitle());
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    searchPlaces(searchTerm);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearchClick();
  //   }
  // };
  return (
    <StContainer>
      <h2>매장찾기</h2>
      <StMapWrap>
        <StMap id="map" />
        <StSearchBox>
          <p>찾으실 매장을 검색해주세요</p>
          <form onSubmit={handleSearchClick}>
            <input
              type="text"
              id="keyword"
              value={searchTerm}
              onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
              placeholder="Search..."
            />
            <button type="submit">검색</button>
          </form>

          <StListBox>
            <ul>
              {placesList.length > 0 ? (
                placesList.map((place, index) => (
                  <StItem key={index} onClick={() => handleClickPlace(index)}>
                    <h5>{place.place_name}</h5>
                    <p>{place.address_name}</p>
                  </StItem>
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </ul>

            {pagination && (
              <StPagination style={{ marginTop: '10px' }}>
                {[...Array(pagination.last)].map((_, index) => (
                  <button key={index + 1} onClick={() => pagination.gotoPage(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </StPagination>
            )}
          </StListBox>
        </StSearchBox>
      </StMapWrap>
    </StContainer>
  );
};

export default MapContainer;
