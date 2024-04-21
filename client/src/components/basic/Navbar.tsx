import React from 'react';
import Link from 'next/link';

import ProfileMenu from '../auth/ProfileMenu';

type NavbarProps = {
  links: { href: string; label: string }[];
}

/**
 * Generic navbar component.
 * Display links and user dropdown.
 * 
 * Props:
 *  - links: Array of objects with href and label for Next.js Link components
 * 
 * Usage:
 * <Navbar links={[
 *   { href: '/home', label: 'Home' },
 *   { href: '/about', label: 'About' },
 *   { href: '/contact', label: 'Contact' }
 * ]} />
 */
const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <div className="bg-black text-white p-2.5 flex justify-between items-center h-12">
      <div className="flex-grow">
        {links.map(link => (
          <Link key={link.href} href={link.href} passHref>
            <a className="text-white no-underline px-2.5 hover:text-gray-300"> {link.label} </a>
          </Link>
        ))}
      </div>
      <ProfileMenu />
    </div>
  )
};

export default Navbar;
