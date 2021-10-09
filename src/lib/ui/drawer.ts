import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import * as sharp from 'sharp';
import * as mcAssets from 'minecraft-assets';
import { Schematic } from 'prismarine-schematic';
import { Structure } from '../construction/structure';
const { Vec3 } = require('vec3');

/**
 * GUI-related drawing implementation
 */
export class Drawer {
    /** Tile Image Width */
    static readonly TILE_WIDTH: number = 16;
    /** Tile Image Height */
    static readonly TILE_HEIGHT: number = 16;

    /**
     * Returns the path to the PNG file for the texture specified by name.
     * If the file exists in the directory specified in cacheDir, it will be returned; if not, it will be downloaded on the spot.
     *
     * @param name texture name
     * @param version minecraft texture version
     * @param cacheDir image cache dir
     *
     * @note For example, if name is 'air', it will fail because the texture does not exist.
     *       https://minecraft-data.prismarine.js.org/
     */
    static async getTexturePath(
        name: string,
        version: string,
        cacheDir: string
    ): Promise<string | undefined> {
        assert(!!name);
        assert(!!version);
        const imgPath = path.join(cacheDir, `${version}-${name}.png`);
        const tmpImgPath = path.join(cacheDir, `${version}-${name}.tmp.png`);

        // Create cache dir if it does not exist.
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir);
        }

        // Download image
        if (!fs.existsSync(imgPath)) {
            const assets = mcAssets(version);
            assert(!!assets, `invalid version. ${version}`);
            const content = assets.textureContent[name];
            if (!content || !content.texture) {
                return undefined;
            }
            const data = content.texture.replace(
                /^data:image\/png;base64,/,
                ''
            );
            fs.writeFileSync(tmpImgPath, data, 'base64');

            // Crop out images that are not the right size. (For example, 'water').
            await sharp(tmpImgPath)
                .extract({
                    width: Drawer.TILE_WIDTH,
                    height: Drawer.TILE_HEIGHT,
                    left: 0,
                    top: 0,
                })
                .png()
                .toFile(imgPath);
        }

        // Returns the path where the image is saved.
        return imgPath;
    }

    /**
     * Generates an image of the X-Z plane specified by offsetY
     * @param s  Structure
     * @param offsetY Y index
     * @param cacheDir Image cache directory
     */
    static async drawSlice(
        s: Structure,
        offsetY: number,
        cacheDir: string = './.stackstuckcache'
    ): Promise<any> {
        assert(s?.isLoaded());
        assert(!!s?.version);
        assert(
            offsetY >= 0 && offsetY <= s.size().y,
            `Range Error. 0 <= offsetY(${offsetY}) <= ${s.size().y}`
        );

        const size = s.size();
        const width = size.x * Drawer.TILE_WIDTH;
        const height = size.z * Drawer.TILE_HEIGHT;

        // Enumerate the blocks in the x-z plane, get the corresponding images, and paste them.
        const compositeImages = [];
        for (let j = 0; j < size.z; j++) {
            for (let i = 0; i < size.x; i++) {
                const block = s.schematic.getBlock(new Vec3(i, offsetY, j));
                const blockName = block.name;

                // Get image path and add
                const pngPath = await Drawer.getTexturePath(
                    blockName,
                    s.version,
                    cacheDir
                );
                if (typeof pngPath === 'undefined') {
                    continue;
                }
                compositeImages.push({
                    input: pngPath,
                    left: i * Drawer.TILE_WIDTH,
                    top: j * Drawer.TILE_HEIGHT,
                });
            }
        }

        // Image processing
        const img = await sharp({
            create: {
                width: width,
                height: height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0.0 },
            },
        })
            .composite(compositeImages)
            .png();
        return img;
    }
}
