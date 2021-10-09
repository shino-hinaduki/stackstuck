import { Structure } from './structure';

const version = '1.17.1';
const testData = [
    {
        input: 'testfiles/01_torch.schematic',
        output: {
            size: { x: 25, y: 1, z: 25 },
        },
    },
    {
        input: 'testfiles/02_treefarm.schematic',
        output: {
            size: { x: 17, y: 5, z: 19 },
        },
    },
    {
        input: 'testfiles/03_elevator.schematic',
        output: {
            size: { x: 6, y: 25, z: 4 },
        },
    },
    {
        input: 'testfiles/04_railroad.schematic',
        output: {
            size: { x: 11, y: 6, z: 25 },
        },
    },
    {
        input: 'testfiles/05_nethergate.schematic',
        output: {
            size: { x: 4, y: 5, z: 1 },
        },
    },
    {
        input: 'testfiles/06_blueiceroad.schematic',
        output: {
            size: { x: 4, y: 2, z: 59 },
        },
    },
    {
        input: 'testfiles/07_flying.schematic',
        output: {
            size: { x: 2, y: 1, z: 6 },
        },
    },
    {
        input: 'testfiles/08_arrow.schematic',
        output: {
            size: { x: 7, y: 4, z: 11 },
        },
    },
    {
        input: 'testfiles/09_repeaterclock.schematic',
        output: {
            size: { x: 6, y: 1, z: 8 },
        },
    },
];

test.each(testData)(
    'Inspect the size of structure for $input',
    async ({ input, output }) => {
        const s = new Structure(version);
        await s.load(input);
        expect(s.size()).toMatchObject(output.size);
    }
);
