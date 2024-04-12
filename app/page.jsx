import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-200 text-gray-800">
      <div className="container mx-auto p-6 sm:p-12">
        <div className="border-b-2 mb-8 border-gray-800">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
              Welcome To Your Film List
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-6">
              Your personal space to curate and manage a watchlist of your favorite films. 
              Sign in to create, view, edit, and delete items from your watchlist.
          </p>
          </div>
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg text-gray-800">
              <AuthForm />
          </div>
      </div>
    </div>   
  );
}
