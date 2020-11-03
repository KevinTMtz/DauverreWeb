import React, { SVGProps } from 'react';

import { ReactComponent as StateEmoji1 } from '../../assets/emojis/alone.svg';
import { ReactComponent as StateEmoji2 } from '../../assets/emojis/angry.svg';
import { ReactComponent as StateEmoji3 } from '../../assets/emojis/crying.svg';
import { ReactComponent as StateEmoji4 } from '../../assets/emojis/food.svg';
import { ReactComponent as StateEmoji5 } from '../../assets/emojis/sleepy.svg';

interface StateEmojiProps extends SVGProps<SVGSVGElement> {
  state: string;
}

const StateEmoji: React.FC<StateEmojiProps> = ({ state, ...props }) => {
  if (state === 'alone') {
    return <StateEmoji1 {...props} />;
  } else if (state === 'angry') {
    return <StateEmoji2 {...props} />;
  } else if (state === 'crying') {
    return <StateEmoji3 {...props} />;
  } else if (state === 'food') {
    return <StateEmoji4 {...props} />;
  } else if (state === 'sleepy') {
    return <StateEmoji5 {...props} />;
  } else {
    return <div></div>;
  }
};

export default StateEmoji;
