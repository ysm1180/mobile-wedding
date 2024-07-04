import styled from '@emotion/styled';
import data from 'data.json';
import { Caption, PointTitle } from '@/components/Text.tsx';
import { ILocationInfo } from '@/types/data.ts';
import Icon from '@/components/Icon';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Address = () => {
  const { locationInfo } = data;
  return (
    <WayWrapper>
      {locationInfo?.map((item: ILocationInfo) => {
        const { title, desc } = item;
        return (
          <>
            <PointTitle>{title}</PointTitle>
            <Divider />
            <Way>
              {desc.map((text) => {
                return (
                  <Item>
                    <ItemIcon icon={faCircle} size="xs" />
                    <Caption>{text}</Caption>
                  </Item>
                );
              })}
            </Way>
            <br />
          </>
        );
      })}
    </WayWrapper>
  );
};

export default Address;

const WayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0px;
  padding: 20px;
  background-color: rgba(250, 250, 250, 0.7);
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 10px;
  gap: 5px;
`;

const Divider = styled.div`
  padding: 0;
  margin: auto;
  height: 1px;
  border-top: #e0e0e0 solid 1px;
  text-align: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Item = styled.div`
  display: flex;
  gap: 8px;
`

const ItemIcon = styled(Icon)`
  margin-top: 3px;
`