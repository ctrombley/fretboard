import chords from './chords';
import Note from './Note';

const chordRegex = /^\s*([A-Ga-g]{1}[♮#♯𝄪b♭𝄫]{0,2})\s*([\w°øΔ⑦♭♯+\-\s]+?)\s*$/;

export default class Chord {
  constructor(input) {
    if (!input) {
      this.notes = [];
    }

    if (typeof input === 'string') {
      this.parseString(input);
    }
    if (typeof input === 'object') {
      this.parseOpts(input);
    }
  }

  static createNoteFromInterval(root, interval) {
    return new Note(new Note(root).add(interval).baseSemitones);
  }

  parseString(chordStr) {
    let match;
    let root;
    let chord;

    try {
      [match, root, chord] = chordStr.match(chordRegex);
    } catch (e) {
      throw new Error(`Invalid chord string: ${chordStr}`);
    }

    if (!match || !root || (chords && !chords[chord])) {
      throw new Error(`Invalid chord string: ${chordStr}`);
    }

    this.name = chordStr;
    this.type = 'Chord';
    this.root = new Note(root);

    const chordIntervals = chords[chord];
    this.notes = chordIntervals.map(interval => Chord.createNoteFromInterval(root, interval));
  }

  semitones() {
    return this.notes.map(n => n.semitones);
  }
}
