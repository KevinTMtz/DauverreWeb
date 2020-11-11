import React, { SVGProps } from 'react';

import { ReactComponent as EmojiSenior } from '../assets/emojis/senior.svg';
import { ReactComponent as EmojiUser } from '../assets/emojis/user.svg';
import { ReactComponent as EmojiStats } from '../assets/emojis/stats.svg';
import { ReactComponent as EmojiPost } from '../assets/emojis/post.svg';
import { ReactComponent as EmojiDoctor } from '../assets/emojis/doctor.svg';
import { ReactComponent as EmojiAlone } from '../assets/emojis/alone.svg';
import { ReactComponent as EmojiAngry } from '../assets/emojis/angry.svg';
import { ReactComponent as EmojiCrying } from '../assets/emojis/crying.svg';
import { ReactComponent as EmojiFood } from '../assets/emojis/food.svg';
import { ReactComponent as EmojiSleepy } from '../assets/emojis/sleepy.svg';

export type SVGEmojiType =
  | 'senior'
  | 'user'
  | 'stats'
  | 'post'
  | 'doctor'
  | 'alone'
  | 'angry'
  | 'crying'
  | 'food'
  | 'sleepy';

interface SVGEmojiProps extends SVGProps<SVGSVGElement> {
  state: SVGEmojiType;
}

const SVGEmoji: React.FC<SVGEmojiProps> = ({ state, ...props }) => {
  switch (state) {
    case 'senior':
      return <EmojiSenior {...props} />;
    case 'user':
      return <EmojiUser {...props} />;
    case 'stats':
      return <EmojiStats {...props} />;
    case 'post':
      return <EmojiPost {...props} />;
    case 'doctor':
      return <EmojiDoctor {...props} />;
    case 'alone':
      return <EmojiAlone {...props} />;
    case 'angry':
      return <EmojiAngry {...props} />;
    case 'crying':
      return <EmojiCrying {...props} />;
    case 'food':
      return <EmojiFood {...props} />;
    case 'sleepy':
      return <EmojiSleepy {...props} />;
  }
};

export default SVGEmoji;
