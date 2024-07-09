import Copy from '@/assets/icons/copy.svg?react';
import kakaopay from '@/assets/icons/kakaopay.png?url';
import toss from '@/assets/icons/toss.png?url';
import styled from '@emotion/styled';
import { Flip, toast } from 'react-toastify';

interface IAccountProps {
  name: string;
  relation: string;
  bank: string;
  account: string;
  kakaopayAccount?: string;
  tossAccount?: string;
}
const AccountWrap = ({
  name,
  relation,
  bank,
  account,
  kakaopayAccount,
  tossAccount,
}: IAccountProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(account).then(() => {
      toast.dismiss();
      toast.success(`${account} 계좌번호가 복사되었습니다.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Flip,
      });
    });
  };

  return (
    <Wrapper>
      <Info>
        <Relation>{relation}</Relation>
        <Name>{name}</Name>
      </Info>
      <Details>
        <AccountInfo>
          {bank} | {account}
        </AccountInfo>
        <CopyButton onClick={handleCopy}>
          <Copy fill="#dfdfdf" />
          복사
        </CopyButton>
      </Details>
      <AccountLinks>
        {kakaopayAccount && (
          <AccountButton href={kakaopayAccount} target="_blank" rel="noreferrer">
            <KakaopayImg src={kakaopay} alt="kakaopay" />
          </AccountButton>
        )}
        {tossAccount && (
          <AccountButton href={tossAccount} target="_blank" rel="noreferrer">
            <TossImg src={toss} alt="toss" />
          </AccountButton>
        )}
      </AccountLinks>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: GowunBatang-Regular, sans-serif;
  padding: 10px 0;
  border-bottom: 1px solid #dfdfdf;
  &:last-of-type {
    margin-bottom: 0;
    border-bottom: none;
  }
  display: flex;
  flex-direction: column;
`;

const Info = styled.div`
  height: inherit;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 5px 0;
  color: #44484d;
`;

const Relation = styled.span`
  font-family: GowunBatang-Bold, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #44484d;
`;

const Name = styled.span`
  font-family: GowunBatang-Regular, sans-serif;
  font-size: 14px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AccountInfo = styled.div`
  color: black;
`;

const CopyButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.1em 0.2em;
  cursor: pointer;
  gap: 2px;
  outline: none;
  box-shadow: none;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: GowunBatang-Regular, sans-serif;
`;

const AccountLinks = styled.div`
  display: flex;
  width: 100%;
  gap: 2px;
`;

const AccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  margin: 5px 0;
  padding: 0 0.8em;
  width: inherit;
  font-size: 0.7rem;
  cursor: pointer;
  gap: 2px;
  color: #1a1a1a;
  text-decoration: none;
  outline: none;
  box-shadow: none;
  background: white;
`.withComponent('a');

const KakaopayImg = styled.img`
  width: 50px;
`;

const TossImg = styled.img`
  width: 70px;
`;

export default AccountWrap;
