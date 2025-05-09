import EditProfileForm from "../organisms/EditProfileForm";

const StudentProfilePage = () => {
  return (
    <div className="bg-[url('/student-profile-bg.png')] bg-cover rounded-[40px] h-[744px] flex flex-col items-center justify-center">
      <EditProfileForm />
    </div>
  );
};
export default StudentProfilePage;
