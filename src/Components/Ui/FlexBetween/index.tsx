import React from 'react';

type FlexBetweenProps = {
  children: React.ReactNode;
  style?: Object;
};

const FlexBetween = ({ children, style }: FlexBetweenProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>{children} </div>
  );
};

export default FlexBetween;
