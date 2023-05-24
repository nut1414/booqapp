import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Logout() {
  const router = useRouter();
  const { user, status, logout } = useAuth();

  useEffect(() => {
    if (status == "authenticated") {
      logout();
      router.push("/");
    } else if (status == "unauthenticated") {
      router.push("/");
    }
  }
    , [status]);
  return (<div></div>)
}
