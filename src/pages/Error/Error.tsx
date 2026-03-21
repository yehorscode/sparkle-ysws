import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
// example: /error?code=404&message=Not%20found
export default function ErrorPage() {
	const [searchParams] = useSearchParams();
	const code = searchParams.get("code") || "???";
	const message = searchParams.get("message") || "Some error happened now!!";
	const navigate = useNavigate();

	return (
		<div className="text-center font-dynapuff min-w-screen min-h-screen flex items-center justify-center">
			<div className=" p-8 rounded-lg text-white">
				<h1 className="text-6xl font-bold mb-4">{code}</h1>
				<p className="text-xl">{message}</p>
				<button onClick={() => navigate("/")} className="p-2 px-5 bg-green-600 mt-4 border-4 border-black/50 hover:scale-95 transition-all transition-75 hover:cursor-pointer">Return home</button>
			</div>
		</div>
	)
}