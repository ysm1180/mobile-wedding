import Share from '@/assets/icons/share.svg?react';
import Icon from '@/components/Icon';
import styled from '@emotion/styled';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import data from 'data.json';
import JSConfetti from 'js-confetti';

declare namespace Kakao {
  namespace Share {
    export function sendDefault(data: {}): void;
  }
}

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const { emojis } = data;

  const handleCopy = () => {
    Kakao.Share.sendDefault({
      objectType: 'location',
      address: '경기 수원시 권선구 호매실로 46-16 2층',
      addressTitle: '더시그니처클래스',
      content: {
        title: '성민 🩷 예지, 결혼합니다!',
        description: '2024년 8월 31일 토요일 오후 1시 10분, 더시그니처클래스 2층',
        imageUrl: 'https://ysm1180.github.io/wedding/thumbnail.jpg',
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

  const handleCount = () => {
    void jsConfetti.addConfetti({ emojis });
  };

  const jsConfetti = new JSConfetti();

  return (
    <NavContainer isVisible={isVisible}>
      <NavButtonWrapper>
        <Button onClick={handleCount}>
          <Icon icon={faHeart} color="#c34070" />
        </Button>
        <Button onClick={handleCopy}>
          <Share fill="#ACC3E9" />
        </Button>
      </NavButtonWrapper>
    </NavContainer>
  );
};

export default FloatingBar;

const NavContainer = styled.nav<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;

const NavButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

const Button = styled.button`
  padding: 6px;
  border-radius: 50%;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`.withComponent('a');
