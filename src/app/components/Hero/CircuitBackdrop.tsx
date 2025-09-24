// import { useEffect, useMemo, useRef, useState } from 'react'
// import type { KiCadBoard } from '../../lib/kicad'

// type Palette = {
//   trace: string
//   glow: string
//   accent: string
// }

// type Props = {
//   startsAt?: string
//   palette?: Palette
//   density?: number // base density factor per px^2
//   safeZoneSelector?: string
//   paused?: boolean
//   includeBigChip?: boolean
//   bigChipPads?: number // total pads for the large chip (e.g., 32)
//   pattern?: 'auto' | 'generic_ic'
//   kicadBoard?: KiCadBoard
//   fitMarginMm?: number
// }

// type Node = { id: number; x: number; y: number; edges: number[]; kind: 'chip' | 'via' }
// type EdgeSeg = { x1: number; y1: number; x2: number; y2: number; len: number; ux: number; uy: number }
// type Edge = { id: number; a: number; b: number; len: number; path: { x: number; y: number }[]; segs: EdgeSeg[] }
// type Graph = { nodes: Node[]; edges: Edge[]; sources: number[]; chipRects?: { x: number; y: number; w: number; h: number }[] }

// type Pulse = {
//   edgeId: number
//   t: number // 0..1 along edge
//   dir: 1 | -1
//   speed: number // px per sec
//   width: number
//   alpha: number
// }

// const defaultPalette: Palette = {
//   trace: 'rgba(100,13,20,0.40)', // var(--rosewood) with alpha
//   glow: 'rgba(173,40,49,0.35)', // var(--auburn) glow
//   accent: 'rgba(128,14,19,0.80)', // var(--falu-red)
// }

// function dist(a: { x: number; y: number }, b: { x: number; y: number }){
//   const dx = a.x - b.x
//   const dy = a.y - b.y
//   return Math.sqrt(dx * dx + dy * dy)
// }

// function generateGraph(w: number, h: number, density: number, includeBigChip = false): Graph {
//   // Compute counts based on area, with clamps for sanity
//   const area = w * h
//   const targetNodes = Math.max(20, Math.min(64, Math.floor(area * (density || 0.00005))))
//   const nodes: Node[] = []
//   const edges: Edge[] = []

//   // Jittered grid placement for nicer spacing
//   const gridCols = Math.ceil(Math.sqrt(targetNodes))
//   const gridRows = Math.ceil(targetNodes / gridCols)
//   const padX = Math.max(24, w * 0.06)
//   const padY = Math.max(24, h * 0.08)
//   const cellW = (w - padX * 2) / gridCols
//   const cellH = (h - padY * 2) / gridRows
//   let id = 0
//   for (let r = 0; r < gridRows; r++){
//     for (let c = 0; c < gridCols; c++){
//       if (nodes.length >= targetNodes) break
//       const jitterX = (Math.random() - 0.5) * (cellW * 0.5)
//       const jitterY = (Math.random() - 0.5) * (cellH * 0.5)
//       const x = padX + c * cellW + cellW * 0.5 + jitterX
//       const y = padY + r * cellH + cellH * 0.5 + jitterY
//       nodes.push({ id: id++, x, y, edges: [], kind: 'via' })
//     }
//   }

//   // Optionally ensure a central chip node candidate exists for future expansion
//   if (includeBigChip){
//     const cx = w * 0.5 + (Math.random()-0.5) * (w * 0.1)
//     const cy = h * 0.5 + (Math.random()-0.5) * (h * 0.1)
//     nodes.push({ id: id++, x: cx, y: cy, edges: [], kind: 'chip' })
//   }

//   // Pick chips as sources (more chips than before)
//   const sources: number[] = []
//   const chipCount = Math.max(6, Math.min(16, Math.floor(nodes.length / 5)))
//   const picked = new Set<number>()
//   while (sources.length < chipCount) {
//     const idx = Math.floor(Math.random() * nodes.length)
//     if (picked.has(idx)) continue
//     picked.add(idx)
//     nodes[idx].kind = 'chip'
//     sources.push(nodes[idx].id)
//   }

//   // Connect nodes to nearby neighbors; chips get more connections
//   const kVia = 2
//   const kChip = 5
//   let eid = 0
//   for (let i = 0; i < nodes.length; i++){
//     const a = nodes[i]
//     // Find nearest k
//     const nearest = nodes
//       .map((b) => ({ b, d: dist(a, b) }))
//       .filter((o) => o.b.id !== a.id)
//       .sort((x, y) => x.d - y.d)
//       .slice(0, a.kind === 'chip' ? kChip : kVia)
//     for (const { b } of nearest){
//       // Avoid duplicate edges
//       const has = a.edges.some((eid2) => {
//         const e = edges.find((E) => E.id === eid2)
//         return e && ((e.a === a.id && e.b === b.id) || (e.a === b.id && e.b === a.id))
//       })
//       if (has) continue
//       const e: Edge = { id: eid++, a: a.id, b: b.id, len: dist(a,b), path: [], segs: [] }
//       edges.push(e)
//       a.edges.push(e.id)
//       b.edges.push(e.id)
//     }
//   }

//   return { nodes, edges, sources }
// }

// // Preset graph that mimics a generic PCB: a central 8-pin IC, two bus rails, and several small chips
// function generatePresetGraph(w: number, h: number): Graph {
//   const nodes: Node[] = []
//   const edges: Edge[] = []
//   let id = 0

//   // Horizontal bus
//   const marginX = Math.max(32, w * 0.08)
//   const yBus = h * 0.58
//   const busHCount = 12
//   const busH: number[] = []
//   for (let i=0;i<busHCount;i++){
//     const x = marginX + (i/(busHCount-1)) * (w - marginX*2)
//     nodes.push({ id, x, y: yBus, edges: [], kind: 'via' }); busH.push(id); id++
//     if (i>0){
//       const a = busH[i-1], b = busH[i]
//       edges.push({ id: edges.length, a, b, len: 1, path: [], segs: [] })
//       nodes[a].edges.push(edges[edges.length-1].id)
//       nodes[b].edges.push(edges[edges.length-1].id)
//     }
//   }

//   // Vertical bus
//   const xBus = w * 0.36
//   const marginY = Math.max(28, h * 0.10)
//   const busVCount = 9
//   const busV: number[] = []
//   for (let i=0;i<busVCount;i++){
//     const y = marginY + (i/(busVCount-1)) * (h - marginY*2)
//     nodes.push({ id, x: xBus, y, edges: [], kind: 'via' }); busV.push(id); id++
//     if (i>0){
//       const a = busV[i-1], b = busV[i]
//       edges.push({ id: edges.length, a, b, len: 1, path: [], segs: [] })
//       nodes[a].edges.push(edges[edges.length-1].id)
//       nodes[b].edges.push(edges[edges.length-1].id)
//     }
//   }

//   // Connect the two buses at their closest nodes
//   // Find H node closest to xBus and V node closest to yBus
//   const hIdx = busH.reduce((best, nid) => {
//     const n = nodes[nid];
//     return Math.abs(n.x - xBus) < Math.abs(nodes[best].x - xBus) ? nid : best
//   }, busH[0])
//   const vIdx = busV.reduce((best, nid) => {
//     const n = nodes[nid];
//     return Math.abs(n.y - yBus) < Math.abs(nodes[best].y - yBus) ? nid : best
//   }, busV[0])
//   edges.push({ id: edges.length, a: hIdx, b: vIdx, len: 1, path: [], segs: [] })
//   nodes[hIdx].edges.push(edges[edges.length-1].id)
//   nodes[vIdx].edges.push(edges[edges.length-1].id)

//   // Central 8-pin chip
//   const centerId = id
//   nodes.push({ id: centerId, x: w*0.58, y: h*0.48, edges: [], kind: 'chip' }); id++

//   // Surrounding small chips (pads 2,4,6)
//   const chipPositions = [
//     { x: w*0.78, y: h*0.30 },
//     { x: w*0.78, y: h*0.66 },
//     { x: w*0.48, y: h*0.25 },
//     { x: w*0.52, y: h*0.72 },
//   ]
//   const smallIds: number[] = []
//   for (const pos of chipPositions){ nodes.push({ id, x: pos.x, y: pos.y, edges: [], kind: 'chip' }); smallIds.push(id); id++ }

//   // Additional vias to act as junctions near small chips
//   const fanVias: number[] = []
//   for (const cid of smallIds){
//     const n = nodes[cid]
//     const vx = n.x + (Math.random() < 0.5 ? -1 : 1) * 24
//     const vy = n.y + (Math.random() < 0.5 ? -1 : 1) * 18
//     nodes.push({ id, x: vx, y: vy, edges: [], kind: 'via' }); fanVias.push(id); id++
//   }

//   // Connect central chip to both buses via near nodes
//   const nearH = hIdx
//   const nearV = vIdx
//   edges.push({ id: edges.length, a: centerId, b: nearH, len: 1, path: [], segs: [] })
//   nodes[centerId].edges.push(edges[edges.length-1].id); nodes[nearH].edges.push(edges[edges.length-1].id)
//   edges.push({ id: edges.length, a: centerId, b: nearV, len: 1, path: [], segs: [] })
//   nodes[centerId].edges.push(edges[edges.length-1].id); nodes[nearV].edges.push(edges[edges.length-1].id)

//   // Connect small chips to nearest bus or their via then to a bus node
//   for (let i=0;i<smallIds.length;i++){
//     const cid = smallIds[i]
//     const vid = fanVias[i]
//     // chip to via
//     edges.push({ id: edges.length, a: cid, b: vid, len: 1, path: [], segs: [] })
//     nodes[cid].edges.push(edges[edges.length-1].id); nodes[vid].edges.push(edges[edges.length-1].id)
//     // via to nearest H bus node
//     const nearestH = busH.reduce((best, nid) => {
//       const d1 = Math.hypot(nodes[nid].x - nodes[vid].x, nodes[nid].y - nodes[vid].y)
//       const d2 = Math.hypot(nodes[best].x - nodes[vid].x, nodes[best].y - nodes[vid].y)
//       return d1 < d2 ? nid : best
//     }, busH[0])
//     edges.push({ id: edges.length, a: vid, b: nearestH, len: 1, path: [], segs: [] })
//     nodes[vid].edges.push(edges[edges.length-1].id); nodes[nearestH].edges.push(edges[edges.length-1].id)
//   }

//   // Sources are all chips
//   const sources = [centerId, ...smallIds]
//   return { nodes, edges, sources }
// }

// // Build a graph from a KiCad board by fitting it into the given viewport size (cssW x cssH)
// function buildGraphFromKiCad(board: KiCadBoard, cssW: number, cssH: number, marginMm: number): Graph {
//   // Collect mm points for bounds
//   const pts: Array<[number, number]> = []
//   for (const s of board.segments){ pts.push(s.start, s.end) }
//   for (const a of board.arcs){ pts.push(a.start, a.mid, a.end) }
//   for (const v of board.vias){ pts.push(v.at) }
//   // Footprint pads positions in world coords (approx: footprint at + rotated pad at)
//   const fpPadsMm: Array<[number, number]> = []
//   const rad = (deg: number) => deg * Math.PI / 180
//   const rot = (x: number, y: number, deg: number): [number, number] => {
//     const r = rad(deg)
//     const c = Math.cos(r), s = Math.sin(r)
//     return [x * c - y * s, x * s + y * c]
//   }
//   for (const f of board.footprints){
//     const [fx, fy, frot = 0] = f.at
//     for (const p of f.pads){
//       const [px, py] = p.at
//       const [rx, ry] = rot(px, py, frot)
//       const wx = fx + rx
//       const wy = fy + ry
//       fpPadsMm.push([wx, wy])
//     }
//   }
//   for (const p of fpPadsMm){ pts.push(p) }
//   if (pts.length === 0){
//     // Fallback minimal graph
//     return generatePresetGraph(cssW, cssH)
//   }
//   let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
//   for (const [x,y] of pts){ if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y }
//   if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)){
//     return generatePresetGraph(cssW, cssH)
//   }
//   const spanX = Math.max(1e-6, (maxX - minX) + marginMm * 2)
//   const spanY = Math.max(1e-6, (maxY - minY) + marginMm * 2)
//   const scale = Math.min(cssW / spanX, cssH / spanY)
//   const ox = (cssW - scale * spanX) / 2 - scale * (minX - marginMm)
//   const oy = (cssH - scale * spanY) / 2 - scale * (minY - marginMm)
//   const mmToPx = (x: number, y: number): [number, number] => [ox + x * scale, oy + y * scale]

//   // Nodes at endpoints (px space)
//   const nodes: Node[] = []
//   const nodeKey = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`
//   const nodeMap = new Map<string, number>()
//   const addNode = (x: number, y: number) => {
//     const k = nodeKey(x,y)
//     const ex = nodeMap.get(k)
//     if (ex != null) return ex
//     const id = nodes.length
//     nodes.push({ id, x, y, edges: [], kind: 'via' })
//     nodeMap.set(k, id)
//     return id
//   }

//   const edges: Edge[] = []
//   let eid = 0
//   const addEdgeFromPoints = (ptsPx: Array<[number, number]>) => {
//     if (ptsPx.length < 2) return
//     const [sx, sy] = ptsPx[0]
//     const [ex, ey] = ptsPx[ptsPx.length - 1]
//     const a = addNode(sx, sy)
//     const b = addNode(ex, ey)
//     let total = 0
//     const segs: EdgeSeg[] = []
//     for (let i=0;i<ptsPx.length-1;i++){
//       const [x1,y1] = ptsPx[i]
//       const [x2,y2] = ptsPx[i+1]
//       const dx = x2 - x1, dy = y2 - y1
//       const len = Math.hypot(dx, dy)
//       if (len === 0) continue
//       segs.push({ x1, y1, x2, y2, len, ux: dx/len, uy: dy/len })
//       total += len
//     }
//     if (!segs.length) return
//     const e: Edge = { id: eid++, a, b, len: total, path: [], segs }
//     edges.push(e)
//     nodes[a].edges.push(e.id)
//     nodes[b].edges.push(e.id)
//   }

//   // Segments
//   for (const s of board.segments){
//     const [sx, sy] = mmToPx(s.start[0], s.start[1])
//     const [ex, ey] = mmToPx(s.end[0], s.end[1])
//     addEdgeFromPoints([[sx,sy],[ex,ey]])
//   }
//   // Arcs (approximate by start-mid-end polyline)
//   for (const a of board.arcs){
//     const p0 = mmToPx(a.start[0], a.start[1])
//     const p1 = mmToPx(a.mid[0], a.mid[1])
//     const p2 = mmToPx(a.end[0], a.end[1])
//     addEdgeFromPoints([p0,p1,p2])
//   }

//   // Choose sources from footprints pads mapped to nearest node
//   const sourcesSet = new Set<number>()
//   const dist2 = (x1:number,y1:number,x2:number,y2:number) => (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
//   const findNearestNode = (x: number, y: number, tol = 36 /* px^2 */) => {
//     let best = -1, bestD = Infinity
//     for (const n of nodes){
//       const d = dist2(x,y,n.x,n.y)
//       if (d < bestD){ bestD = d; best = n.id }
//     }
//     return bestD <= tol ? best : -1
//   }
//   const allowedPads = new Set([2,4,6,8])
//   const chipRects: { x: number; y: number; w: number; h: number }[] = []
//   for (const f of board.footprints){
//     const [fx, fy, frot = 0] = f.at
//     const padWorld: Array<[number, number]> = []
//     for (const p of f.pads){
//       const [px, py] = p.at
//       const r = (deg: number) => deg*Math.PI/180
//       const c = Math.cos(r(frot)), s = Math.sin(r(frot))
//       const wx = fx + px*c - py*s
//       const wy = fy + px*s + py*c
//       padWorld.push([wx, wy])
//     }
//     const padCount = padWorld.length
//     if (!allowedPads.has(padCount)) continue
//     // chip rect in px
//     let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity
//     for (const [mx,my] of padWorld){
//       const [px,py] = mmToPx(mx,my)
//       if (px < minx) minx = px
//       if (py < miny) miny = py
//       if (px > maxx) maxx = px
//       if (py > maxy) maxy = py
//     }
//     if (isFinite(minx) && isFinite(miny) && isFinite(maxx) && isFinite(maxy)){
//       const pad = 6
//       chipRects.push({ x: minx - pad, y: miny - pad, w: (maxx - minx) + pad*2, h: (maxy - miny) + pad*2 })
//     }
//     for (const [mx,my] of padWorld){
//       const [px,py] = mmToPx(mx,my)
//       const id = findNearestNode(px,py)
//       if (id >= 0) { sourcesSet.add(id); break }
//     }
//   }
//   const sources = Array.from(sourcesSet)
//   // If no sources found, pick a few high-degree nodes
//   if (sources.length === 0){
//     const byDeg = nodes.slice().sort((a,b) => b.edges.length - a.edges.length)
//     for (let i=0;i<Math.min(6, byDeg.length); i++){ sources.push(byDeg[i].id) }
//   }

//   return { nodes, edges, sources, chipRects }
// }


// export function CircuitBackdrop({ startsAt, palette = defaultPalette, density = 0.00005, safeZoneSelector, paused = false, includeBigChip = false, bigChipPads = 32, pattern = 'generic_ic', kicadBoard, fitMarginMm = 5 }: Props){
//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const baseRef = useRef<HTMLCanvasElement | null>(null)
//   const glowRef = useRef<HTMLCanvasElement | null>(null)
//   const graphRef = useRef<Graph | null>(null)
//   const pulsesRef = useRef<Pulse[]>([])
//   const emitAtRef = useRef<Map<number, number>>(new Map()) // per-source next emit time
//   const rafRef = useRef<number | null>(null)
//   const runningRef = useRef<boolean>(true)
//   const [reduced, setReduced] = useState(false)
//   const sweepUntilRef = useRef<number>(0)
//   const sweepArmedRef = useRef<boolean>(false)
//   const prevMinRef = useRef<number | null>(null)
//   // no-op state removed

//   // Resolve the scroll root for intersection
//   const rootEl = useMemo(() => {
//     return typeof document !== 'undefined' ? document.getElementById('app-main') : null
//   }, [])

//   // Setup reduced-motion
//   useEffect(() => {
//     if (typeof window === 'undefined') return
//     const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
//     const onChange = () => setReduced(mq.matches)
//     onChange()
//     mq.addEventListener?.('change', onChange)
//     return () => mq.removeEventListener?.('change', onChange)
//   }, [])

//   // Size and render base layer
//   const resizeAndRenderBase = () => {
//     const container = containerRef.current
//     const base = baseRef.current
//     const glow = glowRef.current
//     if (!container || !base || !glow) return
//     const rect = container.getBoundingClientRect()
//     const dpr = Math.min(window.devicePixelRatio || 1, 2)
//     const cssW = Math.max(1, Math.floor(rect.width))
//     const cssH = Math.max(1, Math.floor(rect.height))
//     const pxW = Math.floor(cssW * dpr)
//     const pxH = Math.floor(cssH * dpr)
//     if (base.width !== pxW || base.height !== pxH){
//       base.width = pxW; base.height = pxH
//       glow.width = pxW; glow.height = pxH
//       base.style.width = cssW + 'px'; base.style.height = cssH + 'px'
//       glow.style.width = cssW + 'px'; glow.style.height = cssH + 'px'
//     }

//     // Generate or import graph and draw static traces
//     const g = kicadBoard
//       ? buildGraphFromKiCad(kicadBoard, cssW, cssH, fitMarginMm)
//       : (pattern === 'generic_ic' ? generatePresetGraph(cssW, cssH) : generateGraph(cssW, cssH, density, includeBigChip))
//     graphRef.current = g
//     const ctx = base.getContext('2d')!
//     ctx.clearRect(0, 0, base.width, base.height)
//     ctx.save()
//     ctx.scale(dpr, dpr)
//     // helpers
//     const GRID = 12
//     const q = (v: number) => Math.round(v / GRID) * GRID

//     if (!kicadBoard){
//     // Compute chip pin positions (left/right) for drawing and routing (procedural/preset)
//     type ChipGeom = { w: number; h: number; left: {x:number;y:number}[]; right: {x:number;y:number}[]; top?: {x:number;y:number}[]; bottom?: {x:number;y:number}[] }
//     const chipGeom = new Map<number, ChipGeom>()
//     for (const n of g.nodes){
//       if (n.kind === 'chip'){
//         // Decide if this is the big chip (four sides) or regular (left/right) by proximity to center when includeBigChip
//         const isBig = includeBigChip && Math.abs(n.x - cssW/2) < cssW*0.12 && Math.abs(n.y - cssH/2) < cssH*0.12
//         if (isBig){
//           const padsTotal = Math.max(16, bigChipPads)
//           const perSide = Math.max(4, Math.floor(padsTotal / 4))
//           const w = 48
//           const h = 48
//           const gapX = w / (perSide + 1)
//           const gapY = h / (perSide + 1)
//           const left = Array.from({ length: perSide }, (_, i) => ({ x: q(n.x - w/2), y: q(n.y - h/2 + (i+1)*gapY) }))
//           const right = Array.from({ length: perSide }, (_, i) => ({ x: q(n.x + w/2), y: q(n.y - h/2 + (i+1)*gapY) }))
//           const top = Array.from({ length: perSide }, (_, i) => ({ x: q(n.x - w/2 + (i+1)*gapX), y: q(n.y - h/2) }))
//           const bottom = Array.from({ length: perSide }, (_, i) => ({ x: q(n.x - w/2 + (i+1)*gapX), y: q(n.y + h/2) }))
//           chipGeom.set(n.id, { w, h, left, right, top, bottom })
//         } else {
//           // Regular chip with pad totals restricted to 2,4,6,8
//           const allowed = [2,4,6,8]
//           const totalPads = allowed[Math.floor(Math.random()*allowed.length)]
//           // Symmetric distribution left/right
//           const perSide = Math.max(1, totalPads/2)
//           const leftCount = perSide
//           const rightCount = perSide
//           // Size mapping by pads
//           const sizeByPads: Record<number, { w: number; h: number }> = {
//             2: { w: q(26), h: q(14) },
//             4: { w: q(28), h: q(18) },
//             6: { w: q(32), h: q(22) },
//             8: { w: q(36), h: q(26) },
//           }
//           const { w, h } = sizeByPads[totalPads]
//           const gap = h / (perSide + 1)
//           const left = Array.from({ length: leftCount }, (_, i) => ({ x: q(n.x - w/2), y: q(n.y - h/2 + (i+1)*gap) }))
//           const right = Array.from({ length: rightCount }, (_, i) => ({ x: q(n.x + w/2), y: q(n.y - h/2 + (i+1)*gap) }))
//           chipGeom.set(n.id, { w, h, left, right })
//         }
//       }
//     }

//     // Allocate anchors and route edges with beveled 45-degree corner (no 90° turns)
//     const usedPins = new Map<number, { left: number; right: number; top?: number; bottom?: number }>()
//     const pickAnchor = (node: Node, toward: {x:number;y:number}) => {
//       if (node.kind !== 'chip') return { x: q(node.x), y: q(node.y) }
//       const geom = chipGeom.get(node.id)!
//       const usage = usedPins.get(node.id) || { left: 0, right: 0, top: 0, bottom: 0 }
//       const dx = toward.x - node.x
//       const dy = toward.y - node.y
//       // Choose side by direction priority and availability
//       const candidates: Array<'left'|'right'|'top'|'bottom'> = []
//       if ('top' in geom || 'bottom' in geom){
//         if (Math.abs(dx) >= Math.abs(dy)) candidates.push(dx < 0 ? 'left' : 'right', dy < 0 ? 'top' : 'bottom')
//         else candidates.push(dy < 0 ? 'top' : 'bottom', dx < 0 ? 'left' : 'right')
//       } else {
//         candidates.push(dx < 0 ? 'left' : 'right', dx < 0 ? 'right' : 'left')
//       }
//       let side: 'left'|'right'|'top'|'bottom' = 'left'
//       for (const s of candidates){ if ((geom as any)[s]) { side = s; break } }
//       const list = (geom as any)[side] as {x:number;y:number}[]
//       const idx = ((usage as any)[side] || 0) % list.length
//       ;(usage as any)[side] = ((usage as any)[side] || 0) + 1
//       usedPins.set(node.id, usage)
//       const pad = 4 // protrusion
//       const p = list[idx]
//       if (side === 'left') return { x: p.x - pad, y: p.y }
//       if (side === 'right') return { x: p.x + pad, y: p.y }
//       if (side === 'top') return { x: p.x, y: p.y - pad }
//       return { x: p.x, y: p.y + pad }
//     }

//     const route = (s: {x:number;y:number}, t: {x:number;y:number}) => {
//       const sx = q(s.x), sy = q(s.y)
//       const tx = q(t.x), ty = q(t.y)
//       const path: {x:number;y:number}[] = []
//       path.push({ x: sx, y: sy })
//       const dx = tx - sx
//       const dy = ty - sy
//       if (dx === 0 || dy === 0){
//         // straight axis-aligned
//         path.push({ x: tx, y: ty })
//       } else {
//         // L route with beveled corner: choose elbow
//         const elbow1 = { x: tx, y: sy }
//         const elbow2 = { x: sx, y: ty }
//         const elbow = (Math.abs(dx) + Math.random()*2) < (Math.abs(dy) + Math.random()*2) ? elbow1 : elbow2
//         // choose m as a multiple of GRID to keep 45° diagonals aligned
//         const maxOffset = Math.min(Math.abs(dx), Math.abs(dy)) * 0.35
//         const mSteps = Math.max(1, Math.min(2, Math.round(maxOffset / GRID)))
//         const m = mSteps * GRID
//         // pre and post bevel points
//         const pre = { x: elbow.x === tx ? tx - Math.sign(dx)*m : sx + Math.sign(dx)*m, y: elbow.y === ty ? ty - Math.sign(dy)*m : sy + Math.sign(dy)*m }
//         const post = { x: elbow.x === tx ? tx : sx, y: elbow.y === ty ? ty : sy }
//         // path: start -> pre -> post -> end
//         path.push({ x: q(pre.x), y: q(pre.y) })
//         path.push({ x: q(post.x), y: q(post.y) })
//         path.push({ x: tx, y: ty })
//       }
//       // Collapse any duplicates
//       const simplified: {x:number;y:number}[] = []
//       for (const p of path){
//         if (!simplified.length || simplified[simplified.length-1].x !== p.x || simplified[simplified.length-1].y !== p.y){
//           simplified.push(p)
//         }
//       }
//       return simplified
//     }

//     // Precompute edge routes
//     for (const e of g.edges){
//       const a = g.nodes.find(n => n.id === e.a)!
//       const b = g.nodes.find(n => n.id === e.b)!
//       const sa = pickAnchor(a, b)
//       const sb = pickAnchor(b, a)
//       const path = route(sa, sb)
//       e.path = path
//       // build segs and length
//       let total = 0
//       const segs: EdgeSeg[] = []
//       for (let i=0;i<path.length-1;i++){
//         const p1 = path[i], p2 = path[i+1]
//         const dx = p2.x - p1.x
//         const dy = p2.y - p1.y
//         const len = Math.hypot(dx, dy)
//         if (len === 0) continue
//         segs.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, len, ux: dx/len, uy: dy/len })
//         total += len
//       }
//       e.segs = segs
//       e.len = Math.max(1, total)
//     }

//     // Draw traces along routed paths (procedural/preset)
//     ctx.lineCap = 'round'
//     ctx.lineJoin = 'round'
//     ctx.strokeStyle = palette.trace
//     ctx.lineWidth = 1.8
//     for (const e of g.edges){
//       if (e.segs.length === 0) continue
//       ctx.beginPath()
//       ctx.moveTo(e.segs[0].x1, e.segs[0].y1)
//       for (const s of e.segs){
//         ctx.lineTo(s.x2, s.y2)
//       }
//       ctx.stroke()
//     }

//     // Draw vias and microchips with pins
//     for (const n of g.nodes){
//       if (n.kind === 'chip'){
//         const geom = chipGeom.get(n.id)!
//         const w = geom.w, h = geom.h
//         // body
//         ctx.fillStyle = 'rgba(0,0,0,0.40)'
//         ctx.strokeStyle = palette.accent
//         ctx.lineWidth = 1
//         ctx.beginPath()
//         ctx.rect(q(n.x - w/2), q(n.y - h/2), w, h)
//         ctx.fill()
//         ctx.stroke()
//         // pins
//         ctx.fillStyle = palette.accent
//         for (const p of geom.left){ ctx.fillRect(p.x - 4, p.y - 1, 4, 2) }
//         for (const p of geom.right){ ctx.fillRect(p.x, p.y - 1, 4, 2) }
//         if (geom.top){ for (const p of geom.top){ ctx.fillRect(p.x - 1, p.y - 4, 2, 4) } }
//         if (geom.bottom){ for (const p of geom.bottom){ ctx.fillRect(p.x - 1, p.y, 2, 4) } }
//       } else {
//         ctx.fillStyle = 'rgba(255,255,255,0.06)'
//         ctx.beginPath()
//         ctx.arc(q(n.x), q(n.y), 1.3, 0, Math.PI*2)
//         ctx.fill()
//       }
//     }
//     } else {
//       // KiCad mode: edges already contain pixel segs; draw them
//       ctx.lineCap = 'round'
//       ctx.lineJoin = 'round'
//       ctx.strokeStyle = palette.trace
//       ctx.lineWidth = 1.8
//       for (const e of g.edges){
//         if (!e.segs.length) continue
//         ctx.beginPath()
//         ctx.moveTo(e.segs[0].x1, e.segs[0].y1)
//         for (const s of e.segs){ ctx.lineTo(s.x2, s.y2) }
//         ctx.stroke()
//       }
//       // Optionally: draw simple vias as small dots (nodes of high degree)
//       for (const n of g.nodes){
//         if (n.edges.length >= 3){
//           ctx.fillStyle = 'rgba(255,255,255,0.06)'
//           ctx.beginPath(); ctx.arc(n.x, n.y, 1.4, 0, Math.PI*2); ctx.fill()
//         }
//       }
//       // Draw simple chip bodies from footprint pad bounding boxes computed during graph build
//       if (g.chipRects && g.chipRects.length){
//         ctx.fillStyle = 'rgba(0,0,0,0.40)'
//         ctx.strokeStyle = palette.accent
//         ctx.lineWidth = 1
//         for (const r of g.chipRects){
//           ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.fill(); ctx.stroke()
//         }
//       }
//     }

//     // Clear safe zone area for static layer if present
//     if (safeZoneSelector){
//       const target = document.querySelector<HTMLElement>(safeZoneSelector)
//       if (target){
//         const tRect = target.getBoundingClientRect()
//         const pad = 16
//         const x = tRect.left - rect.left - pad
//         const y = tRect.top - rect.top - pad
//         const w2 = tRect.width + pad*2
//         const h2 = tRect.height + pad*2
//         ctx.globalCompositeOperation = 'destination-out'
//         ctx.fillStyle = 'rgba(0,0,0,1)'
//         ctx.fillRect(x, y, w2, h2)
//         ctx.globalCompositeOperation = 'source-over'
//       }
//     }

//     ctx.restore()
//     // Reset pulses state when re-rendering base
//     pulsesRef.current = []
//     emitAtRef.current = new Map(Array.from(g.sources, s => [s, performance.now() + 1000 + Math.random()*2000]))
//   }

//   // Observe container size changes
//   useEffect(() => {
//     const ro = new ResizeObserver(() => {
//       resizeAndRenderBase()
//     })
//     if (containerRef.current) ro.observe(containerRef.current)
//     // Initial
//     resizeAndRenderBase()
//     return () => ro.disconnect()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // Pause when hero not visible within the app-main scroll container
//   useEffect(() => {
//     if (!rootEl || !containerRef.current) return
//     const io = new IntersectionObserver(
//       (entries) => {
//         const e = entries[0]
//         runningRef.current = e.isIntersecting
//       },
//       { root: rootEl as any, threshold: 0.05 }
//     )
//     io.observe(containerRef.current)
//     return () => io.disconnect()
//   }, [rootEl])

//   // Minute tick sweep detection (decoupled)
//   useEffect(() => {
//     if (!startsAt) return
//     const target = new Date(startsAt).getTime()
//     const id = window.setInterval(() => {
//       const now = Date.now()
//       if (now >= target) { window.clearInterval(id); return }
//       const mins = Math.floor((target - now) / 60000)
//       if (prevMinRef.current == null){ prevMinRef.current = mins; return }
//       if (mins < (prevMinRef.current as number)){
//         // Minute tick occurred
//         prevMinRef.current = mins
//         // Trigger brighter sweep window and burst emit
//         sweepUntilRef.current = performance.now() + 1200
//         sweepArmedRef.current = true
//       }
//     }, 1000)
//     return () => window.clearInterval(id)
//   }, [startsAt])

//   // Animation loop for pulses
//   useEffect(() => {
//     const glow = glowRef.current
//     if (!glow) return
//     const ctx = glow.getContext('2d')!
//     let last = performance.now()

//     const step = (now: number) => {
//       rafRef.current = requestAnimationFrame(step)
//       const dt = Math.min(100, now - last) / 1000 // cap dt to avoid jumps
//       last = now
//       if (paused || reduced || !runningRef.current) return
//       const g = graphRef.current
//       if (!g) return
//       const rect = containerRef.current!.getBoundingClientRect()

//       // 1) Emit pulses from sources when due
//       const maxPulses = 180
//       const branchChance = 0.3
//       const emits = emitAtRef.current
//       const tNow = performance.now()

//       if (sweepArmedRef.current){
//         // Burst: seed one pulse per source
//         for (const s of g.sources){
//           spawnFromSource(s, g, pulsesRef.current)
//         }
//         sweepArmedRef.current = false
//       }

//       for (const s of g.sources){
//         const due = emits.get(s) || 0
//         if (tNow >= due && pulsesRef.current.length < maxPulses){
//           spawnFromSource(s, g, pulsesRef.current)
//           const next = tNow + (3000 + Math.random() * 4000) * (reduced ? 4 : 1)
//           emits.set(s, next)
//         }
//       }

//       // 2) Advance pulse positions and handle branching
//       const keep: Pulse[] = []
//       for (let i = 0; i < pulsesRef.current.length; i++){
//         const p = pulsesRef.current[i]
//         const e = g.edges.find(E => E.id === p.edgeId)!
//         p.t += (p.speed * dt) / e.len
//         if (p.t < 1){
//           keep.push(p)
//           continue
//         }
//         // Arrived at node
//         const nodeId = p.dir > 0 ? e.b : e.a
//         const node = g.nodes.find(n => n.id === nodeId)!
//         // With some chance, branch to a new edge
//         const outgoing = node.edges.filter(id => id !== e.id)
//         if (outgoing.length && Math.random() < branchChance && keep.length < maxPulses){
//           const nextId = outgoing[Math.floor(Math.random() * outgoing.length)]
//           const nextEdge = g.edges.find(E => E.id === nextId)!
//           const dir: 1 | -1 = nextEdge.a === node.id ? 1 : -1
//           keep.push({ edgeId: nextId, t: 0, dir, speed: p.speed * (0.85 + Math.random()*0.3), width: p.width, alpha: p.alpha * 0.9 })
//         }
//         // Original pulse dissipates
//       }
//       pulsesRef.current = keep

//       // 3) Draw pulses
//       ctx.clearRect(0, 0, glow.width, glow.height)
//       ctx.save()
//       ctx.scale(Math.min(window.devicePixelRatio || 1, 2), Math.min(window.devicePixelRatio || 1, 2))
//       ctx.globalCompositeOperation = 'lighter'
//       // helper to sample along routed edge
//       const sampleAt = (e: Edge, t: number) => {
//         const tgt = t * e.len
//         let acc = 0
//         for (const s of e.segs){
//           if (acc + s.len >= tgt){
//             const lt = (tgt - acc) / s.len
//             const x = s.x1 + (s.x2 - s.x1) * lt
//             const y = s.y1 + (s.y2 - s.y1) * lt
//             return { x, y, ux: s.ux, uy: s.uy }
//           }
//           acc += s.len
//         }
//         const last = e.segs[e.segs.length - 1]
//         return { x: last.x2, y: last.y2, ux: last.ux, uy: last.uy }
//       }

//       for (const p of pulsesRef.current){
//         const e = g.edges.find(E => E.id === p.edgeId)!
//         const t = Math.min(1, p.t)
//         const samp = sampleAt(e, p.dir > 0 ? t : (1 - t))
//         const px = samp.x
//         const py = samp.y
//         // Short segment around the pulse point
//         const seg = 18
//         const ux = samp.ux * seg
//         const uy = samp.uy * seg
//         const alphaBase = p.alpha * (now <= sweepUntilRef.current ? 2.0 : 1.0)
//         ctx.strokeStyle = palette.glow
//         ;(ctx as any).shadowColor = palette.glow
//         ;(ctx as any).shadowBlur = 14
//         ctx.lineWidth = p.width
//         ctx.beginPath()
//         ctx.moveTo(px - ux, py - uy)
//         ctx.lineTo(px + ux, py + uy)
//         ctx.globalAlpha = Math.min(0.9, alphaBase)
//         ctx.stroke()
//         ctx.globalAlpha = 1
//         ;(ctx as any).shadowBlur = 0
//         // small bloom dot
//         ctx.fillStyle = palette.glow
//         ctx.globalAlpha = Math.min(0.6, alphaBase)
//         ctx.beginPath()
//         ctx.arc(px, py, 2.5, 0, Math.PI*2)
//         ctx.fill()
//         ctx.globalAlpha = 1
//       }

//       // 4) Clear safe zone for pulses if present
//       if (safeZoneSelector){
//         const target = document.querySelector<HTMLElement>(safeZoneSelector)
//         if (target){
//           const tRect = target.getBoundingClientRect()
//           const pad = 18
//           const x = tRect.left - rect.left - pad
//           const y = tRect.top - rect.top - pad
//           const w2 = tRect.width + pad*2
//           const h2 = tRect.height + pad*2
//           ctx.globalCompositeOperation = 'destination-out'
//           ctx.fillStyle = 'rgba(0,0,0,1)'
//           ctx.fillRect(x, y, w2, h2)
//           ctx.globalCompositeOperation = 'lighter'
//         }
//       }

//       ctx.restore()
//     }

//     rafRef.current = requestAnimationFrame(step)
//     return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [paused, reduced])

//   // Helper to spawn from a source node
//   const spawnFromSource = (sourceId: number, g: Graph, pulses: Pulse[]) => {
//     const node = g.nodes.find(n => n.id === sourceId)!
//     const outs = node.edges
//     if (!outs.length) return
//     const count = 1 + (Math.random() < 0.5 ? 1 : 0)
//     for (let i=0;i<count;i++){
//       const eid = outs[Math.floor(Math.random() * outs.length)]
//       const e = g.edges.find(E => E.id === eid)!
//       const dir: 1 | -1 = e.a === node.id ? 1 : -1
//       pulses.push({ edgeId: eid, t: 0, dir, speed: 105 + Math.random()*85, width: 2.6 + Math.random()*1.8, alpha: 0.5 + Math.random()*0.25 })
//     }
//   }

//   return (
//     <div ref={containerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
//       {/* Static traces */}
//       <canvas ref={baseRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }} />
//       {/* Glow pulses */}
//       <canvas ref={glowRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'screen' as any }} />
//     </div>
//   )
// }

// export default CircuitBackdrop
