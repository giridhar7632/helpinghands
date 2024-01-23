import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'

export default function AuthDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='outline'>Open Drawer</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>Login</DrawerTitle>
						<DrawerDescription>
							Welcome to helping hands network.
						</DrawerDescription>
					</DrawerHeader>
					<div className='p-4 pb-0'></div>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
