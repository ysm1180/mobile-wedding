import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Groom from '@/assets/minigame/groom.png';
import Bride from '@/assets/minigame/bride.png';
import Background from '@/assets/minigame/background.jpg';
import Cute from '@/assets/minigame/cute.png';

const ASSETS = {
  background: Background,
  groom: Groom,
  bride: Bride,
  cute: Cute,
};

const OBSTACLES = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect x="6" y="22" width="20" height="10" fill="#FFFFFF" />
    <rect x="8" y="12" width="16" height="10" fill="#FFF0F5" />
    <rect x="10" y="2" width="12" height="10" fill="#FFB6C1" />
    <circle cx="16" cy="2" r="2" fill="#FF69B4" />
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="12" fill="none" stroke="#FFD700" stroke-width="4" />
    <circle cx="16" cy="16" r="8" fill="none" stroke="#FFA500" stroke-width="2" />
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M16,2 Q22,8 22,16 Q22,24 16,30 Q10,24 10,16 Q10,8 16,2" fill="#FF69B4" />
    <path d="M13,5 Q16,8 16,13 Q16,18 13,21 Q10,18 10,13 Q10,8 13,5" fill="#FFC0CB" />
    <path d="M19,5 Q22,8 22,13 Q22,18 19,21 Q16,18 16,13 Q16,8 19,5" fill="#FFC0CB" />
    <rect x="15" y="21" width="2" height="10" fill="#008000" />
  </svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect x="4" y="8" width="24" height="20" fill="#FF4500" />
    <rect x="4" y="16" width="24" height="4" fill="#FFD700" />
    <rect x="14" y="8" width="4" height="20" fill="#FFD700" />
    <rect x="8" y="4" width="16" height="4" fill="#FF69B4" />
  </svg>`,
];

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
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

const WeddingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const obstaclesRef = useRef<GameObject[]>([]);

  const groom: Groom = {
    x: 20,
    y: 260,
    width: 48,
    height: 72,
    speed: 3,
    jumpForce: 4,
    gravity: 0.1,
    velocity: 0,
    jumping: false,
    doubleJumping: false,
    image: new Image(),
  };

  const svgToDataURL = (svgString: string): string => {
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  const bride: GameObject = { x: totalDistance, y: 260, width: 48, height: 72, image: new Image() };
  const generateObstacle = useCallback((startX: number): GameObject => {
    const randomSvg = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
    const obstacle: GameObject = {
      x: startX,
      y: Math.random() < 0.5 ? 290 : 260,
      width: 30,
      height: 30,
      image: new Image(),
    };
    obstacle.image.src = svgToDataURL(randomSvg);
    return obstacle;
  }, []);

  useEffect(() => {
    // 초기 장애물 생성
    obstaclesRef.current = Array(12)
      .fill(null)
      .map((_, index) => generateObstacle(500 + index * 400));
  }, [generateObstacle]);

  const backgroundImage = new Image();
  const cuteImage = new Image();
  cuteImage.src = Cute;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Load assets
    backgroundImage.src = ASSETS.background;
    groom.image.src = ASSETS.groom;
    bride.image.src = ASSETS.bride;

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
      } else {
        setGameState('ready');
        resetGame();
      }
    };

    canvas.addEventListener('touchstart', handleTouch);

    const resetGame = () => {
      groom.x = 20;
      groom.y = 260;
      groom.velocity = 0;
      groom.jumping = false;
      groom.doubleJumping = false;
      setScore(0);
      setProgress(0);
      obstaclesRef.current = Array(12)
        .fill(null)
        .map((_, index) => generateObstacle(500 + index * 400));
      bride.x = 3000;
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경 그리기
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      if (gameState === 'playing') {
        // 신랑 이동 및 그리기
        groom.velocity += groom.gravity;
        groom.y += groom.velocity;

        if (groom.y > 260) {
          groom.y = 260;
          groom.jumping = false;
          groom.doubleJumping = false;
          groom.velocity = 0;
        }

        ctx.drawImage(groom.image, groom.x, groom.y, groom.width, groom.height);

        // 장애물 이동 및 그리기
        obstaclesRef.current = obstaclesRef.current.map((obstacle) => {
          obstacle.x -= groom.speed;
          ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

          // 충돌 체크
          if (
            groom.x < obstacle.x + obstacle.width - 20 &&
            groom.x + groom.width > obstacle.x + 20 &&
            groom.y < obstacle.y + obstacle.height &&
            groom.y + groom.height > obstacle.y
          ) {
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
        ctx.fillStyle = '#333';
        ctx.fillText('2015년부터의 여정 시작', canvas.width / 2 - 80, canvas.height / 2 - 20);
        ctx.fillText(
          '한 번 터치 : 점프, 두 번 터치 : 더블 점프',
          canvas.width / 2 - 130,
          canvas.height / 2 + 10,
        );
      } else if (gameState === 'won') {
        ctx.drawImage(cuteImage, groom.x, groom.y - 10, groom.width + 10, groom.height + 10);

        ctx.font = '16px GowunBatang-Bold';
        ctx.fillStyle = 'green';
        ctx.fillText(
          '축하합니다! 9년의 사랑 끝에 결혼!',
          canvas.width / 2 - 120,
          canvas.height / 2 - 20,
        );
      } else if (gameState === 'lost') {
        ctx.font = '16px GowunBatang-Bold';
        ctx.fillStyle = 'red';
        ctx.fillText(
          '아쉽네요! 다시 도전해보세요!',
          canvas.width / 2 - 100,
          canvas.height / 2 - 20,
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
    let animationFrameId2: number;

    const drawProgress = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(10, 10, 300, 20);
      ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
      ctx.fillRect(10, 10, (300 * progress) / 100, 20);

      animationFrameId = window.requestAnimationFrame(drawProgress);
    };

    const drawYear = () => {
      const currentYear = Math.min(2024, 2015 + score);
      ctx.font = '14px GowunBatang-Bold';
      ctx.fillStyle = 'black';
      ctx.fillText(`${currentYear}년`, 15, 26);

      animationFrameId2 = window.requestAnimationFrame(drawYear);
    };

    drawProgress();
    drawYear();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId2);
    };
  }, [progress, score]);

  return (
    <GameWrapper>
      <GameCanvas ref={canvasRef} width={320} height={400} />
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
`;
