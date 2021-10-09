import * as assert from 'assert';
import * as sharp from 'sharp';
import { Structure } from '../construction/structure';
import { Drawer } from './drawer';

const version = '1.17.1';
const testData = [
    // {
    //     input: '01_torch.schematic',
    //     output: {},
    // },
    // {
    //     input: '02_treefarm.schematic',
    //     output: {},
    // },
    {
        input: '03_elevator.schematic',
        output: {},
    },
    {
        input: '04_railroad.schematic',
        output: {},
    },
    {
        input: '05_nethergate.schematic',
        output: {},
    },
    // {
    //     input: '06_blueiceroad.schematic',
    //     output: {},
    // },
    // {
    //     input: '07_flying.schematic',
    //     output: {},
    // },
    // {
    //     input: '08_arrow.schematic',
    //     output: {},
    // },
    // {
    //     input: '09_repeaterclock.schematic',
    //     output: {},
    // },
];

test.each(testData)(
    'Generate and inspect a sliced image of the $input',
    async ({ input, output }) => {
        const s = new Structure(version);
        await s.load(`testfiles/${input}`);

        const y = s.size().y;
        for (let i = 0; i < y; i++) {
            const img = await Drawer.drawSlice(s, i);
            await img.toFile(`testout.${input}.${i}.png`);
        }
        // Expectations change with updates on the texture side, so we don't test strictly now.
    }
);
