import Link from 'next/link';
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <header data-theme="cupcake">
      <nav aria-label="Main navigation" className="justify-between bg-base-300">
        <div className="bg-white navbar">
          <Link href="/" className="btn btn-accent text-lg">
            <span aria-hidden="true">Pyme</span>
          </Link>
          <div className="flex items-center border-2 rounded-full py-2 px-3">
            <input
              aria-label="search"
              className="bg-transparent focus:outline-none mr-2"
              type="text"
              placeholder="Search..."
            />
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <ul className="flex space-x-4">
            <SignedOut>
              <li>
             {/* @ts-ignore */}
                <SignInButton className="btn btn-secondary rounded-btn">  
                  <div>
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span aria-hidden="true">Sign In</span>
                  </div>
                </SignInButton>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <Link className="btn btn-primary rounded-btn" href="/shop/cart">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  <span aria-hidden="true">Cart</span>
                </Link>
              </li>
              <li>
                <UserButton />
              </li>
            </SignedIn>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;