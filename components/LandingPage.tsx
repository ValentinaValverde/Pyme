import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Navbar from './Navbar';

export default function LangingPage() {
  return (
    <>
      <Navbar />
      <div className="landing_page_div">
        <p>welcome to</p>
        <h1>Pyme</h1>
        <p>the marketplace for small businesses.</p>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
