import LangingPage from '../components/LandingPage'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Home() {
	return (
		<main className=''>
			<LangingPage />
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</main>
	)
}
