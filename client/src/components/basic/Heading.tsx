import React from 'react';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5;
  bold?: 'extrabold' | 'bold' | 'semibold' | 'medium' | 'normal';
  capitalize?: boolean;
  children: string;
}

const Heading: React.FC<HeadingProps> = ({ level, children, bold = 'normal', capitalize }) => {

  function renderHeading() {
    const baseClass = `${capitalize ? 'uppercase' : ''} font-${bold}`;
    switch (level) {
      case 1:
        return <h1 className={`text-4xl lg:text-6xl ${baseClass}`}>{children}</h1>;
      case 2:
        return <h2 className={`text-3xl lg:text-5xl ${baseClass}`}>{children}</h2>;
      case 3:
        return <h3 className={`text-2xl lg:text-4xl ${baseClass}`}>{children}</h3>;
      case 4:
        return <h4 className={`text-xl lg:text-3xl ${baseClass}`}>{children}</h4>;
      case 5:
        return <h5 className={`text-lg lg:text-2xl ${baseClass}`}>{children}</h5>;
      default:
        throw new Error('Invalid heading level');
    }
  }

  return renderHeading();
};

export default Heading;
