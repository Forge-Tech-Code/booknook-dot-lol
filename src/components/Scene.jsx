/**
 * The window scene from the app's header, simplified to SVG.
 *
 * Mirrors AmbientScene.kt (sky and the mood's view) and CozyProps.kt (sill,
 * sleeping cat, blanket, plant, book stack, mug, candle). Colours that change
 * between day and night come from the CSS variables in moods.js; the parts
 * that only exist by day or by night carry `.day` / `.night`, which index.css
 * shows or hides — so the prerendered page is right in dark mode with no JS.
 *
 * Motion is CSS only (`anim-*` classes) and all of it stops under
 * prefers-reduced-motion. No randomness: the page is prerendered, so every
 * position is fixed or the first client render would differ from the HTML.
 */
import { moodById } from '../moods'

const W = 480
const SILL = 244 // y of the sill's top face; props stand on it

// Fixed star field (x, y, r).
const STARS = [
  [30, 30, 1.4], [72, 64, 1], [118, 22, 1.6], [160, 80, 1], [205, 40, 1.3], [248, 16, 1], [282, 70, 1.5],
  [330, 34, 1], [372, 88, 1.2], [410, 26, 1.6], [452, 58, 1], [96, 110, 1], [228, 104, 1.1], [440, 120, 1],
  [16, 96, 1.1], [300, 118, 0.9], [186, 130, 1], [388, 140, 0.9],
]

function Stars({ count = STARS.length }) {
  return (
    <g className="night" fill="#FFF6DA">
      {STARS.slice(0, count).map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} className="anim-twinkle" style={{ animationDelay: `${(i * 0.37) % 4}s` }} />
      ))}
    </g>
  )
}

function Cloud({ x, y, s = 1, fill = '#FFFFFF', opacity = 0.85, delay = 0 }) {
  return (
    <g className="anim-drift" style={{ animationDelay: `${delay}s` }}>
      <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} opacity={opacity}>
        <circle cx="0" cy="0" r="12" />
        <circle cx="14" cy="-6" r="15" />
        <circle cx="30" cy="0" r="11" />
        <rect x="-12" y="0" width="54" height="11" rx="5.5" />
      </g>
    </g>
  )
}

function Moon({ x, y, r = 16, full = false }) {
  return (
    <g className="night">
      <circle cx={x} cy={y} r={r * 2.6} fill="var(--glow)" opacity="0.14" />
      {full ? (
        <circle cx={x} cy={y} r={r} fill="#FFF3D6" />
      ) : (
        <path d={`M${x} ${y - r}a${r} ${r} 0 1 0 ${r * 0.9} ${r * 1.55}a${r * 0.8} ${r * 0.8} 0 1 1 ${-r * 0.9} ${-r * 1.55}z`} fill="#FFF3D6" />
      )}
    </g>
  )
}

function Sun({ x, y, r = 30, from = '#FFF6CC', to = '#FFC58A', id }) {
  return (
    <g className="day">
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r * 2.4} fill="var(--glow)" opacity="0.28" className="anim-breathe-soft" />
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  )
}

/* ------------------------------------------------------------ the views */

function Dusk() {
  const towers = [[0, 70], [34, 104], [62, 84], [96, 124], [128, 92], [160, 66], [186, 110], [222, 80], [262, 96], [300, 72], [334, 118], [372, 88], [408, 106], [446, 76]]
  const windows = (fill, cls) =>
    towers.flatMap(([x, h], i) =>
      [0, 1, 2].filter((k) => (i + k) % 3 !== 1).map((k) => (
        <rect key={`${i}-${k}`} x={x + 8 + (k % 2) * 10} y={SILL - h + 14 + k * 22} width="5" height="7" rx="1" fill={fill}
          className={cls} style={cls ? { animationDelay: `${(i * 0.9 + k) % 5}s` } : undefined} />
      )),
    )
  return (
    <>
      <Sun x={350} y={112} r={32} id="dusk-sun" />
      <g className="day">
        <Cloud x={70} y={70} delay={0} />
        <Cloud x={220} y={46} s={0.8} delay={-14} />
      </g>
      <g className="day" stroke="#6E4A5E" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M150 104q5-5 10 0q5-5 10 0" className="anim-flap" />
        <path d="M178 92q4-4 8 0q4-4 8 0" className="anim-flap" style={{ animationDelay: '-0.4s' }} />
        <path d="M128 90q4-4 8 0q4-4 8 0" className="anim-flap" style={{ animationDelay: '-0.8s' }} />
      </g>
      <g className="night">
        <defs>
          <linearGradient id="dusk-low-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE2B0" />
            <stop offset="1" stopColor="#F79A8E" />
          </linearGradient>
          <clipPath id="dusk-sun-clip"><circle cx="330" cy="196" r="56" /></clipPath>
        </defs>
        <circle cx="330" cy="196" r="110" fill="#FFC27A" opacity="0.16" />
        <g clipPath="url(#dusk-sun-clip)">
          <rect x="270" y="140" width="120" height="120" fill="url(#dusk-low-sun)" />
          {[190, 202, 213, 223, 232].map((y, i) => (
            <rect key={y} x="270" y={y} width="120" height={2 + i} fill="var(--sky-mid)" />
          ))}
        </g>
      </g>
      <g className="day">
        {towers.map(([x, h]) => <rect key={x} x={x} y={SILL - h} width="34" height={h} fill="#C98A9A" opacity="0.55" />)}
        {windows('#FFF3E0', null)}
      </g>
      <g className="night">
        {towers.map(([x, h]) => <rect key={x} x={x} y={SILL - h} width="34" height={h} fill="#2A2240" />)}
        {windows('#FFC27A', 'anim-flicker')}
      </g>
    </>
  )
}

function Rain() {
  const drops = Array.from({ length: 34 }, (_, i) => [(i * 47) % W, (i * 83) % 230])
  return (
    <>
      <g opacity="0.2" fill="var(--on-header)">
        <rect x="20" y="120" width="60" height="124" />
        <rect x="96" y="90" width="44" height="154" />
        <rect x="330" y="104" width="56" height="140" />
        <rect x="400" y="132" width="70" height="112" />
      </g>
      {[[60, 150, 26], [180, 120, 18], [380, 170, 22], [250, 200, 16]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={['#FFC27A', '#F2A7A7', '#9ED8E6', '#FFE2B0'][i]} opacity="0.32" className="anim-breathe-soft" style={{ animationDelay: `${-i * 2}s` }} />
      ))}
      <g className="night">
        <rect x="150" y="108" width="3" height="136" fill="#1A2428" />
        <circle cx="151" cy="106" r="40" fill="#FFC27A" opacity="0.22" />
        <circle cx="151" cy="106" r="6" fill="#FFE2B0" />
      </g>
      <g className="anim-rain" stroke="var(--on-header)" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round">
        {drops.map(([x, y], i) => <line key={i} x1={x} y1={y - 300} x2={x - 5} y2={y - 286} />)}
        {drops.map(([x, y], i) => <line key={`b${i}`} x1={x} y1={y} x2={x - 5} y2={y + 14} />)}
      </g>
      {[[70, 60], [210, 150], [300, 90], [430, 200], [140, 210]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.4" ry="3.2" fill="#FFFFFF" opacity="0.45" />
      ))}
      <g fill="var(--wood)">
        <rect x={W * 0.6 - 4} y="0" width="8" height={SILL} />
        <rect x="0" y="146" width={W} height="8" />
      </g>
    </>
  )
}

function Forest() {
  const pine = (x, base, h, fill) => (
    <g key={`${x}-${base}`} fill={fill}>
      <path d={`M${x} ${base - h}l${h * 0.28} ${h * 0.4}h${-h * 0.56}z`} />
      <path d={`M${x} ${base - h * 0.75}l${h * 0.36} ${h * 0.45}h${-h * 0.72}z`} />
      <path d={`M${x} ${base - h * 0.48}l${h * 0.44} ${h * 0.48}h${-h * 0.88}z`} />
    </g>
  )
  return (
    <>
      <Sun x={360} y={80} r={26} from="#FFFBE6" to="#FFE9A0" id="forest-sun" />
      <Moon x={360} y={70} r={16} />
      <Stars count={14} />
      <path d={`M0 170Q80 140 160 162T320 150T480 160V${SILL}H0Z`} fill="#C9DDB0" className="day" />
      <path d={`M0 170Q80 140 160 162T320 150T480 160V${SILL}H0Z`} fill="#1F3330" className="night" />
      {[30, 90, 400, 452].map((x) => pine(x, 176, 46, 'var(--hill-2)'))}
      <path d={`M0 200Q100 176 210 196T480 190V${SILL}H0Z`} fill="var(--hill-2)" />
      <g>
        <rect x="300" y="186" width="52" height="34" fill="#7A5236" />
        <path d="M294 188l32-24l32 24z" fill="#5A3A26" />
        <rect x="312" y="196" width="12" height="11" rx="1.5" fill="#FFD27A" />
        <rect x="336" y="166" width="7" height="16" fill="#5A3A26" />
        <g fill="#FFFFFF" opacity="0.35">
          <circle cx="340" cy="158" r="5" className="anim-steam" />
          <circle cx="344" cy="146" r="6" className="anim-steam" style={{ animationDelay: '-2s' }} />
        </g>
      </g>
      {[16, 70, 130, 200, 420, 466].map((x, i) => pine(x, SILL - 6, 60 + (i % 3) * 12, 'var(--hill-3)'))}
      <path d={`M0 226Q120 210 240 224T480 220V${SILL}H0Z`} fill="var(--hill-3)" />
      <g className="night" fill="#E8F59A">
        {[[90, 180], [180, 150], [250, 210], [400, 170], [440, 214], [140, 120]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" className="anim-firefly" style={{ animationDelay: `${-i * 1.3}s` }} />
        ))}
      </g>
    </>
  )
}

function Library() {
  const spines = Array.from({ length: 30 }, (_, i) => [i * 16, 26 + ((i * 37) % 30), 12 + (i % 3) * 2])
  return (
    <>
      <Stars />
      <Moon x={390} y={66} r={15} />
      <g className="night">
        <line x1="180" y1="40" x2="240" y2="64" stroke="#FFF6DA" strokeWidth="1.6" strokeLinecap="round" className="anim-shoot" />
        <circle cx="0" cy="220" r="90" fill="#E5C07B" opacity="0.14" />
      </g>
      <g className="day">
        <circle cx="300" cy="230" r="120" fill="#FFD9A8" opacity="0.35" className="anim-breathe-soft" />
        <Cloud x={60} y={90} fill="#FFDCC8" delay={-6} />
        <Cloud x={300} y={60} s={0.7} fill="#FFE6D6" delay={-20} />
        <g stroke="#4D4C63" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M210 110q5-5 10 0q5-5 10 0" className="anim-flap" />
          <path d="M238 98q4-4 8 0q4-4 8 0" className="anim-flap" style={{ animationDelay: '-0.5s' }} />
        </g>
      </g>
      <g fill="var(--wood-edge)" opacity="0.9">
        {spines.map(([x, h, w], i) => <rect key={i} x={x} y={SILL - 6 - h} width={w} height={h} rx="2" />)}
        <rect x="0" y={SILL - 8} width={W} height="8" />
      </g>
    </>
  )
}

function Coast() {
  const houses = [[8, 186, 30, 26], [40, 180, 26, 32], [68, 190, 34, 22], [104, 176, 28, 36], [134, 192, 30, 20], [20, 204, 36, 24], [60, 208, 30, 20], [92, 206, 38, 22], [132, 210, 34, 18]]
  const roofs = ['#C9582F', '#D2693C', '#B84A26']
  return (
    <>
      <Sun x={370} y={70} r={22} from="#FFFDF0" to="#FFE6A8" id="coast-sun" />
      <Moon x={370} y={64} r={14} full />
      <Stars count={12} />
      <g className="day"><Cloud x={250} y={50} s={0.8} delay={-8} /></g>
      <defs>
        <linearGradient id="sea-day" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#46B6CC" /><stop offset="1" stopColor="#1A7896" /></linearGradient>
        <linearGradient id="sea-night" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#25356A" /><stop offset="1" stopColor="#121C3E" /></linearGradient>
      </defs>
      <path d="M240 180q50-26 110 0zM330 180q60-18 140 0z" fill="var(--hill-2)" opacity="0.8" />
      <rect x="0" y="180" width={W} height={SILL - 180} fill="url(#sea-day)" className="day" />
      <rect x="0" y="180" width={W} height={SILL - 180} fill="url(#sea-night)" className="night" />
      <g fill="#FFFFFF" opacity="0.7">
        {[[230, 196], [300, 210], [380, 200], [440, 224], [260, 230]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="10" height="1.6" rx="0.8" className="anim-twinkle" style={{ animationDelay: `${-i * 0.7}s` }} />
        ))}
      </g>
      <g className="anim-bob">
        <path d="M360 214h34l-6 7h-22z" fill="#F7F4EC" />
        <path d="M376 212v-32l14 30z" fill="#FFFFFF" />
        <path d="M376 180l-10 4l10 3z" fill="#C4562E" />
      </g>
      <rect x="196" y="150" width="14" height="68" fill="#EADFC8" />
      <path d="M193 152l10-14l10 14z" fill="#B84A26" />
      <rect x="200" y="160" width="6" height="8" rx="3" fill="#5E5547" />
      {houses.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="#F3EAD6" />
          <path d={`M${x - 2} ${y}l${w / 2 + 2} ${-10}l${w / 2 + 2} 10z`} fill={roofs[i % 3]} />
          <rect x={x + w / 2 - 3} y={y + 6} width="6" height="8" fill="#4F7350" className="day" />
          <rect x={x + w / 2 - 3} y={y + 6} width="6" height="8" fill="#FFD27A" className="night" />
        </g>
      ))}
      <rect x="0" y="226" width="220" height={SILL - 226} fill="#D8CBB0" />
      <path d="M0 226h220v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8v4h-8v-4h-8z" fill="#D8CBB0" />
      <g className="night" fill="#FFC56E">
        {[30, 90, 150].map((x) => <circle key={x} cx={x} cy="220" r="10" opacity="0.3" />)}
      </g>
    </>
  )
}

const VIEWS = { dusk: Dusk, rainy_cafe: Rain, forest: Forest, midnight: Library, seaside: Coast }

/* ------------------------------------------------------------ the sill */

function Sill() {
  return (
    <g>
      <defs>
        <linearGradient id="sill-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--wood)" />
          <stop offset="1" stopColor="var(--wood-edge)" />
        </linearGradient>
      </defs>
      <rect x="0" y={SILL - 3} width={W} height="3" fill="#000" opacity="0.12" />
      <rect x="0" y={SILL} width={W} height="10" fill="var(--wood)" />
      <rect x="0" y={SILL} width={W} height="10" fill="#FFFFFF" opacity="0.14" />
      <rect x="0" y={SILL + 10} width={W} height="46" fill="url(#sill-front)" />
      <g stroke="#000" strokeOpacity="0.1" strokeWidth="1.2" fill="none">
        <path d={`M0 ${SILL + 22}q120 -3 240 0t240 0`} />
        <path d={`M0 ${SILL + 34}q140 3 260 0t220 0`} />
      </g>
    </g>
  )
}

function Plant({ color }) {
  return (
    <g transform={`translate(44 ${SILL})`}>
      <g className="anim-sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
        <path d="M0 -26C-4 -50 -22 -58 -30 -54C-24 -44 -14 -34 0 -26z" fill={color} />
        <path d="M0 -26C2 -56 18 -70 28 -66C24 -52 14 -36 0 -26z" fill={color} />
        <path d="M0 -26C-2 -62 -6 -78 2 -86C8 -72 6 -48 0 -26z" fill={color} opacity="0.85" />
        <path d="M0 -26C10 -40 30 -42 36 -36C28 -28 14 -26 0 -26z" fill={color} opacity="0.75" />
      </g>
      <path d="M-16 -28h32l-4 28h-24z" fill="#C4704E" />
      <rect x="-18" y="-31" width="36" height="6" rx="2" fill="#D9825E" />
    </g>
  )
}

function BookStack({ colors }) {
  const books = [[38, 8, 0], [32, 6, 3], [35, 7, -2]]
  let y = 0
  return (
    <g transform={`translate(96 ${SILL})`}>
      {books.map(([w, h, dx], i) => {
        y -= h
        return (
          <g key={i}>
            <rect x={dx} y={y} width={w} height={h} rx="1.6" fill={colors[i]} />
            <rect x={dx + w - 4} y={y + 1.2} width="3" height={h - 2.4} fill="#F6EBD8" />
          </g>
        )
      })}
    </g>
  )
}

function Cat({ fur, stripe, blanket }) {
  return (
    <g transform={`translate(252 ${SILL})`}>
      {/* the folded blanket under the cat, draped over the sill */}
      <rect x="-62" y="-8" width="124" height="9" rx="4" fill={blanket[0]} />
      <path d="M-56 -4h20M-30 -4h20M-4 -4h20M22 -4h20" stroke={blanket[1]} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M18 0h40v26q-20 4-40 0z" fill={blanket[0]} />
      <path d="M18 8h40M18 16h40" stroke={blanket[1]} strokeWidth="2.4" />
      <g stroke={blanket[0]} strokeWidth="2" strokeLinecap="round">
        {[22, 30, 38, 46, 54].map((x) => <line key={x} x1={x} y1="26" x2={x} y2="31" />)}
      </g>
      {/* the cat */}
      <ellipse cx="2" cy="-7" rx="38" ry="4" fill="#000" opacity="0.12" />
      <g className="anim-breathe-cat">
        <ellipse cx="4" cy="-22" rx="34" ry="15" fill={fur} />
        <ellipse cx="6" cy="-30" rx="22" ry="5" fill="#FFFFFF" opacity="0.18" />
        <g stroke={stripe} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M2 -36q4 6 0 12" /><path d="M14 -35q4 6 0 12" /><path d="M26 -31q3 5 0 10" />
        </g>
        <path d="M36 -16q14 6 2 14q-22 6 -50 2" stroke={fur} strokeWidth="7" strokeLinecap="round" fill="none" />
      </g>
      <g transform="translate(-28 -20)">
        <path d="M-11 -6l2 -13l9 7z" fill={fur} />
        <path d="M11 -6l-2 -13l-9 7z" fill={fur} />
        <path d="M-8.5 -8l1.4 -7l4.4 4z" fill="#F2A7A7" />
        <path d="M8.5 -8l-1.4 -7l-4.4 4z" fill="#F2A7A7" />
        <circle r="13" fill={fur} />
        <g stroke="#3A2A35" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M-8 0q2.5 2.5 5 0" /><path d="M3 0q2.5 2.5 5 0" />
        </g>
        <path d="M-1.5 3.5h3l-1.5 1.8z" fill="#E58A8A" />
        <circle cx="-8" cy="5" r="2.4" fill="#F2A7A7" opacity="0.7" />
        <circle cx="8" cy="5" r="2.4" fill="#F2A7A7" opacity="0.7" />
        <ellipse cx="-6" cy="12" rx="5" ry="3" fill={fur} />
        <ellipse cx="5" cy="12.5" rx="5" ry="3" fill={fur} />
      </g>
      <g fill="var(--on-header)" fontFamily="Fredoka, ui-rounded, sans-serif" fontWeight="600">
        <text x="-34" y="-46" fontSize="11" className="anim-z">z</text>
        <text x="-26" y="-58" fontSize="9" className="anim-z" style={{ animationDelay: '-1.3s' }}>z</text>
        <text x="-20" y="-68" fontSize="7" className="anim-z" style={{ animationDelay: '-2.6s' }}>z</text>
      </g>
    </g>
  )
}

function Mug({ band }) {
  return (
    <g transform={`translate(392 ${SILL})`}>
      <g stroke="var(--on-header)" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M-4 -28q-4 -6 0 -12t0 -12" className="anim-steam" />
        <path d="M5 -28q-4 -6 0 -12t0 -12" className="anim-steam" style={{ animationDelay: '-1.6s' }} />
      </g>
      <path d="M11 -18q9 0 9 6t-9 6" stroke="#F6EBD8" strokeWidth="3" fill="none" />
      <rect x="-11" y="-22" width="22" height="22" rx="5" fill="#F6EBD8" />
      <rect x="-11" y="-14" width="22" height="5" fill={band} />
      <ellipse cx="0" cy="-21" rx="9" ry="2" fill="#5A3A26" />
    </g>
  )
}

function Candle() {
  return (
    <g transform={`translate(440 ${SILL})`} className="night">
      <g opacity="0.2"><circle cx="0" cy="-34" r="34" fill="#FFA84A" className="anim-flicker" /></g>
      <ellipse cx="0" cy="-2" rx="14" ry="3" fill="#C8962E" />
      <rect x="-6" y="-26" width="12" height="24" rx="2" fill="#F6EBD8" />
      <path d="M0 -40q5 6 0 12q-5 -6 0 -12z" fill="#FFC56E" className="anim-flicker" />
      <path d="M0 -36q2.5 4 0 7q-2.5 -3 0 -7z" fill="#FFF4C2" />
    </g>
  )
}

export default function Scene({ moodId, className = '' }) {
  const mood = moodById(moodId)
  const View = VIEWS[mood.id]
  return (
    <svg viewBox={`0 0 ${W} 300`} preserveAspectRatio="xMidYMax slice" className={className} role="img" aria-label={`${mood.label}: ${mood.tagline}`}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--sky-top)' }} />
          <stop offset="0.55" style={{ stopColor: 'var(--sky-mid)' }} />
          <stop offset="1" style={{ stopColor: 'var(--sky-bottom)' }} />
        </linearGradient>
      </defs>
      <rect width={W} height="300" fill="url(#sky)" />
      <View />
      <Sill />
      <Plant color={mood.plant} />
      <BookStack colors={mood.books} />
      <Cat fur={mood.cat.fur} stripe={mood.cat.stripe} blanket={mood.blanket} />
      <Mug band={mood.books[1]} />
      <Candle />
    </svg>
  )
}
