const fs = require('fs').promises
const { Schematic } = require('prismarine-schematic')

async function main () {
  // Read a schematic (sponge or mcedit format)
  const schematic = await Schematic.read(await fs.readFile('testfiles/test.schematic'))

  // Write a schematic (sponge format)
  await fs.writeFile('test.schem', await schematic.write())
}

main()