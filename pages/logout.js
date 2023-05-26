import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Logout() {
  const router = useRouter();
  const { user, status, logout } = useAuth();

  useEffect(() => {
    if( router.isReady)
    if (status == "authenticated") {
      logout();
    } else if (status == "unauthenticated") {
      router.push("/");
    }
  }
    , [status, router]);
  return (<div></div>)
}
