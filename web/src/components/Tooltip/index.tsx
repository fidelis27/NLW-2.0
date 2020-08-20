import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  return (
    <Container>
      <span>
        {children}
        {title}
      </span>
    </Container>
  );
};

export default Tooltip;
