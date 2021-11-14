import * as assert from 'assert';
import { readFile } from 'fs/promises';
import { Schematic } from 'prismarine-schematic';
const { Vec3 } = require('vec3');

/**
 * Indicates the original data of the building
 */
export class Structure {
    /** minecraft version */
    version: string;
    /** schematic filepath */
    filepath: string;
    /** schematic data */
    schematic: Schematic;
    /** block replace info(originalId -> replaceId) */
    replaceIds: Map<number, number>;

    /** Constructor */
    constructor(version: string) {
        this.version = version;
    }

    /**
     * Load the schematic file
     * @param path .schematic file path
     */
    async load(path: string) {
        this.filepath = path;
        this.schematic = await Schematic.read(await readFile(path));
    }

    isLoaded(): boolean {
        return this.schematic != null;
    }

    /**
     * Returns the building size
     * @returns building size
     */
    size(): { x: number; y: number; z: number } {
        assert(this.schematic != null);

        const s = this.schematic.start();
        const e = this.schematic.end();
        return {
            x: e.x - s.x + 1,
            y: e.y - s.y + 1,
            z: e.z - s.z + 1,
        };
    }

    /**
     * Returns the required Block information for the specified XZ plane.
     * @param offsetY layer offset
     * @returns blockName -> count
     */
    getLayerBlockCount(offsetY: number): Map<string, number> {
        const dst = new Map<string, number>();
        assert(this.schematic != null);

        const size = this.size();
        assert(offsetY < size.y);
        for (let j = 0; j < size.z; j++) {
            for (let i = 0; i < size.x; i++) {
                const block = this.schematic.getBlock(new Vec3(i, offsetY, j));
                const blockName = block.name;

                if (typeof dst.get(blockName) === 'undefined') {
                    dst.set(blockName, 0);
                }
                dst.set(blockName, dst.get(blockName) + 1);
            }
        }

        return dst;
    }
}
