export default function RepositoriesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">项目仓库</h1>
      <div className="grid gap-4">
        {/* GitHub API集成需替换为Remix loader实现 */}
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">项目名称</h3>
          <p className="text-gray-600">项目描述信息</p>
        </div>
      </div>
    </div>
  );
}