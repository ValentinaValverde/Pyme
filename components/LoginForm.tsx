'use client'
import React from 'react'
import { userLogin } from '@/utils/actions/userActions'

const LoginForm = () => {
	return (
		<form action={userLogin}>
			<div className='join w-full'>
				<input
					className='input input-bordered join-item w-full'
					placeholder='username'
					type='text'
					name='username'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='password'
					type='password'
					name='password'
					required
				/>
				<button type='submit' className='btn join-item btn-primary'>
					Signin
				</button>
			</div>
		</form>
	)
}

export default LoginForm
