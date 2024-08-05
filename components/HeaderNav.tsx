import Link from "next/link";
import Button from "./Button";
import UserAvatar from "./UserAvatar";
import { currentUser } from "@/lib/actions";

export default async function HeaderNav() {
  const user = await currentUser();

  return (
    <div className="sticky top-0 left-0 w-full bg-white/95 py-3 backdrop-blur-sm z-50 border-b border-color-border-subtle">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/">VenueBnB</Link>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/search">Search</Link>
          </div>
          <div className="flex items-center gap-x-4">
            {user === null ? (
              <div className="flex gap-x-1">
                <Button
                  title="Log ind"
                  href={"/login"}
                  rounded={true}
                  size="small"
                  variant="secondary"
                />
                <Button
                  title="Opret"
                  href={"/register"}
                  rounded={true}
                  size="small"
                  variant="primary"
                />
              </div>
            ) : (
              <UserAvatar user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
