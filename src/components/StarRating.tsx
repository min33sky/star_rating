import fullStar from '../assets/icon_full_star.svg';
import emptyStar from '../assets/icon_empty_star.svg';
import halfStar from '../assets/icon_half_star.svg';
import { useState } from 'react';

const commentMap: Record<number, string> = {
  0.5: '끔찍해요',
  1: '최악이에요',
  1.5: '이건 아니에요',
  2: '별로에요',
  2.5: '그냥 그래요',
  3: '보통이에요',
  3.5: '괜찮아요',
  4: '좋아요',
  4.5: '매우좋아요',
  5: '최고에요',
};

/**
 * 별점 평가 컴포넌트
 */
export default function StarRating() {
  const [starCount, setStarCount] = useState(0);
  const [isHalfOver, setIsHalfOver] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  /**
   * 마우스 이동시 별점 표시
   * ? 별의 절반 위치를 체크하기 위해서 mouseover 대신 mousemove 사용
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isClicked) return;
    const target = e.target as HTMLImageElement;
    setStarCount(Number(target.dataset.star));

    //? 별의 너비를 이용해서 커서가 별의 절반을 넘겼는지 체크
    const rect = target.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const checkHalf = xPos > rect.width / 2;
    setIsHalfOver(checkHalf);
  };

  /**
   * 마우스가 별점 이미지를 벗어났을 때 처리
   */
  const handleMouseLeave = () => {
    if (isClicked) return;
    setStarCount(0);
  };

  /**
   * 별점 고정 및 해제
   */
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsClicked((prev) => !prev);
  };

  /**
   * 최종 점수 계산
   */
  const getFinalScore = () => {
    if (isHalfOver) {
      return starCount;
    }
    return starCount - 0.5;
  };

  return (
    <div className="w-10/12 max-w-md space-y-6 rounded-lg bg-slate-50 px-3 py-6 text-slate-800 shadow-lg">
      <header>
        <h2 className="text-center text-xl font-bold">당신의 평점은?</h2>
      </header>

      <div className="flex justify-center">
        <div
          className={`flex w-fit rounded-lg border-2 bg-slate-300 py-2 px-1 ${
            isClicked && 'border-yellow-400'
          }`}
        >
          {Array(5)
            .fill(0)
            .map((_, index) => {
              //? 현재 가리키는 별에 대한 처리
              if (starCount === index + 1) {
                return (
                  <img
                    key={index}
                    src={isHalfOver ? fullStar : halfStar}
                    data-star={index + 1}
                    className="w-12 sm:w-20 "
                    onClick={handleClick}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    alt="star_image"
                  />
                );
              }

              //? 현재 가리키는 별 이전이면 채워진 별, 이후면 빈 별
              return (
                <img
                  key={index}
                  src={starCount > index + 1 ? fullStar : emptyStar}
                  data-star={index + 1}
                  className="w-12 sm:w-20 "
                  onClick={handleClick}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  alt="star_image"
                />
              );
            })}
        </div>
      </div>

      <footer className="flex h-7 items-center justify-center">
        <p className="text-lg font-semibold">{commentMap[getFinalScore()]}</p>
      </footer>
    </div>
  );
}
