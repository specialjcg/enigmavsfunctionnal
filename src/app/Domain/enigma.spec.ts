const setEncode = (transform: string, c, shift: number): string => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return transform + ALPHABET.charAt((ALPHABET.indexOf(c) + shift) % ALPHABET.length);
};

const increment = (shift: number): number => {
  return 1 + shift;
};

const encodeCaesar = (message: string, shift: number): string => {
  let transform = '';
  Array.from(message).map(c => {
    transform = setEncode(transform, c, shift);
    shift = increment(shift);
  });
  return transform;
};

const getEncodeOfRotor = (transform: string, c: any, rotorEnigma: string) => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return transform + rotorEnigma.charAt(ALPHABET.indexOf(c));
};

const enrotor = (message: string, rotorEnigma: string) => {
  let transform = '';
  Array.from(message).map(c => {
    transform = getEncodeOfRotor(transform, c, rotorEnigma);

  });
  return transform;
};

const getdecodeOfRotor = (transform: string, c: any, rotorEnigma: string) => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return transform + ALPHABET.charAt(rotorEnigma.indexOf(c));
};

const derotor = (message: string, rotorEnigma: string) => {
  let transform = '';
  Array.from(message).map(c => {
    transform = getdecodeOfRotor(transform, c, rotorEnigma);

  });
  return transform;
};


const getIndexAlphabet = (ALPHABET: string, c: any, shift: number) => {
  if ((ALPHABET.indexOf(c) - shift) % ALPHABET.length < 0) {
    return (ALPHABET.indexOf(c) - shift) % ALPHABET.length + ALPHABET.length;
  } else {
    return (ALPHABET.indexOf(c) - shift) % ALPHABET.length;
  }
};

const setDecode = (transform: string, c: any, shift: number) => {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return transform + ALPHABET.charAt(getIndexAlphabet(ALPHABET, c, shift));
};

const decodeCaesar = (message: string, shift: number) => {
  let transform = '';
  Array.from(message).map(c => {
    transform = setDecode(transform, c, shift);
    shift = increment(shift);
  });
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
  it('should encode caesar message to first rotor enigma', () => {
    const message = 'AAA';
    const shift = 4;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    expect(enrotor(encodeCaesar(message, shift), rotor1)).toBe('JLC');
  });
  it('should encode caesar message to two rotor enigma', () => {
    const message = 'AAA';
    const shift = 4;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    expect(enrotor(enrotor(encodeCaesar(message, shift), rotor1), rotor2)).toBe('BHD');
  });
  it('should encode caesar message to tree rotor enigma', () => {
    const message = 'AAA';
    const shift = 4;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    expect(enrotor(enrotor(enrotor(encodeCaesar(message, shift), rotor1), rotor2), rotor3)).toBe('KQF');
  });
  it('should encode WEATHERREPORTWINDYTODAY to ALWAURKQEQQWLRAWZHUYKVN', () => {
    const message = 'WEATHERREPORTWINDYTODAY';
    const shift = 7;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    expect(enrotor(enrotor(enrotor(encodeCaesar(message, shift), rotor1), rotor2), rotor3)).toBe('ALWAURKQEQQWLRAWZHUYKVN');
  });

  it('should decode PQSACVVTOISXFXCIAMQEM to EVERYONEISWELCOMEHERE', () => {
    const message = 'PQSACVVTOISXFXCIAMQEM';
    const shift = 9;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    expect(decodeCaesar(derotor(derotor(derotor(message, rotor3), rotor2), rotor1), shift)).toBe('EVERYONEISWELCOMEHERE');
  });
  it('should ENCODE EVERYONEISWELCOMEHERE to PQSACVVTOISXFXCIAMQEM', () => {
    const message = 'EVERYONEISWELCOMEHERE';
    const shift = 9;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    expect(enrotor(enrotor(enrotor(encodeCaesar(message, shift), rotor1), rotor2), rotor3)).toBe('PQSACVVTOISXFXCIAMQEM');

  });
  it('should ENCODE EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE to PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV', () => {
    const message = 'EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE';
    const shift = 9;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    expect(enrotor(enrotor(enrotor(encodeCaesar(message, shift), rotor1), rotor2), rotor3)).toBe('PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV');

  });
  it('should DECODE XPCXAUPHYQALKJMGKRWPGYHFTKRFFFNOUTZCABUAEHQLGXREZ to THEQUICKBROWNFOXJUMPSOVERALAZYSPHINXOFBLACKQUARTZ', () => {
    const message = 'XPCXAUPHYQALKJMGKRWPGYHFTKRFFFNOUTZCABUAEHQLGXREZ';
    const shift = 5;
    const rotor1 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    expect(decodeCaesar(derotor(derotor(derotor(message, rotor3), rotor2), rotor1), shift)).toBe('THEQUICKBROWNFOXJUMPSOVERALAZYSPHINXOFBLACKQUARTZ');
  });

});
