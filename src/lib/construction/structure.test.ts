import { Structure } from './structure';

const version = '1.17.1';
const testData = [
    {
        input: '01_torch.schem',
        output: {
            size: { x: 25, y: 1, z: 25 },
            layer0: { torch: 25, air: 600 },
        },
    },
    {
        input: '02_treefarm.schem',
        output: {
            size: { x: 17, y: 5, z: 19 },
            layer0: { glass: 16, air: 304, chest: 2, hopper: 1 },
        },
    },
    {
        input: '03_elevator.schem',
        output: {
            size: { x: 5, y: 24, z: 4 },
            layer0: { glass: 19, soul_sand: 1 },
        },
    },
    {
        input: '04_railroad.schem',
        output: {
            size: { x: 11, y: 6, z: 25 },
            layer0: {
                air: 250,
                cobblestone: 14,
                redstone_block: 4,
                powered_rail: 2,
                rail: 5,
            },
        },
    },
    {
        input: '05_nethergate.schem',
        output: {
            size: { x: 4, y: 5, z: 1 },
            layer0: { air: 2, obsidian: 2 },
        },
    },
    {
        input: '06_blueiceroad.schem',
        output: {
            size: { x: 4, y: 2, z: 59 },
            layer0: { air: 118, oak_planks: 4, blue_ice: 114 },
        },
    },
    {
        input: '07_flying.schem',
        output: {
            size: { x: 2, y: 1, z: 6 },
            layer0: {
                furnace: 1,
                air: 3,
                observer: 2,
                slime_block: 4,
                sticky_piston: 2,
            },
        },
    },
    {
        input: '08_arrow.schem',
        output: {
            size: { x: 7, y: 4, z: 11 },
            layer0: { air: 55, magenta_glazed_terracotta: 22 },
        },
    },
    {
        input: '09_repeaterclock.schem',
        output: {
            size: { x: 6, y: 1, z: 8 },
            layer0: {
                air: 26,
                redstone_block: 1,
                redstone_wire: 5,
                blue_stained_glass: 2,
                purple_stained_glass: 1,
                comparator: 1,
                gray_stained_glass: 4,
                light_blue_stained_glass: 4,
                black_stained_glass: 4,
            },
        },
    },
];

test.each(testData)(
    'Inspect the size of structure for $input',
    async ({ input, output }) => {
        const s = new Structure(version);
        await s.load(`testfiles/${input}`);
        expect(s.size()).toMatchObject(output.size);
    }
);

test.each(testData)(
    'Check the number of Blocks per layer for $input',
    async ({ input, output }) => {
        const s = new Structure(version);
        await s.load(`testfiles/${input}`);
        expect(Object.fromEntries(s.getLayerBlockCount(0))).toMatchObject(
            output.layer0
        );
    }
);
