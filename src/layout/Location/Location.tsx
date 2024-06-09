import styled from '@emotion/styled';
import data from 'data.json';
import Address from './Address.tsx';
import Map from './Map.tsx';
import MapButtons from './MapButtons.tsx';
import { Caption, Heading1, PointTitle } from '@/components/Text.tsx';

const Location = () => {
  const { mapInfo } = data;
  return (
    <LocationWrapper>
      <br />
      <br />
      <Heading1>오시는 길</Heading1>
      <PointTitle>{mapInfo.address1}</PointTitle>
      <Caption textAlign={'right'}>{mapInfo.address2}</Caption>
      <Map />
      <MapButtons />
      <Address />
    </LocationWrapper>
  );
};

export default Location;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
`;
