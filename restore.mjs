import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = process.cwd();
const chunksDir = path.join(root, '.source-parts');
const files = [
  ['server.js', 'server.js.part', 3],
  ['package-lock.json', 'package-lock.json.part', 4],
  ['yemot_setup/M0000.wav', 'M0000.wav.part', 17],
  ['yemot_setup/M1000.wav', 'M1000.wav.part', 1]
];
for (const [target, prefix, count] of files) {
  const encoded = Array.from({ length: count }, (_, i) => fs.readFileSync(path.join(chunksDir, `${prefix}${i + 1}`), 'utf8')).join('');
  const data = zlib.gunzipSync(Buffer.from(encoded, 'base64'));
  const dest = path.join(root, target);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, data);
}
console.log('Project source restored.');
