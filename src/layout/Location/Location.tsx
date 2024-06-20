import styled from '@emotion/styled';
import data from 'data.json';
import Address from './Address.tsx';
import Map from './Map.tsx';
import MapButtons from './MapButtons.tsx';
import { Caption, Heading1 } from '@/components/Text.tsx';
import Icon from '@/components/Icon.tsx';
import { faLocationDot, faBuilding, faCopy } from '@fortawesome/free-solid-svg-icons';

const Location = () => {
  const { mapInfo } = data;
  return (
    <LocationWrapper>
      <br />
      <br />
      <Heading1>오시는 길 안내</Heading1>
      <br />
      <Map />
      <MapButtons />
      <AddressWrapper>
        <Icon icon={faLocationDot} color="#224f16" />
        <AddressTitle>{mapInfo.address}</AddressTitle>
        <CopyButton>
          <Icon icon={faCopy} />
        </CopyButton>
      </AddressWrapper>
      <Divider />
      <AddressWrapper>
        <Icon icon={faBuilding} color="#224f16" />
        <Caption textAlign="center">{mapInfo.location}</Caption>
      </AddressWrapper>
      <br />
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

const AddressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const AddressTitle = styled.p`
  font-family: SF_HambakSnow, sans-serif;
  font-weight: bold;
  line-height: 1;
  margin: 0;
  color: #333;
  white-space: pre-line;
  padding: 10px 0;
`;

const Divider = styled.div`
  padding: 0;
  margin: auto;
  height: 1px;
  border-top: #7f7f7f dotted 1px;
  text-align: center;
  width: 80%;
`;

const CopyButton = styled.button`
  border: none;
  padding: 4px;
  cursor: pointer;
  gap: 4px;
  outline: none;
  box-shadow: none;
  background: white;
`;
