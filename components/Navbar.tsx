import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <p>Pyme</p>
        <div className="button_container">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </>
  );
}
