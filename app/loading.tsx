export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading KnowYourRights AI</h2>
          <p className="text-white text-opacity-70">Preparing your legal guidance...</p>
        </div>
      </div>
    </div>
  );
}
