import Button from "@/components/Button";
import { currentUser, deleteAccount, updateUser } from "@/lib/actions";
import { User } from "@prisma/client";

export default async function Page() {
  const user = await currentUser();

  return (
    <form className="max-w-[450px] p-12">
      <h1 className="h2">Min konto</h1>
      <div className="my-6 flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-1">
            <label>Email</label>
            <input
              disabled
              type="text"
              value={user?.email}
              placeholder="Email"
              className="bg-color-background-subtle opacity-50 border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="name">Navn</label>
            <input
              type="text"
              placeholder="Navn"
              name="name"
              defaultValue={user?.name || ""}
              className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-1">
            <label htmlFor="role">Rolle</label>
            <select
              name="role"
              defaultValue={user?.role || "USER"}
              className="bg-color-background-subtle border flex-grow border-color-border p-3 rounded-xl outline-none focus:bg-white focus:border-secondary transition-all w-full"
            >
              <option value="USER">Lejer</option>
              <option value="LANDLORD">Udlejer</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 font-medium">
        <Button
          variant="success"
          title="Gem ændringer"
          type="submit"
          className="mt-4"
          formAction={updateUser}
        />
        <Button
          variant="danger"
          title="Slet"
          type="submit"
          className="mt-4"
          formAction={deleteAccount}
        />
      </div>
    </form>
  );
}
