import { getNextNode } from '../functions/getNextNode';
import type { GetCondition } from '../types';

const cond = (name: string, type: GetCondition['type'], value: boolean | number, node: string): GetCondition =>
    ({ name, type, value, node });

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    jest.restoreAllMocks();
});

describe('getNextNode', () => {
    it('returns false when next is undefined', () => {
        expect(getNextNode({}, undefined, {})).toBe(false);
    });

    it('returns the node ID when next is a string', () => {
        expect(getNextNode({}, 'nodeA', {})).toBe('nodeA');
    });

    it('returns string next even when context is non-empty', () => {
        expect(getNextNode({}, 'nodeB', { x: 1 })).toBe('nodeB');
    });

    it('returns node of the first matching condition', () => {
        const next = [cond('x', 'eq', 1, 'nodeA'), cond('x', 'eq', 2, 'nodeB')];
        expect(getNextNode({}, next, { x: 1 })).toBe('nodeA');
    });

    it('falls through to the second condition when first fails', () => {
        const next = [cond('x', 'gt', 5, 'nodeA'), cond('x', 'gt', 3, 'nodeB')];
        expect(getNextNode({}, next, { x: 4 })).toBe('nodeB');
    });

    it('returns false when no conditions match', () => {
        const next = [cond('x', 'eq', 1, 'nodeA'), cond('x', 'eq', 2, 'nodeB')];
        expect(getNextNode({}, next, { x: 3 })).toBe(false);
    });

    it('returns false when context key is missing and no condition can match', () => {
        const next = [cond('missing', 'eq', true, 'nodeA'), cond('missing', 'eq', false, 'nodeB')];
        expect(getNextNode({}, next, {})).toBe(false);
    });

    it('returns node from a single-item condition array', () => {
        const next = [cond('flag', 'eq', true, 'nodeX')];
        expect(getNextNode({}, next, { flag: true })).toBe('nodeX');
    });

    it('does not match true condition with numeric 1 (strict equality)', () => {
        const next = [cond('x', 'eq', true, 'nodeA')];
        expect(getNextNode({}, next, { x: 1 })).toBe(false);
    });
});
