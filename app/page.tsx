import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const name = "";

  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  return (
         <div className="flex h-full w-screen items-center justify-center py-5">
      <UserButton showName />
    </div>
  );
}
