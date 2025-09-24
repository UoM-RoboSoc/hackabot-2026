import { readdir, stat, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(process.cwd(), 'public')
const VALID_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg'])
const MAX_CONCURRENCY = 4

async function collectFiles(dir){
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()){
      return collectFiles(fullPath)
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (!VALID_EXTENSIONS.has(ext)){
      return []
    }
    return [fullPath]
  }))
  return files.flat()
}

async function optimizeImage(filePath){
  const ext = path.extname(filePath).toLowerCase()
  const rel = path.relative(ROOT, filePath)
  const original = await readFile(filePath)

  let pipeline = sharp(original)

  if (ext === '.png'){
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 80, effort: 8 })
  } else {
    pipeline = pipeline.jpeg({ mozjpeg: true, quality: 78 })
  }

  const optimised = await pipeline.toBuffer()

  if (optimised.length < original.length){
    await writeFile(filePath, optimised)
    return { rel, saved: original.length - optimised.length }
  }

  return { rel, saved: 0 }
}

async function run(){
  try {
    const exists = await stat(ROOT).then(() => true).catch(() => false)
    if (!exists){
      console.log('[optimize-images] public directory not found, skipping')
      return
    }

    const files = await collectFiles(ROOT)
    if (files.length === 0){
      console.log('[optimize-images] no images found to optimise')
      return
    }

    let totalSaved = 0
    let processed = 0

    const queue = [...files]

    const workers = Array.from({ length: Math.min(MAX_CONCURRENCY, queue.length) }, async () => {
      while (queue.length){
        const filePath = queue.pop()
        if (!filePath) break
        try {
          const { saved } = await optimizeImage(filePath)
          totalSaved += saved
        } catch (error){
          console.warn(`[optimize-images] failed for ${filePath}:`, error)
        } finally {
          processed += 1
        }
      }
    })

    await Promise.all(workers)

    const savedKb = (totalSaved / 1024).toFixed(1)
    console.log(`[optimize-images] processed ${processed} file(s), saved ${savedKb} KiB`)
  } catch (error){
    console.error('[optimize-images] unexpected failure', error)
    process.exitCode = 1
  }
}

await run()
