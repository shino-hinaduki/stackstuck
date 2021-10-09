import { Structure } from './structure';

async function main() {
    const version = '1.17.1';
    const s = new Structure(version);
    await s.load('testfiles/test.schematic');
    console.log(s.size());
}

main();
