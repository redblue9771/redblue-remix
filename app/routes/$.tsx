export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">页面未找到</p>
      <a href="/" className="text-blue-600 hover:underline">
        返回首页
      </a>
    </div>
  );
}