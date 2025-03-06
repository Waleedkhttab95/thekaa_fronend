export const getAvatarInitials = (name: string): string => {
  const nameParts = name.trim().split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
  return initials || "??";
};
