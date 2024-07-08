import { Heading1 } from '@/components/Text';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { PenLine, X, Flower, AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ref, push, onValue, remove, query, orderByChild } from 'firebase/database';
import { database } from 'firebase';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
  password: string;
}

interface NewEntry {
  name: string;
  message: string;
  password: string;
}

const MAX_MESSAGE_LENGTH = 200;

const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [newEntry, setNewEntry] = useState<NewEntry>({ name: '', message: '', password: '' });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const entriesPerPage: number = 5;

  useEffect(() => {
    const guestbookRef = query(ref(database, 'guestbook'), orderByChild('date'));
    onValue(guestbookRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const entriesList = Object.entries(data).map(([id, value]) => ({
          id,
          ...(value as Omit<GuestbookEntry, 'id'>),
        }));
        setEntries(entriesList.reverse()); // 최신 항목이 먼저 오도록 정렬
      } else {
        setEntries([]);
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEntry.name && newEntry.message && newEntry.password) {
      const guestbookRef = ref(database, 'guestbook');
      push(guestbookRef, {
        ...newEntry,
        date: new Date().toISOString(),
      });
      setNewEntry({ name: '', message: '', password: '' });
      setIsWriteModalOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      const entryToDelete = entries.find((entry) => entry.id === deleteId);
      if (entryToDelete && entryToDelete.password === deletePassword) {
        const entryRef = ref(database, `guestbook/${deleteId}`);
        remove(entryRef);
        setIsDeleteModalOpen(false);
        setDeletePassword('');
        setPasswordError('');
      } else {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <GuestbookWrapper>
      <HeaderContainer>
        <Heading1>신랑, 신부에게</Heading1>
        <AddButton onClick={() => setIsWriteModalOpen(true)}>
          <PenLine size={16} />
          <span>작성</span>
        </AddButton>
      </HeaderContainer>
      {entries.length === 0 ? (
        <EmptyState>
          <FlowerIcon>
            <Flower size={48} />
          </FlowerIcon>
          <EmptyStateTitle>첫 축하 메시지를 남겨주세요!</EmptyStateTitle>
          <EmptyStateMessage>
            신랑, 신부에게 따뜻한 축하의 말을 전하고 이 특별한 순간을 함께 기념해요.
          </EmptyStateMessage>
          <EmptyStateButton onClick={() => setIsWriteModalOpen(true)}>
            <PenLine size={16} />
            <span>방명록 작성하기</span>
          </EmptyStateButton>
        </EmptyState>
      ) : (
        <EntryList>
          {currentEntries.map((entry) => (
            <EntryItem key={entry.id}>
              <EntryHeader>
                <NameAndDate>
                  <Name>{entry.name}</Name>
                  <DateText>{formatDate(entry.date)}</DateText>
                </NameAndDate>
                <DeleteButton onClick={() => handleDeleteClick(entry.id)}>
                  <X size={14} />
                </DeleteButton>
              </EntryHeader>
              <Message>{entry.message}</Message>
            </EntryItem>
          ))}
        </EntryList>
      )}
      <Pagination>
        {Array.from({ length: Math.ceil(entries.length / entriesPerPage) }, (_, i) => (
          <PageButton key={i} onClick={() => paginate(i + 1)} active={currentPage === i + 1}>
            {i + 1}
          </PageButton>
        ))}
      </Pagination>

      {isWriteModalOpen && (
        <Modal>
          <ModalOverlay />
          <AnimatedModalContent>
            <ModalHeader>
              <ModalTitle>방명록 작성</ModalTitle>
              <CloseButton onClick={() => setIsWriteModalOpen(false)}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                value={newEntry.name}
                onChange={handleInputChange}
                placeholder="이름"
                required
              />
              <TextAreaWrapper>
                <TextArea
                  name="message"
                  value={newEntry.message}
                  onChange={handleInputChange}
                  placeholder="메시지 (최대 200자)"
                  required
                />
                <CharCount isNearLimit={newEntry.message.length > MAX_MESSAGE_LENGTH * 0.9}>
                  {newEntry.message.length}/{MAX_MESSAGE_LENGTH}
                </CharCount>
              </TextAreaWrapper>
              <Input
                type="password"
                name="password"
                value={newEntry.password}
                onChange={handleInputChange}
                placeholder="비밀번호"
                required
              />
              <SubmitButton type="submit">작성하기</SubmitButton>
            </Form>
          </AnimatedModalContent>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal>
          <ModalOverlay />
          <AnimatedModalContent>
            <ModalHeader>
              <ModalTitle>방명록 삭제</ModalTitle>
              <CloseButton
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setPasswordError('');
                }}>
                <X size={20} />
              </CloseButton>
            </ModalHeader>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleDelete();
              }}>
              <Input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
              {passwordError && (
                <ErrorMessage>
                  <AlertCircle size={16} />
                  {passwordError}
                </ErrorMessage>
              )}
              <SubmitButton type="submit">삭제하기</SubmitButton>
            </Form>
          </AnimatedModalContent>
        </Modal>
      )}
    </GuestbookWrapper>
  );
};

export default Guestbook;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const GuestbookWrapper = styled.div`
  padding: 60px 30px;
  background-color: #fefaf7;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: #7ea387;
  color: #fefaf7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: RIDIBatang, sans-serif;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4a4e2f;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  background-color: #f7f9f7;
  border-radius: 12px;
  border: 2px dashed #c1d5c1;
  color: #4a4a4a;
  font-family: GowunBatang-Regular, sans-serif;
`;

const FlowerIcon = styled.div`
  color: #7ea387;
  margin-bottom: 8px;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const EmptyStateTitle = styled.h3`
  font-size: 16px;
  color: #595d3b;
  margin-bottom: 12px;
  font-family: RIDIBatang, sans-serif;
`;

const EmptyStateMessage = styled.p`
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #6c6c6c;
  white-space: pre-line;
  word-break: keep-all;
`;

const EmptyStateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #7ea387;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-family: RIDIBatang, sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6b8f73;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EntryItem = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NameAndDate = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const Name = styled.span`
  font-weight: bold;
  color: #333;
  font-family: RIDIBatang, sans-serif;
  font-size: 16px;
`;

const DateText = styled.span`
  color: #888;
  font-size: 12px;
  font-family: GowunBatang-Regular, sans-serif;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ccc;
  padding: 4px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const Message = styled.p`
  color: #555;
  line-height: 1.6;
  font-family: GowunBatang-Regular, sans-serif;
  font-size: 14px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.3s ease-out;
`;

const AnimatedModalContent = styled.div`
  position: relative;
  background-color: #fefaf7;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  z-index: 1001;
  animation:
    ${fadeIn} 0.3s ease-out,
    ${scaleIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: RIDIBatang, sans-serif;
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: GowunBatang-Regular, sans-serif;
  font-size: 12px;
  box-sizing: border-box;
`;

const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: GowunBatang-Regular, sans-serif;
  font-size: 12px;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
`;

interface CharCountProps {
  isNearLimit: boolean;
}

const CharCount = styled.div<CharCountProps>`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
  color: ${(props) => (props.isNearLimit ? '#e74c3c' : '#888')};
  padding: 2px 4px;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #7ea387;
  color: #fefaf7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: RIDIBatang, sans-serif;
  &:hover {
    background-color: #4a4e2f;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

interface PageButtonProps {
  active: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.active ? '#595d3b' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  cursor: pointer;
  font-family: RIDIBatang, sans-serif;
  &:hover {
    background-color: #595d3b;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e74c3c;
  font-size: 14px;
  margin-top: 8px;
`;
