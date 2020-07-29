const encodeCaesar = (message: string, shift: number): string => {
  let transform = '';
  const CHARCODEFORA = 65;
  const ALPHABETNUMBER = 26;
  for (const c of message) {
    transform += String.fromCharCode((c.charCodeAt(0) + shift++ - CHARCODEFORA) % ALPHABETNUMBER + CHARCODEFORA);

  }
  return transform;
};

describe('Encode and decode Enigma message', () => {
  it('should Caesar shift is applied AAA using an incrementing number 4', () => {
    const message = 'AAA';
    const shift = 4;

    expect(encodeCaesar(message, shift)).toBe('EFG');
  });
  it('should Caesar shift is applied ZZZ using an incrementing number 2', () => {
    const message = 'ZZZ';
    const shift = 2;

    expect(encodeCaesar(message, shift)).toBe('BCD');
  });
});
