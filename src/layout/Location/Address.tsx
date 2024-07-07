import Icon from '@/components/Icon';
import { Caption, PointTitle } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import { faBusSimple, faCar, faCircle, faVanShuttle } from '@fortawesome/free-solid-svg-icons';

const Address = () => {
  return (
    <WayWrapper>
      <PointTitle>
        <Icon icon={faCar} />
        주차안내
      </PointTitle>
      <Divider />
      <Way>
        <Item>
          <ItemIcon icon={faCircle} size="xs" />
          <Caption>
            더시그니처클래스 웨딩홀 지상 주차장 <b>무료 주차</b>
            <br />
            (권선구청 및 권선구 보건소 무료 주차 가능)
          </Caption>
        </Item>
      </Way>
      <br />
      <PointTitle>
        <Icon icon={faVanShuttle} />
        셔틀버스 (수원역)
      </PointTitle>
      <Divider />
      <Way>
        <Item>
          <ItemIcon icon={faCircle} size="xs" />
          <Caption>첫 타임 기준 매시간 20, 40, 60분 3회 출발</Caption>
        </Item>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#0052A4" />
          <Caption>
            1호선, 열차 이용 시: 수원역 환승센터 버스 승강장 (2층 외부) &gt; 에스컬레이터 타고 1층
            (안내 간판) &gt; 롯데백화점 택시 승강장 맞은편 셔틀 이용
          </Caption>
        </Item>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#FABE00" />
          <Caption>
            {
              '수인선 이용 시: 환승센터(롯데백화점) 방향쪽 출구 > 에스컬레이터 타고 1층 외부 올라가기 (안내 간판) > 롯데백화점 택시 승강장 맞은편 셔틀 이용'
            }
          </Caption>
        </Item>
      </Way>
      <br />
      <PointTitle>
        <Icon icon={faBusSimple} />
        대중교통
      </PointTitle>
      <Divider />
      <Way>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#0052A4" />
          <Caption>
            수원역 7번 출구
            <br />
            88번 권선구청, 720-2 서부경찰서.권선구청 하차
          </Caption>
        </Item>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#0052A4" />
          <Caption>
            수원역 2층 환승센터 10번 승강장
            <br /> 11-1 권선구청.경기종합노동복지회관 하차
          </Caption>
        </Item>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#e53609" />
          <Caption>
            광역버스 [잠실환승센터 10번 승강장]
            <br /> 1009 서부경찰서.권선구청 하차
          </Caption>
        </Item>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#e53609" />
          <Caption>
            광역버스 [강남 5,6번 출구]
            <br />
            3003 서부경찰서.권선구청 하차
          </Caption>
        </Item>
        <Item>
          <ItemIcon icon={faCircle} size="xs" color="#e53609" />
          <Caption>
            광역버스 [사당 4번 출구] <br /> 7780 서부경찰서.권선구청 하차
          </Caption>
        </Item>
      </Way>
      <br />
    </WayWrapper>
  );
};

export default Address;

const WayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0px;
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
`;

const ItemIcon = styled(Icon)`
  margin-top: 3px;
`;
