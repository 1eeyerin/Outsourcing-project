import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
`;

const PlaceItem = styled.div`
  margin: 3px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [ps, setPs] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('1943');
  const [searchKeyword, setSearchKeyword] = useState('1943');
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapInstance = new window.kakao.maps.Map(document.getElementById('map'), {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3
      });
      setMap(mapInstance);

      const infowindowInstance = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      setInfowindow(infowindowInstance);

      const psInstance = new window.kakao.maps.services.Places();
      setPs(psInstance);
    });
  }, []);

  useEffect(() => {
    if (!ps) return;
    // // 초기 검색으로 "1943" 검색
    searchPlaces('1943');
  }, [ps]);

  useEffect(() => {
    if (ps && searchKeyword) {
      searchPlaces(searchKeyword);
    }
  }, [searchKeyword, ps]);

  const searchPlaces = (keyword) => {
    if (!keyword) {
      alert('키워드를 입력해주세요!');
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
      setPagination(paginationObj);

      // 검색 결과를 초기화하고 새로운 결과를 표시
      setPlacesList(
        data.map((place, index) => (
          <PlaceItem key={index} onClick={() => handleClickPlace(index)}>
            <h5>{place.place_name}</h5>
            <p>{place.address_name}</p>
          </PlaceItem>
        ))
      );

      // 검색된 장소들을 지도에 표시
      displayPlacesOnMap(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const displayPlacesOnMap = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    removeMarkers();

    places.forEach((place, index) => {
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
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchKeyword(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleLoadMore = () => {
    if (pagination && pagination.hasNextPage) {
      pagination.next();
    }
  };

  return (
    <Container>
      <input type="text" id="keyword" value={searchTerm} onChange={handleInputChange} onKeyPress={handleKeyPress} />
      <button onClick={handleSearchClick}>검색</button>
      <div style={{ width: '100%', height: '400px' }}>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ marginTop: '10px' }}>
        {placesList}
        {pagination && pagination.hasNextPage && <button onClick={handleLoadMore}>더 보기</button>}
      </div>
    </Container>
  );
};

export default MapContainer;
