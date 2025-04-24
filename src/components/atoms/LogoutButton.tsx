import { Button } from "./button";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      deleteCookie("Authentication");
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button onClick={handleLogout} className="w-60">
      Logout
    </Button>
  );
}
