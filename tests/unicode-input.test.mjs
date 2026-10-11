import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {GlyphTokenizer} from '../docs/tokenizer.mjs';

const data=JSON.parse(await readFile(new URL('../docs/data/alphabet.json',import.meta.url),'utf8'));
const tokenizer=new GlyphTokenizer(data);
const malformed=['\uD800','\uDC00','text\uDC00','\uD800A','\uD800\uD800\uDC00','\uD83D \uDE00'];
for(const value of malformed)assert.throws(()=>tokenizer.encode(value),/Unpaired UTF-16 surrogate/);
const valid=['','Hello world','😀','A😀B','\uFEFFHello','\r\n\n','naïve café','Hello, 世界'];
for(const value of valid)assert.equal(tokenizer.decode(tokenizer.encode(value)),value,'Failed valid UTF-16 round trip');
assert.deepEqual(tokenizer.encode(''),[]);
assert.equal(tokenizer.decode(tokenizer.encode('after invalid input')),'after invalid input');
console.log('Unicode input PASS: '+malformed.length+' malformed UTF-16 rejections and '+valid.length+' valid round trips.');
