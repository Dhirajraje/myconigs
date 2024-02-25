import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const _navigate = useNavigate()
	return <div className="min-h-screen w-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
		<div className="relative py-3 sm:max-w-xl sm:mx-auto">
			<div
				className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
			</div>
			<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
				<div className="max-w-md mx-auto">
					<div>
						<h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
					</div>
					<div className="divide-y divide-gray-200">
						<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="username">Username</Label>
								<Input type="username" id="username" placeholder="Username" />
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Label htmlFor="password">Password</Label>
								<Input type="password" id="password" placeholder="Password" />
							</div>
							<div className="grid w-full max-w-sm items-center gap-1.5">
								<Button className="bg-indigo-600" >Submit</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

}