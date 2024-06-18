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
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    searchPlaces(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <Container>
      <input
        type="text"
        id="keyword"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearchClick}>검색</button>
      <div style={{ width: '100%', height: '400px' }}>
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ marginTop: '10px' }}>
        {placesList.length > 0 ? (
          placesList.map((place, index) => (
            <PlaceItem key={index} onClick={() => handleClickPlace(index)}>
              <h5>{place.place_name}</h5>
              <p>{place.address_name}</p>
            </PlaceItem>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
      {pagination && (
        <div style={{ marginTop: '10px' }}>
          {[...Array(pagination.last)].map((_, index) => (
            <button key={index + 1} onClick={() => pagination.gotoPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </Container>
  );
};

export default MapContainer;
