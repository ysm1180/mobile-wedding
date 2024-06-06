import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import ExpandMore from '@/assets/icons/expand_more.svg?react';

interface IAccordionProps {
  title: string;
  children: ReactNode;
  color: string;
}

const Accordion = ({ title, color, children }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionWrapper color={color}>
      <AccordionHeader color={color} isActive={isOpen} onClick={toggleAccordion} >
        <p>{title}</p>

        <span>
          <ExpandMore fill="white" />
        </span>
      </AccordionHeader>

      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionWrapper>
  );
};

export default Accordion;

const AccordionWrapper = styled.div<{color: string}>`
  font-family: RIDIBatang, sans-serif;
  border: ${(props) => `1px solid ${props.color}`};
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const AccordionHeader = styled.div<{ color:string; isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => `${props.color}`};
  padding: 0 15px;
  cursor: pointer;
  & > p {
    color: #44484d;
  }
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transition: all 0.3s ease;
    transform: ${(props) => (props.isActive ? 'rotate(180deg)' : undefined)};
  }
`;

const AccordionContent = styled.div`
  font-size: 14px;
  text-align: justify;
  padding: 10px 20px;
  background-color: #ffffff;
`;
