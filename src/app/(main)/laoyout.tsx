import { useUser } from "@/providers/user.provider";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  console.log("user....", user);

  return (
    <div className="bg-[#07080a]">
      <main>{children}</main>
    </div>
  );
};

export default layout;
