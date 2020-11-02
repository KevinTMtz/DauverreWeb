import React, { SVGProps } from 'react';

import { ReactComponent as HealthEmoji1 } from '../../assets/emojis/health/1.svg';
import { ReactComponent as HealthEmoji2 } from '../../assets/emojis/health/2.svg';
import { ReactComponent as HealthEmoji3 } from '../../assets/emojis/health/3.svg';
import { ReactComponent as HealthEmoji4 } from '../../assets/emojis/health/4.svg';
import { ReactComponent as HealthEmoji5 } from '../../assets/emojis/health/5.svg';

interface HealthEmojiProps extends SVGProps<SVGSVGElement> {
  index: number;
}

const HealthEmoji: React.FC<HealthEmojiProps> = ({ index, ...props }) => {
  switch (index) {
    case 1:
      return <HealthEmoji1 {...props} />;
    case 2:
      return <HealthEmoji2 {...props} />;
    case 3:
      return <HealthEmoji3 {...props} />;
    case 4:
      return <HealthEmoji4 {...props} />;
    case 5:
      return <HealthEmoji5 {...props} />;
    default:
      return <div></div>;
  }
};

export default HealthEmoji;
