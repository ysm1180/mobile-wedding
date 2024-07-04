import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import ExpandMore from '@/assets/icons/expand_more.svg?react';
import WeddingIcon from '@/assets/icons/wedding.png';

interface IAccordionProps {
  title: string;
  children: ReactNode;
  color: string;
  backgroundColor: string;
}

const Accordion = ({ title, color, backgroundColor, children }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionWrapper color={color}>
      <AccordionHeader
        color={color}
        backgroundColor={backgroundColor}
        isActive={isOpen}
        onClick={toggleAccordion}>
        <AccordionTitle>{title}</AccordionTitle>
        <span>
          <ExpandMore fill={color} />
        </span>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionWrapper>
  );
};

export default Accordion;

const AccordionWrapper = styled.div<{ color: string }>`
  font-family: GowunBatang-Regular, sans-serif;
  border: ${(props) => `1px solid ${props.color}`};
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const AccordionHeader = styled.div<{ backgroundColor: string; color: string; isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => `${props.backgroundColor}`};
  padding: 0 15px;
  font-size: 13px;
  color: ${(props) => `${props.color}`};
  background-image: url(${WeddingIcon});
  background-repeat: no-repeat;
  background-position: 16px;
  background-size: 16px;
  cursor: pointer;
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: all 0.3s ease;
    transform: ${(props) => (props.isActive ? 'rotate(180deg)' : undefined)};
  }
`;

const AccordionTitle = styled.p`
  padding-left: 25px;
  font-weight: bold;
  font-family: RIDIBatang, sans-serif;
`;

const AccordionContent = styled.div`
  font-size: 14px;
  text-align: justify;
  padding: 10px 20px;
  background-color: #ffffff;
`;
