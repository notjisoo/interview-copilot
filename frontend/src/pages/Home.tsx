import UserProfileForm from "@/components/UserProfileForm";
import { Button } from "antd-mobile";

export default function Home() {
  return (
    <>
      <div className="page-container">
        <div className=" bg-red-500 text-white p-4 text-center">
          Tailwind v4 Install successfully!
        </div>

        <div className="flex gap-4 p-4 border border-gray-300">
          <div>
            <Button color="primary" fill="outline">
              1 Button
            </Button>
            <Test />
          </div>

          <div>
            <Button color="primary" fill="outline">
              None
            </Button>
          </div>
        </div>

        <UserProfileForm />
      </div>
    </>
  );
}

// 内部组件
function Test() {
  return (
    <>
      <div>
        <Button color="primary" fill="outline">
          Test
        </Button>
      </div>
    </>
  );
}
