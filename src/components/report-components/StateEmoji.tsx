import React, { SVGProps } from 'react';

import { ReactComponent as StateEmojiAlone } from '../../assets/emojis/alone.svg';
import { ReactComponent as StateEmojiAngry } from '../../assets/emojis/angry.svg';
import { ReactComponent as StateEmojiCrying } from '../../assets/emojis/crying.svg';
import { ReactComponent as StateEmojiFood } from '../../assets/emojis/food.svg';
import { ReactComponent as StateEmojiSleepy } from '../../assets/emojis/sleepy.svg';

export type StateEmojiType =
  | 'alone'
  | 'angry'
  | 'crying'
  | 'crying'
  | 'food'
  | 'sleepy';

interface StateEmojiProps extends SVGProps<SVGSVGElement> {
  state: StateEmojiType;
}

const StateEmoji: React.FC<StateEmojiProps> = ({ state, ...props }) => {
  switch (state) {
    case 'alone':
      return <StateEmojiAlone {...props} />;
    case 'angry':
      return <StateEmojiAngry {...props} />;
    case 'crying':
      return <StateEmojiCrying {...props} />;
    case 'food':
      return <StateEmojiFood {...props} />;
    case 'sleepy':
      return <StateEmojiSleepy {...props} />;
  }
};

export default StateEmoji;
