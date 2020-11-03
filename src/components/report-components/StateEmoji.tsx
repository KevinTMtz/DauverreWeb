import React, { SVGProps } from 'react';

import { ReactComponent as StateEmoji1 } from '../../assets/emojis/alone.svg';
import { ReactComponent as StateEmoji2 } from '../../assets/emojis/angry.svg';
import { ReactComponent as StateEmoji3 } from '../../assets/emojis/crying.svg';
import { ReactComponent as StateEmoji4 } from '../../assets/emojis/food.svg';
import { ReactComponent as StateEmoji5 } from '../../assets/emojis/sleepy.svg';

interface StateEmojiProps extends SVGProps<SVGSVGElement> {
  index: number;
}

const StateEmoji: React.FC<StateEmojiProps> = ({ index, ...props }) => {
  switch (index) {
    case 1:
      return <StateEmoji1 {...props} />;
    case 2:
      return <StateEmoji2 {...props} />;
    case 3:
      return <StateEmoji3 {...props} />;
    case 4:
      return <StateEmoji4 {...props} />;
    case 5:
      return <StateEmoji5 {...props} />;
    default:
      return <div></div>;
  }
};

export default StateEmoji;
