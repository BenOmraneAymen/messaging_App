import { getUserById } from "@/api/auth";
import { IUser } from "@/interfaces/Iuser";
import { useEffect, useState } from "react";

export default function Avatar({
  sender,
  style,
}: {
  sender: string;
  style: string;
}) {

  const [user, setUser] = useState({} as IUser);

  function initials(name: string) {
    let initials = name?.toUpperCase().split(" ");
    if (initials) {
      if (initials.length > 1) {
        return initials[0][0] + initials[1][0];
      } else {
        return initials[0][0];
      }
    }
    return "no";
  }

  useEffect(() => {
    getUserById(sender).then((res: any) => {
      setUser(res.data[0]);
    })
  },[])

  useEffect(() => {
    console.log("user",user)
  },[user])

  return (
    <div
      className={
        "relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full " +
        style
      }
    >
      <span className="font-medium">{initials(user.username)}</span>
    </div>
  );
}
