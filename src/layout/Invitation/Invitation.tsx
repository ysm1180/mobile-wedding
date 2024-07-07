import { Paragraph } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import data from 'data.json';
import Calendar from './Calendar.tsx';
import Countdown from './Countdown.tsx';
import Host from './Host.tsx';

const Invitation = () => {
  const { greeting } = data;
  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Divider />
      <Host />
      <Calendar weddingDate="2024-08-31" />
      <Countdown weddingDate="2024-08-31T13:10:00+09:00" />
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  background-color: rgba(250, 249, 243, 0.7);
  color: #1f4913;

  padding: 50px 20px;
`;

const Divider = styled.div`
  padding: 0;
  margin: 0;
  height: 1px;
  border-top: #7f7f7f solid 1px;
  text-align: center;
  width: 80%;
`;
