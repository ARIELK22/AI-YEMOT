import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = process.cwd();
const chunksDir = path.join(root, '.source-parts');
const parts = ['server.js.part1', 'server.js.part2', 'server.js.part3'];

// The repository stores one gzip payload split across base64 fragments.
// Padding may occur at an intermediate fragment boundary, so remove it
// before joining and restore padding only after all fragments are combined.
const encoded = parts.map(name => fs.readFileSync(path.join(chunksDir, name), 'utf8').trim()).join('').replace(/=+$/g, '');
const padded = encoded + '='.repeat((4 - (encoded.length % 4)) % 4);
const compressed = Buffer.from(padded, 'base64');
const source = zlib.gunzipSync(compressed);
fs.writeFileSync(path.join(root, 'server.js'), source);
console.log('Project source restored.');
