import AuthButton from "@/components/atoms/AuthButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col">
      <AuthButton authButtonType="basic">
        تسجيل الدخول
      </AuthButton>
      <AuthButton authButtonType="google" />
    </div>
  );
};
export default LoginPage;
