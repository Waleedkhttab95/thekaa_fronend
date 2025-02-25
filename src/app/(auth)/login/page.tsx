import { Button } from "@/components/atoms/button";
import GoogleLoginButton from "@/components/atoms/googleLoginButton";

const LoginPage = () => {
  return (
    <div className="flex">
      <Button className="md:w-[487px] h-[56px] text-base">تسجيل الدخول</Button>
      <GoogleLoginButton />
    </div>
  );
};
export default LoginPage;
