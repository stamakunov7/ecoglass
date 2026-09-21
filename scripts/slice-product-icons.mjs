import { createRequire } from "node:module"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

const require = createRequire(import.meta.url)
// sharp lives in the pnpm store as a dependency of next, so resolve it from there.
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next/package.json").replace(/package\.json$/, "")] }))

const SRC = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-drbnPjSNokdNBA2CXFSacCJW5qd5fR.png"
const OUT = path.resolve("public/product-icons")

const names = [
  ["awning", "bay-bow", "casement", "single-double-hung", "sliding-window", "pass-through", "picture-window"],
  ["specialty-window", "big-doors", "entry-door", "french-hinged-patio", "sliding-door", "storm-screen-door", "replacement-door"],
]

const buf = Buffer.from(await (await fetch(SRC)).arrayBuffer())
const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

// Source is RGBA with a transparent background, so ink = opaque-enough pixel.
const isInk = (x, y) => data[(y * width + x) * channels + 3] > 60

// A line counts as "inked" only if it has a few real pixels, to ignore stray noise.
const inkCount = (test, length) => { let n = 0; for (let i = 0; i < length; i++) if (test(i)) n++; return n }

// Find ink runs along an axis (rows, then columns within each row band)
function runs(length, test, minGap, minLen = 1) {
  const out = []
  let start = -1
  let gap = 0
  for (let i = 0; i < length; i++) {
    if (test(i)) {
      if (start === -1) start = i
      gap = 0
    } else if (start !== -1) {
      gap++
      if (gap > minGap) {
        if (i - gap - start >= minLen) out.push([start, i - gap])
        start = -1
        gap = 0
      }
    }
  }
  if (start !== -1 && length - 1 - start >= minLen) out.push([start, length - 1])
  return out
}

const rowBands = runs(height, (y) => inkCount((x) => isInk(x, y), width) >= 3, 20, 40)
console.log("rows:", JSON.stringify(rowBands), "image:", width, "x", height)
if (rowBands.length !== 2) throw new Error(`Expected 2 rows, found ${rowBands.length}`)

await mkdir(OUT, { recursive: true })

for (let r = 0; r < 2; r++) {
  const [y0, y1] = rowBands[r]
  const cols = runs(width, (x) => { let n = 0; for (let y = y0; y <= y1; y++) if (isInk(x, y)) n++; return n >= 3 }, 30, 40)
  console.log(`row ${r} cols:`, JSON.stringify(cols))
  if (cols.length !== 7) throw new Error(`Row ${r}: expected 7 icons, found ${cols.length}`)

  for (let c = 0; c < 7; c++) {
    const [x0, x1] = cols[c]
    // Tight vertical bounds inside this column
    let ty0 = y1, ty1 = y0
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (isInk(x, y)) { ty0 = Math.min(ty0, y); ty1 = Math.max(ty1, y); break }

    const pad = 6
    const left = Math.max(0, x0 - pad), top = Math.max(0, ty0 - pad)
    const w = Math.min(width - left, x1 - x0 + 1 + pad * 2)
    const h = Math.min(height - top, ty1 - ty0 + 1 + pad * 2)

    const out = await sharp(buf).extract({ left, top, width: w, height: h }).png().toBuffer()
    await writeFile(path.join(OUT, `${names[r][c]}.png`), out)
    console.log(`${names[r][c]}.png  ${w}x${h}`)
  }
}
