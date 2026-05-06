import { calculateDialogueLength } from '../functions/calculateDialogueLength';

describe('calculateDialogueLength', () => {
    it('returns length of a simple string', () => {
        expect(calculateDialogueLength('hello')).toBe(5);
    });

    it('returns 0 for an empty string', () => {
        expect(calculateDialogueLength('')).toBe(0);
    });

    it('counts spaces as characters', () => {
        expect(calculateDialogueLength('hello world')).toBe(11);
    });

    it('counts special characters', () => {
        expect(calculateDialogueLength('!@#$%')).toBe(5);
    });

    it('handles a single-character string', () => {
        expect(calculateDialogueLength('x')).toBe(1);
    });

    it('returns 0 for an array of empty strings', () => {
        expect(calculateDialogueLength(['', ''])).toBe(0);
    });

    it('returns the length of a single-element array', () => {
        expect(calculateDialogueLength(['hello'])).toBe(5);
    });

    it('returns the sum of a two-element array', () => {
        expect(calculateDialogueLength(['ab', 'cd'])).toBe(4);
    });

    it('returns the sum of a three-element array', () => {
        expect(calculateDialogueLength(['a', 'bb', 'ccc'])).toBe(6);
    });

    it('returns the correct sum for mixed-length array elements', () => {
        expect(calculateDialogueLength(['hello', 'world'])).toBe(10);
    });
});
