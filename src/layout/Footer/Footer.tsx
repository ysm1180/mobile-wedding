import styled from '@emotion/styled';

const Footer = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: '성민 ♥ 예지의 결혼식에 초대합니다',
          text: '저희 두 사람의 소중한 시작을 함께해 주세요.',
          url: window.location.href,
        })
        .catch((error) => console.log('공유 실패:', error));
    } else {
      alert('공유 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <FooterWrapper>
      <ThanksContainer>
        <ThanksMessage>
          사랑과 정성으로 키워주신 양가 부모님과
          <br />
          늘 곁에서 아껴주신 모든 분께 감사합니다.
          <br />
          <br />
          저희의 감사한 마음 평생 잊지 않고
          <br />
          예쁘게 잘 살겠습니다.
        </ThanksMessage>
      </ThanksContainer>
      <ShareButton onClick={handleShare}>청첩장 공유하기</ShareButton>
      <br />
      <Copyright>© 2024 성민 & 예지. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: rgba(250, 249, 243, 0.7);
  text-align: center;
  border-top: 1px solid #e0e0e0;
  padding-bottom: 30px;
`;

const ThanksContainer = styled.div`
  padding: 20px 20px;
  margin-bottom: 30px;
  position: relative;
`;

const ThanksMessage = styled.p`
  font-size: 14px;
  color: #1f4913;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const ShareButton = styled.button`
  background-color: #1f4913;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c6b1a;
  }

  svg {
    margin-right: 8px;
  }
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #888;
`;

export default Footer;
