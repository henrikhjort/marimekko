import React from 'react';

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5;
  bold?: 'extrabold' | 'bold' | 'semibold' | 'medium' | 'normal';
  capitalize?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Generic heading component,
 * Renders <h1> to <h5> based on level prop.
 * 
 * Props:
 *  - level: 1 | 2 | 3 | 4 | 5
 *  - bold: tailwindcss font class value
 *  - capitalize: capitalize all letters when true
 *  - children: React.ReactNode
 *  - className: optional tailwindcss classnames
 * 
 * Usage:
 * <Heading
 *  level={1}
 *  bold="extrabold"
 *  capitalize={true}
 *  className="mb-4"
 * >
 *  This is a H1 title with extra bold font, capitalized letters and margin bottom 4
 * </Heading>
 */
const Heading: React.FC<HeadingProps> = ({ level, children, bold = 'normal', capitalize, className }) => {

  function renderHeading() {
    const baseClass = `${className} ${capitalize ? 'uppercase' : ''} font-${bold}`;
    switch (level) {
      case 1:
        return <h1 className={`text-3xl md:text-5xl lg:text-6xl ${baseClass}`}>{children}</h1>;
      case 2:
        return <h2 className={`text-2xl md:text-4xl lg:text-5xl ${baseClass}`}>{children}</h2>;
      case 3:
        return <h3 className={`text-xl md:text-3xl lg:text-4xl ${baseClass}`}>{children}</h3>;
      case 4:
        return <h4 className={`text-lg md:text-2xl lg:text-3xl ${baseClass}`}>{children}</h4>;
      case 5:
        return <h5 className={`text-base md:text-xl lg:text-2xl ${baseClass}`}>{children}</h5>;
      default:
        throw new Error('Invalid heading level');
    }
  }

  return renderHeading();
};

export default Heading;
