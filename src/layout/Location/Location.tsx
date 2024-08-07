import Icon from '@/components/Icon.tsx';
import { Heading1 } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import { faBuilding, faCopy, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import data from 'data.json';
import { Flip, toast } from 'react-toastify';
import Address from './Address.tsx';
import Map from './Map.tsx';
import MapButtons from './MapButtons.tsx';

const Location = () => {
  const { mapInfo } = data;

  const handleCopy = () => {
    navigator.clipboard.writeText(mapInfo.address).then(() => {
      toast.dismiss();
      toast.success('주소가 복사되었습니다.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Flip,
      });
    });
  };

  return (
    <LocationWrapper>
      <Heading1>오시는 길 안내</Heading1>
      <br />
      <Map />
      <MapButtons />
      <AddressWrapper>
        <Icon icon={faLocationDot} color="#224f16" />
        <AddressTitle>{mapInfo.address}</AddressTitle>
        <CopyButton onClick={handleCopy}>
          <Icon icon={faCopy} size="lg" />
        </CopyButton>
      </AddressWrapper>
      <Divider />
      <AddressWrapper>
        <Icon icon={faBuilding} color="#224f16" />
        <AddressCaption>{mapInfo.location}</AddressCaption>
      </AddressWrapper>
      <br />
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
  background-color: rgba(250, 250, 250, 0.7);
  padding: 60px 20px;
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
  white-space: nowrap;
  padding: 10px 0;
`;

const Divider = styled.div`
  padding: 0;
  margin: auto;
  height: 1px;
  border-top: #7f7f7f dotted 1px;
  text-align: center;
  width: 90%;
`;

const CopyButton = styled.button`
  border: none;
  padding: 4px;
  cursor: pointer;
  gap: 6px;
  outline: none;
  box-shadow: none;
  background-color: rgba(250, 250, 250, 0.7);

  display: flex;

  text-decoration: none;
  outline: none;
`;

const AddressCaption = styled.p`
  text-align: center;
  font-family: Pretendard-Regular, sans-serif;
  margin: 0;
  font-size: 13px;
  white-space: pre-line;
`;
