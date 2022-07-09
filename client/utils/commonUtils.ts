export const capitalize = (name: string) => {
  if (name) return name[0].toUpperCase() + name.slice(1);
};

export const splitName = (name: string) => {
  return capitalize(name?.split(" ")[0]);
};
