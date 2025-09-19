// Minimal KiCad .kicad_pcb parser to extract tracks, vias, footprints, pads, and nets
// Supports KiCad 6/7 style s-expressions for basic elements used in our backdrop.

export type KNet = { id: number; name: string }
export type KSegment = { start: [number, number]; end: [number, number]; width: number; layer?: string; net?: number }
export type KArc = { start: [number, number]; mid: [number, number]; end: [number, number]; width: number; layer?: string; net?: number }
export type KVia = { at: [number, number]; size: number; drill: number; net?: number }
export type KPad = { num: string; at: [number, number, number?]; size: [number, number]; drill?: number; net?: number }
export type KFootprint = { ref?: string; name?: string; at: [number, number, number?]; pads: KPad[] }

export type KiCadBoard = {
  nets: KNet[]
  segments: KSegment[]
  arcs: KArc[]
  vias: KVia[]
  footprints: KFootprint[]
}

// Very small s-expression parser that returns arrays/strings/numbers
function parseSExpr(input: string): any {
  let i = 0
  const len = input.length
  const ws = /\s/
  function skipWs(){ while(i < len && ws.test(input[i])) i++ }
  function parseNumberOrSymbol(tok: string){
    const n = Number(tok)
    return Number.isNaN(n) ? tok : n
  }
  function parseString(): string{
    // assumes '"' at input[i]
    i++
    let out = ''
    while(i < len){
      const ch = input[i++]
      if (ch === '"') break
      if (ch === '\\' && i < len){
        const nx = input[i++]
        out += nx
      } else {
        out += ch
      }
    }
    return out
  }
  function parseToken(): any{
    skipWs()
    if (i >= len) return null
    const ch = input[i]
    if (ch === '('){ i++; return parseList() }
    if (ch === '"'){ return parseString() }
    if (ch === ')'){ i++; return null }
    // symbol/number
    let tok = ''
    while(i < len){
      const c = input[i]
      if (c === '(' || c === ')' || ws.test(c)) break
      tok += c; i++
    }
    return parseNumberOrSymbol(tok)
  }
  function parseList(): any[]{
    const arr: any[] = []
    while(i < len){
      skipWs()
      if (i >= len) break
      if (input[i] === ')'){ i++; break }
      const item = parseToken()
      if (item !== null) arr.push(item)
    }
    return arr
  }
  skipWs()
  const result: any[] = []
  while(i < len){
    const t = parseToken()
    if (t == null) break
    result.push(t)
  }
  return result
}

function asList(node: any): any[]{ return Array.isArray(node) ? node : [] }
function findAll(root: any, tag: string): any[]{
  const out: any[] = []
  const stack: any[] = [root]
  while(stack.length){
    const cur = stack.pop()
    if (Array.isArray(cur)){
      if (cur[0] === tag) out.push(cur)
      for (let i=cur.length-1;i>=1;i--) stack.push(cur[i])
    }
  }
  return out
}

function subVal(node: any[], key: string): any | undefined{
  for (const child of node){
    if (Array.isArray(child) && child[0] === key){
      if (child.length === 2) return child[1]
      return child.slice(1)
    }
  }
  return undefined
}

function toPair(v: any): [number, number]{
  if (Array.isArray(v) && v.length >= 2) return [Number(v[0]), Number(v[1])] as [number, number]
  return [0,0]
}

export function parseKiCadPcb(text: string): KiCadBoard{
  const tree = parseSExpr(text)
  const nets: KNet[] = []
  for (const n of findAll(tree, 'net')){
    // (net <id> "name")
    if (Array.isArray(n) && n.length >= 3){
      const id = Number(n[1])
      const name = String(n[2])
      if (!Number.isNaN(id)) nets.push({ id, name })
    }
  }

  const segments: KSegment[] = []
  for (const s of findAll(tree, 'segment')){
    const start = toPair(subVal(s, 'start'))
    const end = toPair(subVal(s, 'end'))
    const width = Number(subVal(s, 'width') ?? 0.2)
    const layer = String(subVal(s, 'layer') ?? '')
    const net = Number(subVal(s, 'net') ?? NaN)
    segments.push({ start, end, width, layer, net: Number.isNaN(net) ? undefined : net })
  }

  const arcs: KArc[] = []
  for (const a of findAll(tree, 'arc')){
    const start = toPair(subVal(a, 'start'))
    const mid = toPair(subVal(a, 'mid'))
    const end = toPair(subVal(a, 'end'))
    const width = Number(subVal(a, 'width') ?? 0.2)
    const layer = String(subVal(a, 'layer') ?? '')
    const net = Number(subVal(a, 'net') ?? NaN)
    arcs.push({ start, mid, end, width, layer, net: Number.isNaN(net) ? undefined : net })
  }

  const vias: KVia[] = []
  for (const v of findAll(tree, 'via')){
    const at = toPair(subVal(v, 'at'))
    const size = Number(subVal(v, 'size') ?? 0.6)
    const drill = Number(subVal(v, 'drill') ?? 0.3)
    const net = Number(subVal(v, 'net') ?? NaN)
    vias.push({ at, size, drill, net: Number.isNaN(net) ? undefined : net })
  }

  const footprints: KFootprint[] = []
  for (const f of findAll(tree, 'footprint')){
    const name = String(f[1] ?? '')
    const atRaw: any = subVal(f, 'at')
    const at: [number, number, number?] = Array.isArray(atRaw)
      ? [Number(atRaw[0]), Number(atRaw[1]), atRaw.length>2? Number(atRaw[2]) : undefined]
      : [0,0, undefined]
    const refNode = findAll(f, 'fp_text').find((n) => n[1] === 'reference')
    const ref = refNode ? String(refNode[2]) : undefined
    const pads: KPad[] = []
    for (const p of findAll(f, 'pad')){
      const num = String(p[1] ?? '')
      const atPadRaw: any = subVal(p, 'at')
      const atPad: [number, number, number?] = Array.isArray(atPadRaw)
        ? [Number(atPadRaw[0]), Number(atPadRaw[1]), atPadRaw.length>2? Number(atPadRaw[2]) : undefined]
        : [0,0, undefined]
      const sizeRaw: any = subVal(p, 'size')
      const size: [number, number] = Array.isArray(sizeRaw) ? [Number(sizeRaw[0]), Number(sizeRaw[1])] : [1,1]
      let net: number | undefined
      for (const sub of asList(p)){
        if (Array.isArray(sub) && sub[0] === 'net' && sub.length >= 2){
          const n = Number(sub[1])
          if (!Number.isNaN(n)) { net = n; break }
        }
      }
      pads.push({ num, at: atPad, size, net })
    }
    footprints.push({ ref, name, at, pads })
  }

  return { nets, segments, arcs, vias, footprints }
}
