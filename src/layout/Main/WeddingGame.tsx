import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Groom from '@/assets/minigame/groom.png';
import Bride from '@/assets/minigame/bride.png';
import Background from '@/assets/minigame/background.jpg';
import Background1 from '@/assets/minigame/background1.jpg';
import Background2 from '@/assets/minigame/background2.jpg';
import Background3 from '@/assets/minigame/background3.jpg';
import Background4 from '@/assets/minigame/background4.jpg';
import Cute from '@/assets/minigame/cute.png';
import Cake from '@/assets/minigame/cake.png';
import Glass from '@/assets/minigame/glass.png';
import Present from '@/assets/minigame/present.png';
import Ring from '@/assets/minigame/ring.png';

const ASSETS = {
  backgrounds: [Background1, Background2, Background3, Background4, Background],
  groom: Groom,
  bride: Bride,
  cute: Cute,
};

const OBSTACLES = [
  {
    type: 'static',
    src: Cake,
    width: 30,
    height: 30,
  },
  {
    type: 'static',
    src: Ring,
    width: 30,
    height: 30,
  },
  {
    type: 'static',
    src: Glass,
    width: 35,
    height: 35,
  },
  {
    type: 'static',
    src: Present,
    width: 35,
    height: 35,
  },
];

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

interface Obstacle extends GameObject {
  type: string;
  src: string;
  movePattern?: string;
  speed?: number;
  rotationSpeed?: number;
  rotation?: number;
  direction?: number;
}

interface Groom extends GameObject {
  speed: number;
  jumpForce: number;
  gravity: number;
  velocity: number;
  jumping: boolean;
  doubleJumping: boolean;
}

type GameState = 'ready' | 'playing' | 'won' | 'lost';

const totalDistance = 6000; // 총 거리
const yearsToProgress = 2024 - 2015; // 진행할 연도 수

const backgroundImages: HTMLImageElement[] = [];
const cuteImage = new Image();
cuteImage.src = Cute;

for (const background of ASSETS.backgrounds) {
  const image = new Image();
  image.src = background;
  backgroundImages.push(image);
}

const WeddingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const backgroundImageRef = useRef<HTMLImageElement>(backgroundImages[0]);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showSuccessInfo, setShowSuccessInfo] = useState(false);

  const groom: Groom = {
    x: 20,
    y: 200,
    width: 48,
    height: 72,
    speed: 2,
    jumpForce: 4,
    gravity: 0.1,
    velocity: 0,
    jumping: false,
    doubleJumping: false,
    image: new Image(),
  };

  const bride: GameObject = { x: totalDistance, y: 200, width: 48, height: 72, image: new Image() };
  const generateObstacle = useCallback((startX: number): Obstacle => {
    const obstacleTemplate = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
    const obstacle: Obstacle = {
      ...obstacleTemplate,
      x: startX,
      y: obstacleTemplate.type === 'moving' ? 200 : Math.random() < 0.5 ? 200 : 230,
      image: new Image(),
      direction: 1,
      rotation: 0,
    };
    obstacle.image.src = obstacle.src;
    return obstacle;
  }, []);

  groom.image.src = ASSETS.groom;
  bride.image.src = ASSETS.bride;

  useEffect(() => {
    // 초기 장애물 생성
    obstaclesRef.current = Array(13)
      .fill(null)
      .map((_, index) => generateObstacle(500 + index * 400));
  }, [generateObstacle]);

  useEffect(() => {
    const newIndex = Math.min(Math.floor(progress / 25), 4);
    setBackgroundIndex(newIndex);
  }, [progress]);

  useEffect(() => {
    backgroundImageRef.current = backgroundImages[backgroundIndex];
  }, [backgroundIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleJump = () => {
      if (!groom.jumping) {
        groom.jumping = true;
        groom.velocity = -groom.jumpForce;
      } else if (!groom.doubleJumping) {
        groom.doubleJumping = true;
        groom.velocity = -groom.jumpForce * 0.7;
      }
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      if (gameState === 'ready') {
        setGameState('playing');
      } else if (gameState === 'playing') {
        handleJump();
      } else if (gameState === 'lost') {
        setGameState('ready');
        resetGame();
      }
    };

    canvas.addEventListener('touchstart', handleTouch);

    const resetGame = () => {
      groom.x = 20;
      groom.y = 200;
      groom.velocity = 0;
      groom.jumping = false;
      groom.doubleJumping = false;
      setScore(0);
      setProgress(0);
      obstaclesRef.current = Array(14)
        .fill(null)
        .map((_, index) => generateObstacle(500 + index * 400));
      bride.x = totalDistance;
    };

    const updateObstacle = (obstacle: Obstacle) => {
      obstacle.x -= groom.speed;

      if (obstacle.type === 'moving' && obstacle.movePattern === 'vertical') {
        obstacle.y += obstacle.speed! * obstacle.direction!;
        if (obstacle.y > 200 || obstacle.y < 290) {
          obstacle.direction! *= -1;
        }
      } else if (obstacle.type === 'rotating') {
        obstacle.rotation! += obstacle.rotationSpeed!;
      }
    };

    const drawObstacle = (ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
      ctx.save();
      ctx.translate(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2);
      if (obstacle.type === 'rotating') {
        ctx.rotate(obstacle.rotation!);
      }
      ctx.drawImage(
        obstacle.image,
        -obstacle.width / 2,
        -obstacle.height / 2,
        obstacle.width,
        obstacle.height,
      );
      ctx.restore();
    };

    const checkCollision = (groom: Groom, obstacle: Obstacle) => {
      return (
        groom.x < obstacle.x + obstacle.width - 20 &&
        groom.x + groom.width > obstacle.x + 20 &&
        groom.y < obstacle.y + obstacle.height &&
        groom.y + groom.height > obstacle.y
      );
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그리기
      ctx.drawImage(backgroundImageRef.current!, 0, 0, canvas.width, canvas.height);

      if (gameState === 'playing') {
        // 신랑 이동 및 그리기
        groom.velocity += groom.gravity;
        groom.y += groom.velocity;

        if (groom.y > 200) {
          groom.y = 200;
          groom.jumping = false;
          groom.doubleJumping = false;
          groom.velocity = 0;
        }

        ctx.drawImage(groom.image, groom.x, groom.y, groom.width, groom.height);

        // 장애물 이동 및 그리기
        obstaclesRef.current = obstaclesRef.current.map((obstacle) => {
          updateObstacle(obstacle);
          drawObstacle(ctx, obstacle);

          if (checkCollision(groom, obstacle)) {
            setGameState('lost');
          }

          return obstacle;
        });

        // 신부 그리기
        bride.x -= groom.speed;
        ctx.drawImage(bride.image, bride.x, bride.y, bride.width, bride.height);

        const distanceTraveled = totalDistance - (bride.x - groom.x - bride.width / 2);
        const progressPercentage = (distanceTraveled / totalDistance) * 100;
        setProgress(progressPercentage);

        const newScore = Math.floor((progressPercentage * yearsToProgress) / 100);
        setScore(newScore);

        if (progressPercentage >= 100) {
          setGameState('won');
        }
      } else if (gameState === 'ready') {
        ctx.font = '16px GowunBatang-Bold';
        ctx.fillStyle = '#111';
        ctx.fillText('2015년부터의 여정 시작', canvas.width / 2 - 80, canvas.height / 2 - 70);
        ctx.fillText(
          '한 번 터치 : 점프, 두 번 터치 : 더블 점프',
          canvas.width / 2 - 130,
          canvas.height / 2 - 40,
        );
      } else if (gameState === 'won') {
        ctx.drawImage(cuteImage, groom.x, groom.y - 10, groom.width + 10, groom.height + 10);

        ctx.font = '16px GowunBatang-Bold';
        ctx.fillStyle = 'green';
        ctx.fillText(
          '축하합니다! 신부를 무사히 만났습니다!',
          canvas.width / 2 - 120,
          canvas.height / 2 - 50,
        );
        setShowSuccessInfo(true);
      } else if (gameState === 'lost') {
        ctx.font = '16px GowunBatang-Bold';
        ctx.fillStyle = 'red';
        ctx.fillText(
          '아쉽네요! 다시 도전해보세요!',
          canvas.width / 2 - 100,
          canvas.height / 2 - 70,
        );
      }

      animationFrameId = window.requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('touchstart', handleTouch);
    };
  }, [gameState, generateObstacle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const drawProgress = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(10, 10, 300, 20);
      ctx.fillStyle = 'rgba(0, 255, 145, 0.7)';
      ctx.fillRect(10, 10, (300 * progress) / 100, 20);

      const currentYear = Math.min(2024, 2015 + score);
      ctx.font = '13px GowunBatang-Bold';
      ctx.fillStyle = 'black';
      ctx.fillText(`${currentYear}년`, 15, 26);

      animationFrameId = window.requestAnimationFrame(drawProgress);
    };

    drawProgress();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [progress, score]);

  return (
    <GameWrapper>
      <GameCanvas ref={canvasRef} width={320} height={280} />
      <MessageSection>
        {showSuccessInfo && (
          <ThankYouMessage>
            <b>여정에 성공하신 것을 축하합니다!</b>
            <br />
            저희의 사랑의 여정에 함께해 주셔서 감사합니다.
          </ThankYouMessage>
        )}
        {showSuccessInfo ? (
          <QASection>
            <QATitle>결혼 준비에 있어 궁금한 점을 알려드릴게요!</QATitle>
            <QAItem>
              <Question>Q: 첫 만남은 언제인가요?</Question>
              <Answer>A: 2015년 4월부터 만났어요. 🥰</Answer>
            </QAItem>
            <QAItem>
              <Question>Q: 결혼을 앞둔 소감은 어떤가요?</Question>
              <Answer>
                <AnswerPerson>
                  <AnswerPersonTitle>신랑</AnswerPersonTitle>
                  <AnswerPersonResponse>
                    9년이라는 긴 시간 동안 함께 걸어왔지만, 이제 평생을 약속하는 결혼을 앞두니
                    설렘과 책임감이 교차합니다. 그동안 우리의 사랑을 지켜봐 주신 모든 분들께
                    감사드립니다. 앞으로도 서로를 아끼며 지내겠습니다.
                  </AnswerPersonResponse>
                </AnswerPerson>
              </Answer>
              <Answer>
                <AnswerPerson>
                  <AnswerPersonTitle>신부</AnswerPersonTitle>
                  <AnswerPersonResponse>
                    오랜 시간 함께했지만 여전히 새롭고 귀여운 매력으로 가득한 성민 오빠와 평생을
                    함께하게 되어 너무나 설렙니다! ☺️ 지금까지 그래왔듯이 앞으로도 서로 아끼고
                    존중하며 행복하게 살겠습니다. 축하해 주신 모든 분들께 진심으로 감사드립니다 :-)
                  </AnswerPersonResponse>
                </AnswerPerson>
              </Answer>
            </QAItem>
            <QAItem>
              <Question>Q: 신혼 여행지는 어디인가요?</Question>
              <Answer>A: 모히또 가서 몰디브 한 잔하고 오겠습니다! 🏖️</Answer>
            </QAItem>
          </QASection>
        ) : (
          <QASection>
            <QATitle>Q&A</QATitle>
            <QAItem>
              <Question>Q: 게임은 어떻게 하나요?</Question>
              <Answer>
                A: 화면을 한 번 터치하면 점프, 두 번 터치하면 더블 점프를 할 수 있어요.
              </Answer>
            </QAItem>
            <QAItem>
              <Question>Q: 게임의 목표는 무엇인가요?</Question>
              <Answer>
                A: 2015년부터 2024년까지의 사랑의 여정을 장애물을 피해 완주하는 것입니다.
              </Answer>
            </QAItem>
          </QASection>
        )}
      </MessageSection>
    </GameWrapper>
  );
};

export default WeddingGame;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(250, 249, 243, 0.7);
`;

const GameCanvas = styled.canvas`
  border: 2px solid #7ea387;
  border-radius: 10px;

  margin-top: 50px;
`;

const MessageSection = styled.div`
  margin: 10px 0;
  padding: 0 10px;
  text-align: center;

  overflow: scroll;
`;

const ThankYouMessage = styled.p`
  font-family: 'GowunBatang-Regular', sans-serif;
  font-size: 13px;
  color: #4a4a4a;
  margin-bottom: 10px;
  line-height: 2;

  b {
    font-family: 'GowunBatang-Bold', sans-serif;
    font-size: 15px;
  }
`;

const QASection = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 20px;
`;

const QATitle = styled.h3`
  font-family: 'RIDIBatang', sans-serif;
  font-size: 13px;
  color: #333;
  margin-bottom: 14px;
`;

const QAItem = styled.div`
  margin-bottom: 12px;
`;

const Question = styled.div`
  font-family: 'GowunBatang-Bold', sans-serif;
  font-size: 13px;
  color: #4a4a4a;
  margin-bottom: 4px;
`;

const Answer = styled.div`
  font-family: 'GowunBatang-Regular', sans-serif;
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
`;

const AnswerPerson = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const AnswerPersonTitle = styled.div`
  font-family: 'GowunBatang-Bold', sans-serif;
  white-space: nowrap;
`;

const AnswerPersonResponse = styled.div`
  white-space: pre-line;
  word-break: keep-all;
  text-align: left;
`;
