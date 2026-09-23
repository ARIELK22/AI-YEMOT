import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = process.cwd();
const chunksDir = path.join(root, '.source-parts');

const serverParts = ['server.js.part1', 'server.js.part2', 'server.js.part3'];
const encoded = serverParts
  .map((name) => fs.readFileSync(path.join(chunksDir, name), 'utf8').trim())
  .join('');

const data = zlib.gunzipSync(Buffer.from(encoded, 'base64'));
fs.writeFileSync(path.join(root, 'server.js'), data);
console.log('Project source restored.');
