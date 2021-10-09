import { readFile } from 'fs/promises';
import { Schematic } from 'prismarine-schematic';
import { Vec3 } from 'vec3';

const mcAssets = require('minecraft-assets')('1.17.1');

/**
 * Indicates the original data of the building
 */
export class Structure {
    /** minecraft version */
    version: string;
    /** schematic filepath */
    filepath: string;
    /** schematic data */
    schematic: any;

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

    /**
     * Returns the building size
     * @returns building size
     */
    size(): { x: number; y: number; z: number } {
        const s = this.schematic.start();
        const e = this.schematic.end();
        return {
            x: e.x - s.x + 1,
            y: e.y - s.y + 1,
            z: e.z - s.z + 1,
        };
    }
}
