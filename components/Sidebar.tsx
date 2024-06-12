import React from 'react'
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@mui/material'

import CategoryIcon from '@mui/icons-material/Category'
import HomeIcon from '@mui/icons-material/Home'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import Link from 'next/link'
import { SignedIn, UserButton } from '@clerk/nextjs'

const drawerWidth = 240

const Sidebar = ({ storeSlug }: { storeSlug: string }) => {
	return (
		<Drawer
			variant='permanent'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box'
				}
			}}
			role="navigation"
      aria-label="Sidebar navigation"
		>
			<List>
				<Link href={`/mystore/${storeSlug}`}>
					<ListItem button key='Home' aria-label="Go to Home">
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Home' />
					</ListItem>
				</Link>
				<Link href={`/mystore/${storeSlug}/products`}>
					<ListItem button key='Products' aria-label="Go to Products">
						<ListItemIcon>
							<CategoryIcon />
						</ListItemIcon>
						<ListItemText primary='Products' />
					</ListItem>
				</Link>
				<Link href={`/mystore/${storeSlug}/info`}>
					<ListItem button key='Store Details' aria-label="Go to Store Details">
						<ListItemIcon>
							<BusinessCenterIcon />
						</ListItemIcon>
						<ListItemText primary='Store Details' />
					</ListItem>
				</Link>
				<ListItem button key='Customers' aria-label="Go to Customers">
					<ListItemIcon>
						<PeopleAltIcon />
					</ListItemIcon>
					<ListItemText primary='Customers' />
				</ListItem>
				<Link href={`/mystore/${storeSlug}/orders`}>
					<ListItem button key='Orders' aria-label="Go to Orders">
						<ListItemIcon>
							<ShoppingCartIcon />
						</ListItemIcon>
						<ListItemText primary='Orders' />
					</ListItem>
				</Link>
				<ListItem button key='Profile' aria-label="Go to Profile">
					<SignedIn>
						<UserButton />
					</SignedIn>
				</ListItem>
			</List>
		</Drawer>
	)
}

export default Sidebar
