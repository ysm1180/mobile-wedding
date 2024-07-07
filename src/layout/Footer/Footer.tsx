import KakaoTalkIcon from '@/assets/icons/kakao-talk-black.png';
import Icon from '@/components/Icon';
import styled from '@emotion/styled';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Flip, toast } from 'react-toastify';

declare namespace Kakao {
  namespace Share {
    export function sendDefault(data: {}): void;
  }
}

const Footer = () => {
  const handleShare = () => {
    Kakao.Share.sendDefault({
      objectType: 'location',
      address: '경기 수원시 권선구 호매실로 46-16 2층',
      addressTitle: '더시그니처클래스',
      content: {
        title: '성민 🩷 예지, 결혼합니다!',
        description: '2024년 8월 31일 토요일 오후 1시 10분, 더시그니처클래스 2층',
        imageUrl:
          'https://ysm1180.github.io/wedding/thumbnail.jpg',
        link: {
          mobileWebUrl: 'https://ysm1180.github.io/wedding/',
          webUrl: 'https://ysm1180.github.io/wedding/',
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: 'https://ysm1180.github.io/wedding/',
            webUrl: 'https://ysm1180.github.io/wedding/',
          },
        },
      ],
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('https://ysm1180.github.io/wedding').then(() => {
      toast.dismiss();
      toast.success('링크가 복사되었습니다.', {
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
    <FooterWrapper>
      <ThanksContainer>
        <ThanksMessage>
          사랑과 정성으로 키워주신 양가 부모님과
          <br />
          늘 곁에서 아껴주신 모든 분께 감사합니다.
          <br />
          <br />
          응원과 축하의 마음을 전해주신 모든 분들께도
          <br />
          진심으로 감사드립니다.
          <br />
          <br />
          감사한 마음 평생 잊지 않고
          <br />
          예쁘게 잘 살겠습니다.
        </ThanksMessage>
      </ThanksContainer>
      <ShareContainer>
        <ShareButton onClick={handleShare}>
          <img src={KakaoTalkIcon} width={25} />
          카카오톡 공유
        </ShareButton>
        <ShareButton onClick={handleCopy}>
          <Icon icon={faLink} />
          링크 복사
        </ShareButton>
      </ShareContainer>
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
  position: relative;
`;

const ThanksMessage = styled.p`
  font-family: GowunBatang-Regular, sans-serif;
  font-size: 13px;
  color: #1f4913;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const ShareButton = styled.button`
  font-family: RIDIBatang, sans-serif;
  background-color: #e6e7dc;
  color: #333;
  border: none;
  padding: 12px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  gap: 6px;
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #888;
`;

export default Footer;
