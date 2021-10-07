const fs = require('fs').promises;
const { Schematic } = require('prismarine-schematic');
const mcAssets = require('minecraft-assets')('1.17.1');
const { Vec3 } = require('vec3');

console.log(mcAssets.textureContent['wheat_seeds'].texture);

async function main() {
    const schematic = await Schematic.read(
        await fs.readFile('testfiles/test.schematic')
    );
    const s = schematic.start();
    const e = schematic.end();
    for (let z = 0; z < e.z - s.z; z++) {
        for (let y = 0; y < e.y - s.y; y++) {
            for (let x = 0; x < e.x - s.x; x++) {
                console.log(schematic.getBlock(new Vec3(x, y, z)));
            }
        }
    }
}

main();
