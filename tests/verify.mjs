// Portable dependency-free verification entrypoint for a native CI runner.
await import('./integrity.test.mjs');
await import('./tokenizer.test.mjs');
await import('./decoder.test.mjs');
await import('./unicode-input.test.mjs');
console.log('All Accelerando-8192X verification suites passed.');
