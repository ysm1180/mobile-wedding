import styled from '@emotion/styled';

export const Heading1 = styled.p`
  font-family: GowunBatang-Bold, sans-serif;
  font-size: 16px;
  margin: 10px;
  color: #1f4913;
  white-space: pre-line;
  font-weight: 600;
`;

export const Heading2 = styled.p`
  font-size: 1rem;
  margin: 10px;
  white-space: pre-line;
`;

export const PointTitle = styled.p`
  font-family: GowunBatang-Bold, sans-serif;
  font-weight: bold;
  line-height: 1;
  margin: 0;
  color: #333;
  white-space: pre-line;
  padding: 10px;
  font-weight: 600;
`;

export const Paragraph = styled.p`
  font-size: 15px;
  line-height: 2rem;
  white-space: pre-line;
`;

export const Caption = styled.p<{ textAlign?: string }>`
  margin: 0;
  font-size: 13px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  white-space: pre-line;
`;

export const ButtonCaption = styled.span`
  font-family: 'RIDIBatang', sans-serif;
  font-size: 12px;
`;
