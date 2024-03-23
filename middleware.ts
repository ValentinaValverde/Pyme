import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const _dev = process.env.PROTECTED_ROUTES

const isProtectedRoute = createRouteMatcher([
	'/createstore(.*)',
	'/mystore(.*)'
])

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req) && _dev == 'on') auth().protect()
})

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
