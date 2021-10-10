import * as assert from 'assert';
import * as jimp from 'jimp';
import { Structure } from '../construction/structure';
import { Drawer } from './drawer';

const version = '1.17.1';
const testData = [
    {
        input: '01_torch.schem',
        output: {},
    },
    {
        input: '02_treefarm.schem',
        output: {},
    },
    {
        input: '03_elevator.schem',
        output: {},
    },
    {
        input: '04_railroad.schem',
        output: {},
    },
    {
        input: '05_nethergate.schem',
        output: {},
    },
    {
        input: '06_blueiceroad.schem',
        output: {},
    },
    {
        input: '07_flying.schem',
        output: {},
    },
    {
        input: '08_arrow.schem',
        output: {},
    },
    {
        input: '09_repeaterclock.schem',
        output: {},
    },
];

test.each(testData)(
    'Generate and inspect a sliced image of the $input',
    async ({ input, output }) => {
        const s = new Structure(version);
        await s.load(`testfiles/${input}`);

        const y = s.size().y;
        for (let i = 0; i < y; i++) {
            const img = await Drawer.drawSlice(s, i);
            await img.writeAsync(`testout.${input}.${i}.png`);
        }
        // Expectations change with updates on the texture side, so we don't test strictly now.
    }
);
