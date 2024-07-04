import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface CountdownProps {
  weddingDate: string;
}

const Countdown = ({ weddingDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isWeddingPassed, setIsWeddingPassed] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const weddingDay = new Date(weddingDate);
      const difference = weddingDay.getTime() - now.getTime();

      const getTimeLeft = (diff: number) => ({
        days: Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24)),
        hours: Math.floor((Math.abs(diff) / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((Math.abs(diff) / 1000 / 60) % 60),
        seconds: Math.floor((Math.abs(diff) / 1000) % 60),
      });

      if (difference > 0) {
        setIsWeddingPassed(false);
      } else {
        setIsWeddingPassed(true);
      }

      setTimeLeft(getTimeLeft(difference));
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const message = isWeddingPassed ? `성민 ♥ 예지는 함께한 지` : `성민 ♥ 예지의 결혼식까지`;

  const koreanWords = {
    days: '일',
    hours: '시간',
    minutes: '분',
    seconds: '초',
  };
  return (
    <CountdownWrapper>
      <CountdownMessage>{message}</CountdownMessage>
      <CountdownDisplay>
        {['days', 'hours', 'minutes', 'seconds'].map((interval) => (
          <TimeUnit key={interval}>
            <TimeValue>
              {timeLeft[interval as 'days' | 'hours' | 'minutes' | 'seconds']
                .toString()
                .padStart(2, '0')}
            </TimeValue>
            <TimeLabel>
              {koreanWords[interval as 'days' | 'hours' | 'minutes' | 'seconds']}
            </TimeLabel>
          </TimeUnit>
        ))}
      </CountdownDisplay>
    </CountdownWrapper>
  );
};

const CountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CountdownDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
`;

const TimeValue = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #4a4a4a;
`;

const TimeLabel = styled.span`
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
`;

const CountdownMessage = styled.p`
  font-size: 16px;
  color: #4a4a4a;
  text-align: center;
`;

export default Countdown;
