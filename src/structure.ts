import { readFile } from 'fs/promises';
import { Schematic } from 'prismarine-schematic';
import { Vec3 } from 'vec3';

const mcAssets = require('minecraft-assets')('1.8.8');

export class Structure {
    filepath: string;
    schematic: any;
    constructor() {}
    async load(path: string) {
        this.filepath = path;
        this.schematic = await Schematic.read(await readFile(path));
    }
    size(): { x: number; y: number; z: number } {
        const s = this.schematic.start();
        const e = this.schematic.end();
        return {
            x: e.x - s.x,
            y: e.y - s.y,
            z: e.z - s.z,
        };
    }
}
