import Link from 'next/link';
import React from 'react';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Bag from '../../public/images/bags/DarkFourSquares.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <nav className="footer">
      <div>
        <Image src={Bag} alt="bag" className="image" />
      </div>
      <div className="container">
        <p>Want to sell on Pyme?</p>
        <SignedOut>
          {/* @ts-ignore */}
          <SignInButton className="filled_button">
            <div>
              <span aria-hidden="true">Sign Up Here!</span>
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignInButton className="filled_button">
            <div>
              <span aria-hidden="true">Sign In Here!</span>
            </div>
          </SignInButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Footer;
