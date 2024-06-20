import styled from '@emotion/styled';
import data from 'data.json';
import mainImg from '@/assets/images/main.jpg';
import connerIcon from '@/assets/icons/conner.png';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const [openInterview, setOpenInterview] = useState(false);
  const { greeting } = data;

  return (
    <MainBackground>
      <MainWrapper>
        <InterviewContainer onClick={() => setOpenInterview(true)}>
          <InterviewText>
            💕 두 사람의 <InterviewEmphasis>웨딩 이야기</InterviewEmphasis>를 확인해보세요!
          </InterviewText>
        </InterviewContainer>
        <OurName>
          <OurRole>신랑&nbsp;</OurRole>
          {greeting.groomName} | <OurRole>신부&nbsp;</OurRole>
          {greeting.brideName}
        </OurName>
        <SubTitle>
          저희 두 사람의 특별한 시작을
          <br />
          소중한 분들과 함께하고 싶습니다.
          <br />
          <br />
          2024. 08. 31 오후 1시 10분
          <br />
          더시그니처클래스 웨딩홀
        </SubTitle>
      </MainWrapper>
      {openInterview && (
        <MainPopup>
          <CloseButton onClick={() => setOpenInterview(false)}>
            <Icon icon={faClose} size="2x" />
          </CloseButton>
        </MainPopup>
      )}
    </MainBackground>
  );
};

export default Main;

const InterviewContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 15px;
  width: 300px;
  margin-left: -150px;
  height: 50px;
  line-height: 45px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  z-index: 10;
  outline: none;

  &:after {
    content: '';
    position: absolute;
    left: 236px;
    bottom: -17px;
    width: 29px;
    height: 19px;
    background: url(${connerIcon}) center no-repeat;
    background-size: 28px auto;

    opacity: 0.8;
  }

  @media (min-width: 1024px) {
    width: 500px;
    margin-left: -250px;

    &:after {
      background: none;
    }
  }
`;

const InterviewText = styled.p`
  font-size: 12px;
  padding: 3px 0 3px 0px;
  margin: 0;
  color: #9d7e5f;

  @media (min-width: 1024px) {
    font-size: 15px;
  }
`;

const InterviewEmphasis = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #1f4913;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const MainBackground = styled.div`
  display: flex;
  flex-direction: column;

  background:
    linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.5)),
    url(${mainImg}) no-repeat center center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: 50%;

  place-content: end;

  @media (min-width: 1024px) {
    background-position-y: 30%;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #222;
`;

const OurName = styled.div`
  font-family: RIDIBatang;
  font-size: 18px;
  line-height: 120%;
  white-space: pre-line;
  margin: 10px 0;

  @media (min-width: 1024px) {
    font-size: 22px;
  }
`;

const OurRole = styled.span`
  font-size: 14px;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const SubTitle = styled.div`
  font-family: GowunBatang-Regular;
  font-size: 14px;
  line-height: 140%;
  white-space: pre-line;
  margin: 10px 30px 30px 30px;
  color: #1f4913;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const MainPopup = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(250, 249, 243, 1);
  z-index: 20;
`;

const CloseButton = styled.button`
  position: fixed;
  right: 13px;
  top: 13px;
  background-color: transparent;
  border: none;
`;
