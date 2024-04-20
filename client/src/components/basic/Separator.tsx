import React from 'react';

type SeparatorProps = {
  hideOnMobile?: boolean;
};

const Separator: React.FC<SeparatorProps> = ({ hideOnMobile }) => {

  /**
   * Generate classnames to hide on mobile
   * 
   * @returns display: none on mobile if hideOnMobile is true
   */
  function hide() {
    if (hideOnMobile) {
      return "md:flex hidden"
    } else {
      return "flex"
    }
  }

  return (
    <hr className={`border-t-2 border-brand-black my-4 mx-auto w-full ${hide()}`} />
  )
};

export default Separator;
