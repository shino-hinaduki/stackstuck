import { Structure } from './structure';

async function main() {
    const s = new Structure();
    await s.load('testfiles/test.schematic');
    console.log(s.size());
}

main();
