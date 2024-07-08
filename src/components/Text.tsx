import styled from '@emotion/styled';

export const Heading1 = styled.p`
  font-family: GowunBatang-Bold, sans-serif;
  font-size: 16px;
  margin: 10px;
  color: #1f4913;
  white-space: pre-line;
  font-weight: 600;
`;

export const PointTitle = styled.p`
  font-family: GowunBatang-Bold, sans-serif;
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: #333;
  white-space: pre-line;
  padding: 10px;
  font-weight: 600;

  display: flex;
  flex-direction: row;

  gap: 6px;
`;

export const Paragraph = styled.p`
  font-size: 15px;
  line-height: 2rem;
  white-space: pre-line;
`;

export const Caption = styled.p<{ textAlign?: string }>`
  font-family: Pretendard-Regular, sans-serif;
  margin: 0;
  font-size: 14px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'start')};
  white-space: pre-line;
  word-break: keep-all;

  b {
    font-family: Pretendard-Bold, sans-serif;
  }
`;
