"use client";

import Link from "next/link";
import LogoIcons from "./icons/logo-icons";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import SignOutButton from "./auth-components/sign-out-button";
import { Button } from "./ui/button";
import { useEffect } from "react";
import UploadExcelSeet from "./upload/upload-excel-seet";

export default function Header() {
  const { data: session, status: sessionStatus } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/auth/sign-in" && sessionStatus === "unauthenticated") {
      router.replace("/auth/sign-in?callbackUrl=/");
    }
  }, [sessionStatus, router, pathname]);

  return (
    <header
      className={cn(
        "bg-zinc-100 px-8 text-slate-800 fixed border-b border-s-zinc-200 w-full z-10 top-0",
        {
          hidden: ["/auth/sign-in"].includes(pathname),
        }
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <LogoIcons />
        </Link>
        <nav className="flex items-center gap-8 text-base">
          <div className={"flex gap-4 text-sm items-center"}>
            {session?.user?.role === "admin" ? (
              <>
                <Link
                  href={"/"}
                  className="px-3 py-2 border hover:rounded-lg hover:bg-white hover:border-slate-400"
                >
                  Home
                </Link>
                <UploadExcelSeet />
                <Link
                  href={"/create-user"}
                  className="px-3 py-2 border hover:rounded-lg hover:bg-white hover:border-slate-400"
                >
                  CREATE USER
                </Link>
              </>
            ) : (
              <h2 className="text-base font-semibold">
                RailTel IBW Customer List
              </h2>
            )}
          </div>
        </nav>
        {session?.user ? (
          <div className="flex flex-col items-center gap-1 text-[.6rem] font-medium">
            <SignOutButton />
          </div>
        ) : (
          <Button asChild>
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
