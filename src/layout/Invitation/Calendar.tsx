import styled from '@emotion/styled';

interface CalendarProps {
  weddingDate: string;
}

const Calendar = ({ weddingDate }: CalendarProps) => {
  const date = new Date(weddingDate);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const getDaysArray = () => {
    const daysArray = new Array(35).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray[i + firstDayOfMonth - 1] = i;
    }
    return daysArray;
  };

  const getKoreanDateExpression = (month: number, day: number) => {
    return `${month + 1}월 ${day}일`;
  };

  return (
    <CalendarWrapper>
      <CalendarTitle>{getKoreanDateExpression(month, day)}</CalendarTitle>
      <CalendarGrid>
        {days.map((d, index) => (
          <DayHeader key={index}>{d}</DayHeader>
        ))}
        {getDaysArray().map((d, index) => (
          <Day key={index} isWeddingDay={d === day}>
            {d}
          </Day>
        ))}
      </CalendarGrid>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: rgba(250, 249, 243, 0.7);
  border-radius: 8px;
  padding: 16px;
  font-family: 'RIDIBatang', serif;
`;

const CalendarTitle = styled.h2`
  text-align: left;
  margin-bottom: 16px;
  font-size: 18px;
  color: #595d3b;
  font-weight: normal;
  padding: 15px 5px;
  border-bottom: 1px solid black;
  font-weight: bold;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  color: #777;
  font-size: 12px;
`;

const Day = styled.div<{ isWeddingDay: boolean }>`
  text-align: center;
  padding: 8px;
  font-size: 14px;
  ${(props) =>
    props.isWeddingDay &&
    `
     background-color: #7ea387;
    border-radius: 50%;
    color: rgba(250, 249, 243, 1);
  `}
`;

export default Calendar;
