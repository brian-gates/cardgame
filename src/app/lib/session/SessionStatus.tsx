import { DefaultSession, getServerSession } from "next-auth";
import Image from "next/image";
import { SignOutButton } from "./SignOutButton";
import { SignInButton } from "./SignInButton";

export async function SessionStatus() {
  const session = await getServerSession();

  const user = session?.user;

  return (
    <>
      <div className="flex flex-row gap-3 items-center p-3 rounded-md">
        {user ? (
          <>
            <SignOutButton />
            <UserInfo user={user} />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </>
  );
}

function UserInfo({ user }: { user: DefaultSession["user"] }) {
  if (!user) return null;
  return (
    <div className="flex flex-row gap-2 items-center">
      {user.image && (
        <div className="rounded-full overflow-hidden w-8 h-8 bg-slate-600">
          <Image src={user.image} width={32} height={32} alt="user avatar" />
        </div>
      )}
      <div className="text-sm">{user.name}</div>
    </div>
  );
}
