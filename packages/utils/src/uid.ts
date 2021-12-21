let IDX: number = 36,
  HEX: string = '';
while (IDX--) HEX += IDX.toString(36);

export const uid = (len?: number): string => {
  let str = '',
    num = len || 11;
  while (num--) str += HEX[(Math.random() * 36) | 0];
  return str;
};
