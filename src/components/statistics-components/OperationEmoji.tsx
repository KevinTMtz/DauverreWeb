import React, { SVGProps } from 'react';

import { ReactComponent as OperationEmoji1 } from '../../assets/emojis/operation/1.svg';
import { ReactComponent as OperationEmoji2 } from '../../assets/emojis/operation/2.svg';
import { ReactComponent as OperationEmoji3 } from '../../assets/emojis/operation/3.svg';

interface OperationEmojiProps extends SVGProps<SVGSVGElement> {
  index: OneToThreeIdx;
}

const OperationEmoji: React.FC<OperationEmojiProps> = ({ index, ...props }) => {
  switch (index) {
    case 1:
      return <OperationEmoji1 {...props} />;
    case 2:
      return <OperationEmoji2 {...props} />;
    case 3:
      return <OperationEmoji3 {...props} />;
  }
};

export default OperationEmoji;
