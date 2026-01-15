export default function Home() {
  return (
    <>
      <div className="page-container">
        <div className=" bg-red-500 text-white p-4 text-center">
          Tailwind v4 安装成功！
        </div>

        <div className="flex gap-4 p-4 border border-gray-300">
          <div>
            <button className="bg-blue-500 text-white p-2">1 Button</button>
          </div>

          <div>
            <button className="bg-green-500 text-white p-2">2 Button</button>
          </div>
        </div>
      </div>
    </>
  );
}
