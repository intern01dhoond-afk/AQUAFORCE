import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4 text-center">
      <h1 className="text-6xl font-black text-[#0080ff] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-slate-400 max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#0066cc] hover:bg-[#0055b3] text-white text-xs font-black tracking-wider uppercase px-7 py-3.5 rounded-[4px] shadow-xl transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
