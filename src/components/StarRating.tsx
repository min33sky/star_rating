import fullStar from '../assets/icon_full_star.svg';
import emptyStar from '../assets/icon_empty_star.svg';
import halfStar from '../assets/icon_half_star.svg';
import { useState } from 'react';

export default function StarRating() {
  const [starCount, setStarCount] = useState(0);
  const [isHover, setIsHover] = useState(false);
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

    // TODO: 절반이 넘었는지 체크하자
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // console.log('width', rect.width);
    // console.log('first', x);
    const checkHalf = x > rect.width / 2;
    // console.log('isHalfOver', checkHalf);
    // console.log('starCount', starCount);
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

  return (
    <div className="w-10/12 max-w-lg rounded-lg bg-slate-50 px-3 py-8 text-slate-800 shadow-lg">
      <header>
        <h2 className="text-center text-2xl font-bold">평점을 선택해주세요.</h2>
      </header>

      <div className="flex justify-center">
        <div className="flex w-fit rounded-lg bg-slate-400 py-2 px-1">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              if (starCount === index + 1) {
                console.log('요시요시 : ', isHalfOver);
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

      <footer>{/* 아직 모름 */}</footer>
    </div>
  );
}
