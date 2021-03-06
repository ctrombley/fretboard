
const intervalRegex = /^\s*([pPmMdDb♭𝄫aA#♯']{0,2})([\d]{1})\s*$/;

const perfectTones = ['4', '5', '8'];

/* eslint-disable quote-props */

const tones = {
  '1': 0,
  '2': 2,
  '3': 4,
  '4': 5,
  '5': 7,
  '6': 9,
  '7': 11,
  '8': 12,
};

const modifiers = {
  'p': 0,
  'P': 0,
  'M': 0,
  'a': 1,
  'A': 1,
  '♯': 1,
  '#': 1,
  'm': -1,
  'b': -1,
  '♭': -1,
  '𝄫': -2,
  'bb': -2,
  'd': -2,
  'D': -2,
};

/* eslint-enable quote-props */

export default class Interval {
  constructor(input) {
    if (!input) {
      this.value = 0;
    }

    if (input instanceof Interval) {
      this.semitones = input.semitones;
    }

    if (typeof input === 'string') {
      this.parseString(input);
    }
    if (typeof input === 'number') {
      this.parseNumber(input);
    }
    if (typeof input === 'object') {
      this.parseOpts(input);
    }
  }

  parseString(intervalStr) {
    let match;
    let modifier;
    let tone;

    try {
      [match, modifier, tone] = intervalStr.match(intervalRegex);
    } catch (e) {
      throw new Error(`Invalid interval string: ${intervalStr}`);
    }

    if (!match || !tone || (modifier && modifiers[modifier] === undefined)) {
      throw new Error(`Invalid interval string: ${intervalStr}`);
    }

    let semitones = tones[tone];

    if (modifier) {
      if (modifier.toLowerCase() === 'd' &&
        perfectTones.includes(tone)) {
        semitones -= 1;
      } else {
        semitones += modifiers[modifier];
      }
    }

    this.semitones = semitones;
  }

  parseNumber(value) {
    this.semitones = value;
  }

  parseOpts(opts) {
    this.opts = opts;
  }
}
