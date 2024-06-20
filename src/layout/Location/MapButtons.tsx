import styled from '@emotion/styled';
import data from 'data.json';
import NaverMapIcon from '@/assets/icons/naver.png';
import KakaoMapIcon from '@/assets/icons/kakaomap.png';
import Icon from '@/components/Icon';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

const MapButtons = () => {
  const { naverMap, kakaoMap } = data.mapInfo;

  return (
    <MapButtonWrapper>
      <MapButton onClick={() => window.open(naverMap)}>
        <img src={NaverMapIcon} width={42} />
        <div>네이버지도</div>
      </MapButton>
      <MapButton onClick={() => window.open(kakaoMap)}>
        <img src={KakaoMapIcon} width={42} />
        <div>카카오맵</div>
      </MapButton>
      <MapButton onClick={() => window.open(kakaoMap)}>
        <Icon icon={faMapLocationDot} size="3x" color="#888" />
        <div>약도 이미지</div>
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

  outline: none;
  border: 0;

  background-color: white;
  cursor: pointer;

  gap: 0.5rem;
`;
