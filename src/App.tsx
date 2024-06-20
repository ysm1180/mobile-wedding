import { useEffect, useRef, useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import Wrapper from '@/components/Wrapper.tsx';
import Account from '@/layout/Account/Account.tsx';
import Container from '@/layout/Container.tsx';
import FloatingBar from '@/layout/FloatingBar/FloatingBar.tsx';
import GalleryWrap from '@/layout/Gallery/GalleryWrap.tsx';
import Guestbook from '@/layout/Guestbook/Guestbook.tsx';
import Invitation from '@/layout/Invitation/Invitation.tsx';
import Location from '@/layout/Location/Location.tsx';
import Main from '@/layout/Main/Main.tsx';
import styled from '@emotion/styled';
import Contact from './layout/Contact/Contact';

const TitleWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #222;
  overflow: auto;
  height: 100vh;
`;

function App() {
  const ncpClientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const checkScrollPosition = () => {
    if (ref.current) {
      const { offsetTop } = ref.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  return (
    <NavermapsProvider ncpClientId={ncpClientId}>
      <Container>
        <TitleWrapper>
          <Main />
        </TitleWrapper>
        <Invitation />
        <GalleryWrap />
        <Contact />
        <Wrapper ref={ref}>
          <Account />
        </Wrapper>
        <Location />
          <Guestbook />
        <FloatingBar isVisible={isVisible} />
      </Container>
    </NavermapsProvider>
  );
}

export default App;
