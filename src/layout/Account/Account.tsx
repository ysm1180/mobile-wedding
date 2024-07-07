import Accordion from '@/components/Accordion.tsx';
import { Heading1 } from '@/components/Text.tsx';
import styled from '@emotion/styled';
import data from 'data.json';
import AccountWrap from './AccountWrap.tsx';

const Account = () => {
  const { hostInfo } = data;
  return (
    <AccountInfoWrapper>
      <Heading1>마음 전하실 곳</Heading1>
      <br />
      <AccountInfoDetails>
        저희 두 사람의 소중한 시작을
        <br />
        함께해 주시는 모든 분들께 감사드리며,
        <br />
        전해주시는 따뜻한 진심을 배워
        <br />
        오래도록 행복하게 잘 살겠습니다.
      </AccountInfoDetails>
      {hostInfo.map((host) => {
        return (
          <Accordion
            title={host.host}
            key={host.host}
            color={host.color}
            backgroundColor={host.backgroundColor}>
            {host.accountInfo.map((account) => {
              return (
                <AccountWrap
                  key={account.name}
                  name={account.name}
                  relation={account.relation}
                  bank={account.bank}
                  account={account.account}
                  kakaopayAccount={account.kakaopayAccount}
                  tossAccount={account.tossAccount}
                />
              );
            })}
          </Accordion>
        );
      })}
    </AccountInfoWrapper>
  );
};

export default Account;

const AccountInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 20px;

  background-color: rgba(250, 249, 243, 0.7);
  color: #1f4913;
`;

const AccountInfoDetails = styled.div`
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 40px;
  color: #222;

  font-family: GowunBatang-Regular, sans-serif;
`;
