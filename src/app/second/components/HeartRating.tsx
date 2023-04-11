import { FC, useState } from "react";

type HeartRatingProps = {
  rating: number;
};

const HeartRating: FC<HeartRatingProps> = ({ rating }) => {
  const [filledHearts, setFilledHearts] = useState(rating);

  const handleHeartClick = (heartIndex: number) => {
    setFilledHearts(heartIndex);
  };

  const renderHearts = () => {
    const hearts = [];

    for (let i = 1; i <= 5; i++) {
      const filled = i <= filledHearts;
      const heartImage = filled ? "/icons/gold_star.svg" : "/icons/gray_star.svg";

      hearts.push(
        <img
          key={i}
          src={heartImage}
          alt={`heart-${i}`}
          className="h-5 w-5 cursor-pointer"
          onClick={() => handleHeartClick(i)}
        />
      );
    }

    return hearts;
  };

  return <div className="rating flex items-center">{renderHearts()}</div>;
};

export default HeartRating;
