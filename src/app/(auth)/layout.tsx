export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center bg-orange-400 h-screen w-screen font-pingar">
      {children}
    </div>
  );
}
