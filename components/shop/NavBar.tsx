import Link from 'next/link';
import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div>
        <a href="/"> PYME</a>
      </div>
      <div className="link_container">
        <Link href="/search">Search</Link>
        <Link href="shop/cart">Cart</Link>

        <SignedOut>
          {/* @ts-ignore */}
          <SignInButton className="filled_button">
            <div>
              <span aria-hidden="true">Sign In</span>
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default NavBar;
