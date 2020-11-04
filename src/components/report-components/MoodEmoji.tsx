import React, { SVGProps } from 'react';

import { ReactComponent as MoodEmoji1 } from '../../assets/emojis/mood/1.svg';
import { ReactComponent as MoodEmoji2 } from '../../assets/emojis/mood/2.svg';
import { ReactComponent as MoodEmoji3 } from '../../assets/emojis/mood/3.svg';
import { ReactComponent as MoodEmoji4 } from '../../assets/emojis/mood/4.svg';
import { ReactComponent as MoodEmoji5 } from '../../assets/emojis/mood/5.svg';

interface MoodEmojiProps extends SVGProps<SVGSVGElement> {
  index: OneToFiveIdx;
}

const MoodEmoji: React.FC<MoodEmojiProps> = ({ index, ...props }) => {
  switch (index) {
    case 1:
      return <MoodEmoji1 {...props} />;
    case 2:
      return <MoodEmoji2 {...props} />;
    case 3:
      return <MoodEmoji3 {...props} />;
    case 4:
      return <MoodEmoji4 {...props} />;
    case 5:
      return <MoodEmoji5 {...props} />;
  }
};

export default MoodEmoji;
