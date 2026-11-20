import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const p = path.join(dir, file);
    const stat = fs.statSync(p);
    if (stat && stat.isDirectory()) results = results.concat(walk(p));
    else if (file.endsWith('.astro')) results.push(p);
  });
  return results;
}

const files = walk('src');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('href="/#') || (l.includes('href="#') && !l.includes('href="#"'))) {
      console.log(`${f}:${idx + 1}: ${l.trim()}`);
    }
  });
});
