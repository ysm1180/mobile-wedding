import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSms } from '@fortawesome/free-solid-svg-icons';
import { Heading1 } from '@/components/Text';
import Bride from '@/assets/icons/bride.png';
import Groom from '@/assets/icons/groom.png';

const Container = styled.div`
  background-color: #fefaf7;
  margin: 0;
  padding: 0;
`;

const Profiles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 30px 0;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-family: Pretendard-Regular, sans-serif;
  font-size: 14px;
  color: #333;
  margin: 10px;
`;

const ContactButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #444;
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Icon = styled(FontAwesomeIcon)``;

const ContactSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
`;

const ContactSectionTitle = styled.div`
  color: #333;
  font-size: 15px;
  background-color: #f8f8f8;
  padding: 20px;
`;

const ContactGroup = styled.div`
  flex: 1;
  color: black;
`;

const ContactGroupDescription = styled.span`
  font-size: 10px;
`;

const GroupTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 16px;
  color: #444;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  text-align: center;
  gap: 6px;
  align-items: center;
`;

const ContactRole = styled.span`
  white-space: nowrap;
  font-size: 11px;
  color: #888;
`;

const ContactName = styled.span`
  white-space: nowrap;
  font-size: 14px;
`;

const ContactMiniButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #444;
  color: #fff;
  text-decoration: none;
  border-radius: 50%;
  font-size: 12px;
  padding: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Contact = () => {
  return (
    <Container>
      <br />
      <br />
      <Heading1>축하의 마음 전하기</Heading1>
      <Profiles>
        <Profile>
          <Image src={Groom} alt="Groom" />
          <Name>신랑에게</Name>
          <ContactButton href="tel:+1234567890">
            <Icon icon={faPhone} />
          </ContactButton>
          <ContactButton href="sms:+0987654321">
            <Icon icon={faSms} />
          </ContactButton>
        </Profile>
        <Profile>
          <Image src={Bride} alt="Bride" />
          <Name>신부에게</Name>
          <ContactButton href="tel:+0987654321">
            <Icon icon={faPhone} />
          </ContactButton>
          <ContactButton href="sms:+0987654321">
            <Icon icon={faSms} />
          </ContactButton>
        </Profile>
      </Profiles>
      <ContactSectionTitle>혼주에게 연락하기</ContactSectionTitle>
      <ContactSection>
        <ContactGroup>
          <GroupTitle>신랑 측 혼주</GroupTitle>
          <ContactInfo>
            <ContactItem>
              <ContactRole>아버지</ContactRole>
              <ContactName>연복남</ContactName>
              <ContactMiniButton href="sms:+0987654321">
                <Icon icon={faSms} />
              </ContactMiniButton>
            </ContactItem>
            <ContactItem>
              <ContactRole>어머니</ContactRole>
              <ContactName>권혁선</ContactName>
              <ContactMiniButton href="sms:+0987654321">
                <Icon icon={faSms} />
              </ContactMiniButton>
            </ContactItem>
          </ContactInfo>
          <ContactGroupDescription>
            청각 장애를 가지고 있어
            <br />
            통화가 어려운 점 양해 부탁드립니다.
          </ContactGroupDescription>
        </ContactGroup>
        <ContactGroup>
          <GroupTitle>신부 측 혼주</GroupTitle>
          <ContactInfo>
            <ContactItem>
              <ContactRole>아버지</ContactRole>
              <ContactName>김정시</ContactName>
              <ContactMiniButton href="sms:+0987654321">
                <Icon icon={faPhone} />
              </ContactMiniButton>
              <ContactMiniButton href="sms:+0987654321">
                <Icon icon={faSms} />
              </ContactMiniButton>
            </ContactItem>
            <ContactItem>
              <ContactRole>어머니</ContactRole>
              <ContactName>전미애</ContactName>
              <ContactMiniButton href="sms:+0987654321">
                <Icon icon={faPhone} />
              </ContactMiniButton>
              <ContactMiniButton href="sms:+0987654321">
                <Icon icon={faSms} />
              </ContactMiniButton>
            </ContactItem>
          </ContactInfo>
        </ContactGroup>
      </ContactSection>
      <br />
      <br />
    </Container>
  );
};

export default Contact;
