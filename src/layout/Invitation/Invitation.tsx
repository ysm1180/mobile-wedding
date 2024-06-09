import styled from '@emotion/styled';
import data from 'data.json';
import Host from './Host.tsx';
import { Paragraph } from '@/components/Text.tsx';

const Invitation = () => {
  const { greeting } = data;
  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Divider />
      <Host />
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
