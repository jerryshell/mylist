import { getCurrentUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

const UserInfoCard = async () => {
  const currentUser = await getCurrentUser().catch(() => redirect("/login"));

  return (
    <div className="mt-4 flex items-center gap-2 p-4 text-neutral-800">
      <Image
        src="/images/avatar.png"
        alt="avatar"
        width={44}
        height={44}
        className="aspect-square w-10 rounded-full object-cover"
      />
      <div className="w-full truncate">
        <p>欢迎</p>
        <p className="truncate text-sm font-semibold">{currentUser.email}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
