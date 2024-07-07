import Share from '@/assets/icons/share.svg?react';
import Icon from '@/components/Icon';
import styled from '@emotion/styled';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import data from 'data.json';
import JSConfetti from 'js-confetti';

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const { emojis } = data;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        alert('주소가 복사되었습니다.😉😉');
      },
      () => {
        alert('주소 복사에 실패했습니다.🥲🥲');
      },
    );
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
          {/*{count || ''}*/}
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
