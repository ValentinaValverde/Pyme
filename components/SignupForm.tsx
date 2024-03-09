'use client'
import React from 'react'
import { createUser } from '@/utils/actions/userActions'

const SignupForm = () => {
	return (
		<form action={createUser}>
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
					placeholder='email'
					type='email'
					name='email'
					required
				/>
				<input
					className='input input-bordered join-item w-full'
					placeholder='password'
					type='password'
					name='password'
					required
				/>
				<input type='hidden' name='role' value={'Buisness'} />
				<button type='submit' className='btn join-item btn-primary'>
					Sign Up
				</button>
			</div>
		</form>
	)
}

export default SignupForm
