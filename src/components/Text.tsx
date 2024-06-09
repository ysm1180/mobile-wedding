import styled from '@emotion/styled';

export const Heading1 = styled.p`
  font-family: RIDIBatang, sans-serif;
  font-size: 18px;
  margin: 10px;
  color: #1f4913;
  white-space: pre-line;
`;

export const Heading2 = styled.p`
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
`;

export const PointTitle = styled.p`
  font-family: RIDIBatang, sans-serif;
  line-height: 1;
  margin: 0;
  color: #333;
  white-space: pre-line;
  padding: 10px;
  border-bottom: 1px solid black;
`;

export const Paragraph = styled.p`
  font-size: 15px;
  line-height: 2rem;
  white-space: pre-line;
`;

export const Caption = styled.p<{ textAlign?: string }>`
  font-weight: 200;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  white-space: pre-line;
`;
