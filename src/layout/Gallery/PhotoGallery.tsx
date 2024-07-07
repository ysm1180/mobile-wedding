import images from '@/layout/Gallery/Images.ts';
import 'photoswipe/style.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PhotoGallery = () => {
  const smallItemStyles: React.CSSProperties = {
    cursor: 'pointer',
    objectFit: 'contain',
    width: '100px',
    height: '150px',
  };

  return (
    <Gallery
      options={{
        arrowNext: false,
        arrowPrev: false,
        zoom: false,
        wheelToZoom: false,
        maxZoomLevel: 1,
      }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 0fr)',
          gridGap: 4,
        }}>
        {images.map((image, index) => {
          return (
            <Item
              key={index}
              cropped
              original={image.source}
              thumbnail={image.source}
              width="537"
              height="805">
              {({ ref, open }) => (
                <img
                  style={smallItemStyles}
                  alt={image.alt}
                  src={image.source}
                  ref={ref as React.MutableRefObject<HTMLImageElement>}
                  onClick={open}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;
