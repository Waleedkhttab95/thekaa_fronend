import { Button } from "@/components/atoms/button";
import GoogleButton from "@/components/atoms/GoogleButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col">
      <Button>تسجيل الدخول</Button>
      <GoogleButton />
    </div>
  );
};
export default LoginPage;
