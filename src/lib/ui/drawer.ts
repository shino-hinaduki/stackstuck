import * as assert from 'assert';
import { Structure } from '../construction/structure';

/**
 * GUI-related drawing implementation
 */
export class Drawer {
    /**
     * Generates an image of the X-Z plane specified by offsetY
     * @param s  Structure
     * @param offsetY Y index
     */
    drawSlice(s: Structure, offsetY: number): void {
        assert(s?.isLoaded());
        assert(offsetY >= 0 && offsetY <= s.size().y);
    }
}
