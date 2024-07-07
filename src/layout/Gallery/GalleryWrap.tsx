import ExpandMore from '@/assets/icons/expand_more.svg?react';
import { Heading1 } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import { useState } from 'react';
import PhotoGallery from './PhotoGallery.tsx';
const GalleryWrap = () => {
  const [isMoreView, setIsMoreView] = useState(false);

  const onClickImageMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  return (
    <ContentsWrap>
      <Heading1>Gallery</Heading1>
      <br />
      <ImageMoreWrap isMoreView={isMoreView}>
        {!isMoreView && <WhiteGradientOverlay />}
        <PhotoGallery />
      </ImageMoreWrap>
      {!isMoreView && (
        <PlusButton onClick={onClickImageMoreViewButton}>
          사진 더보기
          <ExpandMore fill={'black'} />
        </PlusButton>
      )}
    </ContentsWrap>
  );
};

export default GalleryWrap;

const ContentsWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgba(250, 250, 250, 0.7);
  padding: 60px 0;
`;

const ImageMoreWrap = styled.div<{ isMoreView: boolean }>`
  position: relative;
  max-height: ${(props) => (props.isMoreView ? '' : '30vh')};
  overflow: hidden;
`;

const WhiteGradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(250, 250, 250) 70%);
`;

const PlusButton = styled.div`
  box-sizing: border-box;
  padding: 6px 12px;
  font-size: 1rem;
  align-items: center;
  color: #1f4a14;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;
