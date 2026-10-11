import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

// Verify the shipped data, not a duplicated/generated fixture.
const data=JSON.parse(await readFile(new URL('../docs/data/alphabet.json',import.meta.url),'utf8'));
assert.equal(data.tokens.length,8192,'Expected 8192 tokens');
assert.equal(data.shapes.length,8192,'Expected 8192 glyphs');

const byteStrings=new Set();
const singleBytes=new Set();
for(let id=0;id<8192;id++){
 const entry=data.tokens[id];
 assert.ok(Array.isArray(entry)&&typeof entry[0]==='string','Invalid token record '+id);
 const value=Buffer.from(entry[0],'base64');
 assert.ok(value.length>0,'Empty token '+id);
 const signature=value.toString('hex');
 assert.ok(!byteStrings.has(signature),'Duplicate token bytes at '+id);
 byteStrings.add(signature);
 if(value.length===1)singleBytes.add(value[0]);
}
assert.equal(byteStrings.size,8192,'Token bytes must be unique');
assert.equal(singleBytes.size,256,'All 256 one-byte values are required');
for(let n=0;n<256;n++)assert.ok(singleBytes.has(n),'Missing byte '+n);

const shapeKeys=new Set();
for(let id=0;id<8192;id++){
 const shape=data.shapes[id];
 assert.ok(Array.isArray(shape)&&shape.length>0,'Empty glyph '+id);
 const segments=new Set();
 for(const pair of shape){
  assert.ok(Array.isArray(pair)&&pair.length===2,'Invalid segment in glyph '+id);
  const [a,b]=pair;
  for(const point of [a,b]){
   assert.ok(Array.isArray(point)&&point.length===2,'Invalid point in glyph '+id);
   for(const coord of point)assert.ok(Number.isInteger(coord)&&coord>=0&&coord<=2,'Off-grid coordinate in glyph '+id);
  }
  assert.notDeepEqual(a,b,'Zero-length segment in glyph '+id);
  const key=[a.join(','),b.join(',')].sort().join('|');
  assert.ok(!segments.has(key),'Repeated segment in glyph '+id);
  segments.add(key);
 }
 // Canonicalize edge direction and segment order; do not collapse rotations or
 // reflections, since the alphabet explicitly permits distinct variants.
 const signature=[...segments].sort().join(';');
 assert.ok(!shapeKeys.has(signature),'Duplicate glyph geometry at '+id);
 shapeKeys.add(signature);
}
assert.equal(shapeKeys.size,8192,'Distinct geometric definitions required');
console.log('Integrity PASS: 8192 distinct tokens/shapes, all 256 bytes, valid grid segments.');
