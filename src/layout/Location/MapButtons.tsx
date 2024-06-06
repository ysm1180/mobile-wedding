import styled from '@emotion/styled';
import data from 'data.json';
import NaverMapIcon from '@/assets/icons/naver.png';
import KakaoMapIcon from '@/assets/icons/kakaomap.png'

const MapButtons = () => {
  const { naverMap, kakaoMap } = data.mapInfo;

  return (
    <MapButtonWrapper>
      <MapButton onClick={() => window.open(naverMap)}>
        <img src={NaverMapIcon} width={50} />
        <div>네이버지도</div>
      </MapButton>
      <MapButton onClick={() => window.open(kakaoMap)}>
        <img src={KakaoMapIcon} width={50} />
        <div>카카오맵</div>
      </MapButton>
    </MapButtonWrapper>
  );
};

export default MapButtons;

const MapButtonWrapper = styled.div`
  margin: 1rem;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const MapButton = styled.button`
  font-family: RIDIBatang, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  outline: 0;

  border: 0;

  background-color: white;
  cursor: pointer;

  gap: 0.5rem;
`;
