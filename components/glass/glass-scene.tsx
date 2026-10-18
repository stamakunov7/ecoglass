"use client"

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react"
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber"
import { ContactShadows, Edges, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import type { GlassLayer, LayerKind } from "./glass-data"

/** Size of the unit in scene units; thicknesses are exaggerated so every layer can be seen and pointed at. */
const W = 2.2
const H = 2.8
const DEPTH: Record<Exclude<LayerKind, "spacer">, number> = { pane: 0.14, gap: 0.5, coating: 0.016, interlayer: 0.07 }
/** Extra space opened between layers when the unit is taken apart */
const SPREAD = 0.55

const HIGHLIGHT = "#9fd3a2"

/** Turned so the outside face is on the left, as in the flat diagrams on the page */
const BASE_TURN = 0.78
/** The assembly starts nearly edge-on, so the layers visibly slide together */
const START_TURN = 1.5
const HOME = new THREE.Vector3(-1.25, 1.05, 7.7)
const INTRO_CAMERA = new THREE.Vector3(-0.6, 0.5, 12.5)
/** Seconds the opening assembly takes */
const INTRO = 3

/** How much further back the camera sits on narrow, portrait stages so the whole unit fits */
const fit = (width: number, height: number) => {
  const aspect = width / height
  return aspect < 1.25 ? Math.min(1.9, 1.25 / aspect) : 1
}
const homeFor = (width: number, height: number) => HOME.clone().multiplyScalar(fit(width, height))

export type SceneApi = { zoom: (factor: number) => void; reset: () => void }

/** DOM labels the scene keeps pinned to the outside and inside faces of the unit. */
export type SideLabels = { outside: HTMLElement | null; inside: HTMLElement | null }

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ---------------- Backdrop ---------------- */

/** Small seeded random, so the backdrop is the same on every visit */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * A garden out of focus behind the glass: brand greens, a warm sun and soft bokeh.
 * The glass bends and reflects it, which is what makes clear glass visible at all.
 */
function useBackdrop() {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 1600
    canvas.height = 1000
    const ctx = canvas.getContext("2d")!
    const rand = seeded(7)

    const base = ctx.createRadialGradient(960, 360, 60, 800, 500, 1050)
    base.addColorStop(0, "#5c9a78")
    base.addColorStop(0.35, "#2c6650")
    base.addColorStop(0.7, "#163f33")
    base.addColorStop(1, "#0a241d")
    ctx.fillStyle = base
    ctx.fillRect(0, 0, 1600, 1000)

    const sun = ctx.createRadialGradient(1180, 210, 0, 1180, 210, 520)
    sun.addColorStop(0, "rgba(255, 241, 205, 0.85)")
    sun.addColorStop(0.35, "rgba(246, 226, 176, 0.35)")
    sun.addColorStop(1, "rgba(246, 226, 176, 0)")
    ctx.fillStyle = sun
    ctx.fillRect(0, 0, 1600, 1000)

    // Out-of-focus leaves and light
    const colors = ["#9fd3a2", "#6fb38a", "#cfe8cf", "#e9f3d6", "#4f9a6b", "#f3e2b5", "#bfe0c6"]
    for (let i = 0; i < 95; i++) {
      const x = rand() * 1600
      const y = 120 + Math.pow(rand(), 0.8) * 820
      const r = 14 + Math.pow(rand(), 2) * 70
      const color = colors[Math.floor(rand() * colors.length)]
      const g = ctx.createRadialGradient(x, y, r * 0.15, x, y, r)
      g.addColorStop(0, color)
      g.addColorStop(0.75, color)
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.globalAlpha = 0.08 + rand() * 0.32
      ctx.filter = `blur(${2 + rand() * 7}px)`
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.filter = "none"

    // Ground the scene: darker toward the bottom and the corners
    const floor = ctx.createLinearGradient(0, 560, 0, 1000)
    floor.addColorStop(0, "rgba(6, 26, 20, 0)")
    floor.addColorStop(1, "rgba(6, 26, 20, 0.85)")
    ctx.fillStyle = floor
    ctx.fillRect(0, 0, 1600, 1000)
    const vignette = ctx.createRadialGradient(800, 480, 380, 800, 500, 1000)
    vignette.addColorStop(0, "rgba(0,0,0,0)")
    vignette.addColorStop(1, "rgba(4, 18, 14, 0.75)")
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, 1600, 1000)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

/**
 * The backdrop as a real plane that always sits behind the unit, facing the camera. Glass only refracts
 * objects in the scene, not scene.background, so a plain background would read as black through the glass.
 */
function BackdropPlane({ texture }: { texture: THREE.Texture }) {
  const plane = useRef<THREE.Mesh>(null)
  const forward = useMemo(() => new THREE.Vector3(), [])
  const DISTANCE = 22
  useFrame(({ camera, size }) => {
    const mesh = plane.current
    if (!mesh) return
    const cam = camera as THREE.PerspectiveCamera
    camera.getWorldDirection(forward)
    mesh.position.copy(camera.position).addScaledVector(forward, DISTANCE)
    mesh.quaternion.copy(camera.quaternion)
    const height = 2 * DISTANCE * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * 1.08
    const width = height * (size.width / size.height)
    // Cover the view like background-size: cover, without stretching the bokeh
    const textureAspect = 1.6
    mesh.scale.set(Math.max(width, height * textureAspect), Math.max(height, width / textureAspect), 1)
  })
  return (
    <mesh ref={plane} renderOrder={-1} raycast={() => null}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} depthWrite={false} />
    </mesh>
  )
}

/* ---------------- Materials ---------------- */

function useMaterials() {
  return useMemo(() => {
    // Soda-lime glass: clear, faintly green in its depth, a touch of dispersion at the edges
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transmission: 1,
      thickness: 0.35,
      roughness: 0,
      ior: 1.52,
      dispersion: 0.12,
      attenuationColor: new THREE.Color("#cfeadf"),
      attenuationDistance: 1.8,
      specularIntensity: 1,
      envMapIntensity: 1.4,
    })
    // Low-E: nearly invisible, with the faint coloured sheen a real coating shows in reflection
    const coating = new THREE.MeshPhysicalMaterial({
      color: "#bfe3cf",
      metalness: 0.45,
      roughness: 0.05,
      transparent: true,
      opacity: 0.22,
      iridescence: 1,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [250, 650],
      envMapIntensity: 2.2,
      emissive: new THREE.Color("#2f7a52"),
      emissiveIntensity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    // PVB interlayer: clear but slightly milky and warm
    const interlayer = new THREE.MeshPhysicalMaterial({
      color: "#fffaf0",
      transmission: 1,
      thickness: 0.07,
      roughness: 0.14,
      ior: 1.48,
      attenuationColor: new THREE.Color("#f2e4bd"),
      attenuationDistance: 0.6,
      envMapIntensity: 1.1,
    })
    const air = new THREE.MeshBasicMaterial({ color: "#d8efff", transparent: true, opacity: 0.025, depthWrite: false })
    const spacer = new THREE.MeshStandardMaterial({ color: "#d3d9dc", metalness: 1, roughness: 0.22 })
    const sealant = new THREE.MeshStandardMaterial({ color: "#2a302d", metalness: 0.1, roughness: 0.38 })
    return { glass, coating, interlayer, air, spacer, sealant }
  }, [])
}

type Materials = ReturnType<typeof useMaterials>

/* ---------------- Layers ---------------- */

type Placed = { layer: GlassLayer; index: number; slot: number; depth: number }

/** Works out which slot (position along the stack) each layer sits in. The spacer shares the air space's slot. */
function placeLayers(layers: GlassLayer[]) {
  const placed: Placed[] = []
  let slot = -1
  layers.forEach((layer, index) => {
    if (layer.kind === "spacer") {
      const gap = placed.find((p) => p.layer.kind === "gap" && p.slot === slot)
      placed.push({ layer, index, slot, depth: gap?.depth ?? DEPTH.gap })
      return
    }
    slot += 1
    placed.push({ layer, index, slot, depth: DEPTH[layer.kind] })
  })
  const slotDepths = Array.from(
    { length: slot + 1 },
    (_, s) => placed.find((p) => p.slot === s && p.layer.kind !== "spacer")!.depth,
  )
  return { placed, slotDepths }
}

/** Center z of each slot, with the stack centered on the origin; outside is -z. */
function slotCenters(slotDepths: number[], spread: number) {
  const total = slotDepths.reduce((a, b) => a + b, 0) + spread * (slotDepths.length - 1)
  let z = -total / 2
  return slotDepths.map((d) => {
    const center = z + d / 2
    z += d + spread
    return center
  })
}

type HoverFn = (index: number | null) => void

function hoverHandlers(index: number, onHover: HoverFn) {
  return {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      onHover(index)
    },
    onPointerOut: () => onHover(null),
  }
}

/** Crisp outline for the hovered layer, drawn from a plain box so rounded edges don't add stray lines */
function Outline({ w, h, d }: { w: number; h: number; d: number }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(w, h, d), [w, h, d])
  return <Edges geometry={geometry} color={HIGHLIGHT} lineWidth={2.2} threshold={15} />
}

function Layer({
  placed,
  hovered,
  onHover,
  materials,
}: {
  placed: Placed
  hovered: boolean
  onHover: HoverFn
  materials: Materials
}) {
  const { layer, index, depth } = placed
  const handlers = hoverHandlers(index, onHover)

  if (layer.kind === "pane" || layer.kind === "interlayer") {
    const material = layer.kind === "pane" ? materials.glass : materials.interlayer
    return (
      <RoundedBox
        args={[W, H, depth]}
        radius={Math.min(0.03, depth / 2.5)}
        smoothness={4}
        material={material}
        {...handlers}
      >
        {hovered && <Outline w={W} h={H} d={depth} />}
      </RoundedBox>
    )
  }
  if (layer.kind === "coating")
    return (
      <mesh material={materials.coating} {...handlers}>
        <boxGeometry args={[W - 0.02, H - 0.02, depth]} />
        {hovered && <Outline w={W - 0.02} h={H - 0.02} d={depth} />}
      </mesh>
    )
  if (layer.kind === "gap")
    return (
      <mesh material={materials.air} {...handlers}>
        <boxGeometry args={[W - 0.3, H - 0.3, depth * 0.96]} />
        {hovered && <Outline w={W - 0.3} h={H - 0.3} d={depth * 0.96} />}
      </mesh>
    )

  // Spacer: an aluminium frame set in from the edge, with black sealant filling the edge outside it
  const d = depth * 0.94
  const frame = (inset: number, bar: number): [number, number, number, number][] => [
    [W - inset * 2, bar, 0, H / 2 - inset - bar / 2],
    [W - inset * 2, bar, 0, -(H / 2 - inset - bar / 2)],
    [bar, H - inset * 2 - bar * 2, W / 2 - inset - bar / 2, 0],
    [bar, H - inset * 2 - bar * 2, -(W / 2 - inset - bar / 2), 0],
  ]
  return (
    <group {...handlers}>
      {frame(0.055, 0.1).map(([w, h, x, y], i) => (
        <mesh key={`a${i}`} position={[x, y, 0]} material={materials.spacer}>
          <boxGeometry args={[w, h, d]} />
          {hovered && <Edges threshold={15} color={HIGHLIGHT} lineWidth={2.2} />}
        </mesh>
      ))}
      {frame(0.004, 0.05).map(([w, h, x, y], i) => (
        <mesh key={`s${i}`} position={[x, y, 0]} material={materials.sealant}>
          <boxGeometry args={[w, h, d]} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------------- The unit ---------------- */

function Stack({
  layers,
  exploded,
  hovered,
  onHover,
  sway,
  labels,
  onIntroDone,
}: {
  layers: GlassLayer[]
  exploded: boolean
  hovered: number | null
  onHover: HoverFn
  /** Gently rocks the unit while nobody is using the viewer, always keeping the layered edge in view */
  sway: boolean
  labels: MutableRefObject<SideLabels>
  onIntroDone: () => void
}) {
  const materials = useMaterials()
  const unit = useRef<THREE.Group>(null)
  const outsideAnchor = useRef<THREE.Group>(null)
  const insideAnchor = useRef<THREE.Group>(null)
  const groups = useRef<(THREE.Group | null)[]>([])
  const projected = useMemo(() => new THREE.Vector3(), [])
  const reduce = useMemo(reducedMotion, [])

  const { placed, slotDepths } = useMemo(() => placeLayers(layers), [layers])
  const together = useMemo(() => slotCenters(slotDepths, 0), [slotDepths])
  const apart = useMemo(() => slotCenters(slotDepths, SPREAD), [slotDepths])
  /** Where each layer starts the opening assembly: far apart, so it reads as the unit coming together */
  const scattered = useMemo(() => slotCenters(slotDepths, 1.9), [slotDepths])

  // Layers glide from wherever they are to their target; a new glass starts apart and assembles itself.
  const current = useRef<number[]>(apart.slice())
  useEffect(() => {
    current.current = (reduce ? (exploded ? apart : together) : apart).slice()
  }, [apart, together, reduce]) // eslint-disable-line react-hooks/exhaustive-deps

  const intro = useRef<{ start: number | null; done: boolean }>({ start: null, done: reduce })
  useEffect(() => {
    if (reduce) onIntroDone()
  }, [reduce, onIntroDone])

  useFrame((state, delta) => {
    const camera = state.camera
    const controls = state.controls as unknown as { update: () => void } | null

    if (!intro.current.done) {
      if (intro.current.start === null) intro.current.start = state.clock.elapsedTime
      const t = state.clock.elapsedTime - intro.current.start

      // Outside in, one layer after another
      placed.forEach((p, i) => {
        const g = groups.current[i]
        if (!g) return
        const e = easeOut(clamp01((t - 0.2 - p.slot * 0.28) / 1.05))
        g.position.z = THREE.MathUtils.lerp(scattered[p.slot], together[p.slot], e)
        g.position.y = THREE.MathUtils.lerp(-0.5, 0, e)
        g.scale.setScalar(THREE.MathUtils.lerp(0.82, 1, e))
        g.visible = e > 0.002
      })
      // Then the whole unit turns to show its face while the camera settles in
      if (unit.current)
        unit.current.rotation.y = THREE.MathUtils.lerp(START_TURN, BASE_TURN, easeInOut(clamp01((t - 1.2) / 1.6)))
      const scale = fit(state.size.width, state.size.height)
      camera.position.lerpVectors(
        INTRO_CAMERA.clone().multiplyScalar(scale),
        HOME.clone().multiplyScalar(scale),
        easeOut(clamp01(t / 2.8)),
      )
      camera.lookAt(0, 0, 0)

      if (t >= INTRO) {
        intro.current.done = true
        current.current = together.slice()
        placed.forEach((_, i) => {
          const g = groups.current[i]
          if (g) {
            g.visible = true
            g.scale.setScalar(1)
            g.position.y = 0
          }
        })
        controls?.update()
        onIntroDone()
      }
    } else {
      if (unit.current && sway && hovered === null) {
        const goal = BASE_TURN + Math.sin(state.clock.elapsedTime * 0.45) * 0.22
        unit.current.rotation.y += (goal - unit.current.rotation.y) * (1 - Math.exp(-delta * 2))
      }
      const target = exploded ? apart : together
      const k = reduce ? 1 : 1 - Math.exp(-delta * 6)
      current.current.forEach((z, slot) => {
        current.current[slot] = z + (target[slot] - z) * k
      })
      placed.forEach((p, i) => {
        const g = groups.current[i]
        if (g) g.position.z = current.current[p.slot]
      })
    }

    // Pin the Outside / Inside labels above the matching face of the unit.
    const pin = (anchor: THREE.Group | null, el: HTMLElement | null) => {
      if (!anchor || !el) return
      projected.setFromMatrixPosition(anchor.matrixWorld).project(camera)
      const x = ((projected.x + 1) / 2) * state.size.width
      const y = ((1 - projected.y) / 2) * state.size.height
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`
      el.style.opacity = intro.current.done && projected.z < 1 ? "1" : "0"
    }
    pin(outsideAnchor.current, labels.current.outside)
    pin(insideAnchor.current, labels.current.inside)
  })

  return (
    <group ref={unit} rotation={[0, reduce ? BASE_TURN : START_TURN, 0]}>
      {placed.map((p, i) => (
        <group
          key={`${p.layer.name}-${i}`}
          ref={(g) => {
            groups.current[i] = g
          }}
          // Hidden until the opening assembly brings them in; glass picked later shows straight away
          visible={reduce || intro.current.done}
        >
          <Layer placed={p} hovered={hovered === p.index} onHover={onHover} materials={materials} />
        </group>
      ))}
      <group ref={outsideAnchor} position={[0, H / 2 + 0.32, apart[0] - 0.4]} />
      <group ref={insideAnchor} position={[0, H / 2 + 0.32, apart[apart.length - 1] + 0.4]} />
    </group>
  )
}

/* ---------------- Lighting ---------------- */

/** A bright strip that sweeps across the glass once the unit has turned to face you */
function Glint() {
  const light = useRef<THREE.Mesh>(null)
  const start = useRef<number | null>(null)
  useFrame((state) => {
    if (!light.current) return
    if (start.current === null) start.current = state.clock.elapsedTime
    const t = state.clock.elapsedTime - start.current
    const e = clamp01((t - 1.7) / 1.2)
    light.current.position.x = THREE.MathUtils.lerp(-9, 9, easeInOut(e))
    // Gone once it has crossed, before the environment stops updating at the end of the intro
    light.current.visible = e < 1
  })
  return <Lightformer ref={light} form="rect" intensity={7} position={[-9, 0, 5]} scale={[0.6, 14, 1]} />
}

function Studio({ backdrop, introDone }: { backdrop: THREE.Texture; introDone: boolean }) {
  return (
    // Re-rendered every frame only while the glint is moving, then frozen
    <Environment resolution={256} frames={introDone ? 1 : Infinity}>
      {/* The same garden, all around, so reflections match what's behind the glass */}
      <mesh scale={40}>
        <sphereGeometry args={[1, 48, 24]} />
        <meshBasicMaterial map={backdrop} side={THREE.BackSide} toneMapped={false} />
      </mesh>
      {/* Long, narrow studio strips for clean highlights along the glass */}
      <Lightformer form="rect" intensity={3.2} position={[-3, 1, 5]} scale={[0.35, 14, 1]} />
      <Lightformer form="rect" intensity={2.2} position={[2.4, 1, 5]} scale={[0.18, 14, 1]} />
      <Lightformer form="rect" intensity={1.6} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[14, 1.4, 1]} />
      <Lightformer
        form="rect"
        intensity={1.4}
        position={[6, 0, 0]}
        rotation-y={-Math.PI / 2}
        scale={[14, 3, 1]}
        color="#f3e2b5"
      />
      {!reducedMotion() && <Glint />}
    </Environment>
  )
}

/* ---------------- Camera ---------------- */

/** Gives the page buttons a way to zoom and reset the camera. */
function CameraApi({ apiRef }: { apiRef: MutableRefObject<SceneApi | null> }) {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  // Only the parts of drei's OrbitControls this needs
  const controls = useThree((s) => s.controls) as unknown as {
    target: THREE.Vector3
    minDistance: number
    maxDistance: number
    update: () => void
  } | null

  useEffect(() => {
    apiRef.current = {
      zoom(factor) {
        if (!controls) return
        const offset = camera.position.clone().sub(controls.target)
        const length = THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance)
        camera.position.copy(controls.target).add(offset.setLength(length))
        controls.update()
      },
      reset() {
        if (!controls) return
        controls.target.set(0, 0, 0)
        camera.position.copy(homeFor(size.width, size.height))
        controls.update()
      },
    }
    return () => {
      apiRef.current = null
    }
  }, [apiRef, camera, controls, size])

  return null
}

/* ---------------- Scene ---------------- */

type SceneProps = {
  layers: GlassLayer[]
  exploded: boolean
  hovered: number | null
  onHover: HoverFn
  /** Gentle sway while nobody is using the viewer */
  autoRotate: boolean
  apiRef: MutableRefObject<SceneApi | null>
  labels: MutableRefObject<SideLabels>
  onInteract: () => void
}

function Scene({ layers, exploded, hovered, onHover, autoRotate, apiRef, labels, onInteract }: SceneProps) {
  const backdrop = useBackdrop()
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useMemo(() => () => setIntroDone(true), [])

  return (
    <>
      <color attach="background" args={["#0a241d"]} />
      <BackdropPlane texture={backdrop} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 6, 5]} intensity={1.3} color="#fff4e2" />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#cfe8cf" />

      <Stack
        layers={layers}
        exploded={exploded}
        hovered={hovered}
        onHover={onHover}
        sway={autoRotate}
        labels={labels}
        onIntroDone={finishIntro}
      />

      <ContactShadows position={[0, -H / 2 - 0.05, 0]} opacity={0.55} scale={9} blur={2.4} far={3} color="#03140f" />
      <Studio backdrop={backdrop} introDone={introDone} />

      <OrbitControls
        makeDefault
        enabled={introDone}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3.2}
        maxDistance={20}
        minPolarAngle={0.45}
        maxPolarAngle={2.1}
        onStart={onInteract}
      />
      <CameraApi apiRef={apiRef} />
    </>
  )
}

export default function GlassScene({ running, ...props }: SceneProps & { running: boolean }) {
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: (reducedMotion() ? HOME : INTRO_CAMERA).toArray(), fov: 32 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      onPointerMissed={() => props.onHover(null)}
    >
      <Scene {...props} />
    </Canvas>
  )
}
