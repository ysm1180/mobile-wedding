import KakaoMapIcon from '@/assets/icons/kakaomap.png';
import NaverMapIcon from '@/assets/icons/naver.png';
import TmapIcon from '@/assets/icons/tmap.svg';
import MapImage from '@/assets/images/map.png';
import Icon from '@/components/Icon';
import styled from '@emotion/styled';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import data from 'data.json';

const MapButtons = () => {
  const { naverMap, kakaoMap, tmap } = data.mapInfo;

  return (
    <MapIconWrapper>
      <MapButtonWrapper>
        <MapButton onClick={() => window.open(tmap)}>
          <img src={TmapIcon} width={42} />
          <div>TMAP</div>
        </MapButton>
        <MapButton onClick={() => window.open(naverMap)}>
          <img src={NaverMapIcon} width={42} />
          <div>네이버지도</div>
        </MapButton>
        <MapButton onClick={() => window.open(kakaoMap)}>
          <img src={KakaoMapIcon} width={42} />
          <div>카카오맵</div>
        </MapButton>
      </MapButtonWrapper>
      <MapButtonWrapper>
        <MapButton onClick={() => window.open(MapImage)}>
          <Icon icon={faMapLocationDot} color="#888" style={{ width: '42px', height: '42px' }} />
          <div>약도 이미지</div>
        </MapButton>
      </MapButtonWrapper>
    </MapIconWrapper>
  );
};

export default MapButtons;

const MapIconWrapper = styled.div`
  margin: 4px;
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const MapButtonWrapper = styled.div`
  margin: 8px 4px;
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

  background-color: rgba(250, 250, 250, 0.7);
  cursor: pointer;
  gap: 8px;

  font-size: 12px;
  white-space: nowrap;

  text-decoration: none;
`;
