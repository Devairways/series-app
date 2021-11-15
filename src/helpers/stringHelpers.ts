export const truncateString = (string: string, chars: number): string => {
  if (!string || string.length <= chars) {
    return string ?? '';
  }
  return `${string.substring(0, chars)}...`;
};

export const stringToArray = (string: string) => {
  if (!string) return [];

  return string.split(', ');
};
