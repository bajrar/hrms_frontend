import React from 'react';
import './backdrop.css';

type BackdropProps = {
  children: React.ReactNode;
};
const Backdrop = ({ children }: BackdropProps) => {
  return <div className="backdrop">{children}</div>;
};

export default Backdrop;
