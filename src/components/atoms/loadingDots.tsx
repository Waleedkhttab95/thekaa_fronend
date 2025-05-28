export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center space-x-1 mx-1">
      <span className="w-2 h-2 bg-black rounded-full animate-dot-bounce" />
      <span className="w-2 h-2 bg-black rounded-full animate-dot-bounce [animation-delay:0.2s]" />
      <span className="w-2 h-2 bg-black rounded-full animate-dot-bounce [animation-delay:0.4s]" />
    </div>
  );
}
