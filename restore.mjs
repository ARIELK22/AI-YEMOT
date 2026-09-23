import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = process.cwd();
const chunksDir = path.join(root, '.source-parts');
const parts = ['server.js.part1', 'server.js.part2', 'server.js.part3'];
const decoded = parts.map((name) => {
  const encoded = fs.readFileSync(path.join(chunksDir, name), 'utf8').trim();
  return zlib.gunzipSync(Buffer.from(encoded, 'base64'));
});
fs.writeFileSync(path.join(root, 'server.js'), Buffer.concat(decoded));
console.log('Project source restored.');
