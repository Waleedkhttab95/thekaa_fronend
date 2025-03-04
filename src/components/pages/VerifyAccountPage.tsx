import VerifyAccountHeader from "../atoms/VerifyAccountHeader";
import AuthLayout from "../layouts/AuthLayout";
import VerifyAccountForm from "../organisms/VerifyAccountForm";

const VerifyAccountPage = () => {
  return (
    <AuthLayout headerTitle={<VerifyAccountHeader />}>
      <VerifyAccountForm />
    </AuthLayout>
  );
};
export default VerifyAccountPage;
