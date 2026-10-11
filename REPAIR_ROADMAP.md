# Accelerando-8192X — Repair and Qualification Register

**Maintained in-repository because Issues are disabled on this fork.**

## Completed and merged to main (October 11, 2026)

- [x] [PR #1](https://github.com/halthinks/accelerando-8192X/pull/1): Unicode long-s contraction parity with tiktoken and 12 independently sourced reference cases. Merge `552520920664a1daa96db65fdbbdf87f518b0e70`.
- [x] [PR #2](https://github.com/halthinks/accelerando-8192X/pull/2): client-side glyph decoder, strict token/UTF-8 validation, copy and text download, desktop/mobile affordances, decoding tests. Merge `3295956783654e525a813a6158f8c237ce16daeb`.
- [x] [PR #3](https://github.com/halthinks/accelerando-8192X/pull/3): reject malformed UTF-16, clear stale encoder output, disable invalid exports, include geometric and byte-token integrity tests, native Node verification entrypoint, fork provenance docs. Merge `309c99e8b3adafbf001dc2ae02b8d0bbc03ac375`.

## Verification evidence captured before this document

- Actual fork tokenizer source, when executed in an isolated JavaScript runtime with an explicitly implemented UTF-8 TextEncoder/TextDecoder shim, passed all 208 reference streams, 12 Unicode fixtures, 34 lyric lines (398 tokens), 208 wrapped glyph transmissions, 6 invalid UTF-16 rejection cases, and 8 valid Unicode round trips.
- Independent direct inspection of shipped alphabet.json confirmed 8,192 unique byte-token entries, complete 256 one-byte coverage, and 8,192 geometric definitions unique after normalizing edge direction and segment ordering. No off-grid points, degenerate strokes, or duplicate strokes were found.
- New JavaScript files passed syntax parsing. These checks do **not** establish that the native Node suite, full browser user interface, font binary or Pages deployment passed.

## P0 — Source rights and redistribution

**Blocker:** Upstream gillverd/accelerando-8192 currently has no declared top-level original-work license. THIRD_PARTY_NOTICES.txt grants MIT rights only for third-party tiktoken, not original site code, artwork, fonts, audio/lyric content or exports.

- [ ] Confirm permission and intended license from original creator(s) for original source code and glyph/font artwork.
- [ ] Establish component-level rights for Grimes/Vadakin song-derived specimen, downloadable archives and generated images.
- [ ] Preserve upstream author credit, original history, contributor PR links and third-party MIT notice.
- [ ] Add a LICENSE or component-specific rights manifest **only after** rights-holder approval. Do not relicense assets based solely on third-party MIT notices.

## P0 — Native deterministic qualification

- [ ] On the existing VPS native runner, checkout the **exact main SHA** at test time with a clean worktree and run `node tests/verify.mjs` using Node 22 or later.
- [ ] Record SHA, platform, command, exit code, stdout/stderr, timestamp and immutable receipt. Publish a PASS claim only if the native command succeeds.
- [ ] Integrate that entrypoint as a reusable native CI gate on main changes; avoid making GitHub Actions a competing CI authority.
- [ ] Add reference parity tests for new emoji, multilingual and Unicode whitespace boundary cases as needed.

## P1 — Browser acceptance and product correctness

- [ ] Run actual browser Encode → Decode flows, empty input, invalid glyphs, malformed UTF-8 fragments and unpaired UTF-16, then verify clean error recovery and that stale exports are impossible.
- [ ] Test copy and downloads (including leading BOM, CRLF, escaped/wrapped layout whitespace) and confirm user text never leaves the browser.
- [ ] Execute Playwright responsive checks at widths 320, 375, 390, 720, 768 and 1280px. Check decoder navbar visibility, keyboard focus, no horizontal overflow or sticky-header overlap.
- [ ] Verify PUA font cmap coverage U+F0000–U+F1FFF and glyph-to-geometry correspondence. Dataset geometric uniqueness alone is insufficient.

## P1 — Artifact and deployment convergence

- [ ] Rebuild downloadable complete-project ZIP from the qualified fork SHA, or keep it explicitly labeled as a legacy upstream snapshot. This static ZIP predates PRs #1–#3 and **must not** be advertised as containing their fixes.
- [ ] Verify all packaging manifests, downloadable tokenizer settings, SVG atlases and static font assets agree with the canonical alphabet and declared version.
- [ ] After confirming asset rights, configure GitHub Pages for fork `main` / `docs`, independently verify actual HTTPS URL, assets, fonts, encoding/decoding and all downloads.
- [ ] Only after a successful deploy, update README's live link and the site's og:url to the verified fork URL. Until then, the demo is upstream and the fork URL must not be invented.

## Authority and process

- The fork main is the code authority for X maintenance. Upstream gillverd/accelerando-8192 remains the credited original source.
- All acceptance must be tied to exact commits; patch existence or upstream contributor claims are not the same as local CI qualification.
- Existing GitHub Issues API returns HTTP 410 (disabled), so this file is the durable tracker until repository settings change.
