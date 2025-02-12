import {N2WordsRU} from './RU.mjs';

export class N2WordsLT extends N2WordsRU {
  constructor() {
    super();

    this.negativeWord = 'minus';
    this.separatorWord = 'kablelis';
    this.feminine = false;
    this.zero = 'nulis';
    this.ones = {
      1: 'vienas',
      2: 'du',
      3: 'trys',
      4: 'keturi',
      5: 'penki',
      6: 'šeši',
      7: 'septyni',
      8: 'aštuoni',
      9: 'devyni'
    };
    this.onesFeminine = {
      1: 'viena',
      2: 'dvi',
      3: 'trys',
      4: 'keturios',
      5: 'penkios',
      6: 'šešios',
      7: 'septynios',
      8: 'aštuonios',
      9: 'devynios'
    };
    this.tens = {
      0: 'dešimt',
      1: 'vienuolika',
      2: 'dvylika',
      3: 'trylika',
      4: 'keturiolika',
      5: 'penkiolika',
      6: 'šešiolika',
      7: 'septyniolika',
      8: 'aštuoniolika',
      9: 'devyniolika'
    };
    this.twenties = {
      2: 'dvidešimt',
      3: 'trisdešimt',
      4: 'keturiasdešimt',
      5: 'penkiasdešimt',
      6: 'šešiasdešimt',
      7: 'septyniasdešimt',
      8: 'aštuoniasdešimt',
      9: 'devyniasdešimt'
    };
    this.hundreds = ['šimtas', 'šimtai'];
    this.thousands = {
      1: ['tūkstantis', 'tūkstančiai', 'tūkstančių'],
      2: ['milijonas', 'milijonai', 'milijonų'],
      3: ['milijardas', 'milijardai', 'milijardų'],
      4: ['trilijonas', 'trilijonai', 'trilijonų'],
      5: ['kvadrilijonas', 'kvadrilijonai', 'kvadrilijonų'],
      6: ['kvintilijonas', 'kvintilijonai', 'kvintilijonų'],
      7: ['sikstilijonas', 'sikstilijonai', 'sikstilijonų'],
      8: ['septilijonas', 'septilijonai', 'septilijonų'],
      9: ['oktilijonas', 'oktilijonai', 'oktilijonų'],
      10: ['naintilijonas', 'naintilijonai', 'naintilijonų'],
    };
  }

  pluralize(n, forms) {
    let form = 1;
    const [n1, n2] = this.getDigits(n);
    if (n2 == 1 || n1 == 0 || n == 0) {
      form = 2;
    } else if (n1 == 1) {
      form = 0;
    }
    return forms[form];
  }

  toCardinal(number) {
    if (parseInt(number) == 0) {
      return this.zero;
    }
    const words = [];
    const chunks = this.splitByX(JSON.stringify(number), 3);
    let i = chunks.length;
    for (let j = 0; j < chunks.length; j++) {
      const x = chunks[j];
      i = i - 1;
      if (x == 0) {
        continue;
      }
      const [n1, n2, n3] = this.getDigits(x);
      if (n3 > 0) {
        words.push(this.ones[n3]);
        if (n3 > 1) {
          words.push(this.hundreds[1]);
        } else {
          words.push(this.hundreds[0]);
        }
      }
      if (n2 > 1) {
        words.push(this.twenties[n2]);
      }
      if (n2 == 1) {
        words.push(this.tens[n1]);
      } else if (n1 > 0) {
        if ((i == 1 || this.feminine && i == 0) && number < 1000) {
          words.push(this.onesFeminine[n1]);
        } else {
          words.push(this.ones[n1]);
        }
      }
      if (i > 0) {
        words.push(this.pluralize(x, this.thousands[i]));
      }
    }
    return words.join(' ');
  }
}

export default function(n) {
  return new N2WordsLT().floatToCardinal(n);
}
