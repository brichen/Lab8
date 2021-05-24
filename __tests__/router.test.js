/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js';
describe('pushToHistory', () => {
    test('settings', () => {
        expect(pushToHistory('settings').state).toEqual({page: 'settings'});
    });

    test('entry', () => {
        expect(pushToHistory('entry', 1).state).toEqual({page: 'entry1'});
    });

    test('', () => {
        expect(pushToHistory().state).toEqual({});
    });

    test('length of stack', () => {
        expect(window.history.length).toBe(4);
    });
});