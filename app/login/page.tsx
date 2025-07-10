import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const currentUser = await getCurrentUser().catch(() => {});
  if (currentUser) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <div className="bg-primary flex w-2/5 justify-center rounded-r-xl">
        <div className="flex flex-col justify-center gap-12">
          <div className="flex flex-col gap-4 text-white">
            <h1 className="text-2xl font-bold">MyList</h1>
            <h1 className="text-4xl font-bold">以最佳方式管理个人文件</h1>
            <p>存放所有文档的完美场所</p>
          </div>
          <Image
            src="/images/files.png"
            width={342}
            height={342}
            alt="files"
            className="transition-all hover:scale-105 hover:rotate-2"
          />
        </div>
      </div>

      <div className="flex flex-1 justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
