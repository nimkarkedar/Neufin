import { asset } from '../brand/asset.js';
import { markBand } from './Stripe.jsx';
import { Logo } from './Logo.jsx';

// Posts are laid out on a 1080 × 1080 grid. u() converts grid units to container width units.
const W = 1080;
const u = (n) => `${(n / 10.8).toFixed(3)}cqw`;

function Canvas({ bg, art, children }) {
  return (
    <div className="post" style={{ aspectRatio: '1 / 1', background: bg }}>
      <svg viewBox={`0 0 ${W} ${W}`} className="post-art" aria-hidden="true">{art}</svg>
      {children}
    </div>
  );
}

function Frame() {
  const m = 72;
  const top = markBand({ x0: -20, kink: 816, y: 57, m, x2: W + 20 });
  const bottom = markBand({ x0: -20, kink: 89, y: 844, m, x2: W + 20 });
  const fg = 'var(--warm-white)';
  return (
    <Canvas bg="var(--electric-violet)" art={<><polygon points={top.points} fill={fg} /><polygon points={bottom.points} fill={fg} /></>}>
      <div className="post-head" style={{ left: u(132), top: u(330), width: u(900), fontSize: u(125), lineHeight: 0.86, color: fg }}>
        Choose the tariff, tenure and capacity.
      </div>
      <div className="post-logo" style={{ right: u(48), top: u(842) }}><Logo height={u(78)} color={fg} /></div>
    </Canvas>
  );
}

function Stat({ bg, band, ink, figure }) {
  const a = markBand({ x0: 401, y: 51, m: 154, x2: W + 20 });
  return (
    <Canvas bg={bg} art={<polygon points={a.points} fill={band} />}>
      <div className="post-logo" style={{ left: u(93), top: u(92) }}><Logo height={u(78)} color={ink} /></div>
      <div className="post-stat" style={{ left: u(93), top: u(400), width: u(930), color: ink }}>
        <span style={{ fontSize: u(60) }}>Up to</span>
        <strong style={{ fontSize: u(308), color: figure }}>40%</strong>
        <span style={{ fontSize: u(65), lineHeight: 1.55 }}>lower energy costs. Contracts from 30 days to 15 years.</span>
      </div>
    </Canvas>
  );
}

function Split() {
  const a = markBand({ x0: 289, y: 269, m: 112 });
  const fg = 'var(--warm-white)';
  return (
    <Canvas bg="var(--near-black)" art={null}>
      <img className="post-photo" src={asset('/assets/photos/pylon.jpg')} alt="" style={{ left: u(544) }} />
      <svg viewBox={`0 0 ${W} ${W}`} className="post-art" aria-hidden="true"><polygon points={a.points} fill={fg} /></svg>
      <div className="post-logo" style={{ left: u(70), top: u(53) }}><Logo height={u(78)} color={fg} /></div>
      <div className="post-line" style={{ left: u(718), top: u(46), fontSize: u(37), color: fg }}>Cut Energy Cost.<br />On Your Terms.</div>
      <div className="post-head" style={{ left: u(71), bottom: u(40), width: u(320), fontSize: u(95), lineHeight: 0.88, color: fg }}>
        Pay less for every unit you use.
      </div>
    </Canvas>
  );
}

const posts = [
  { name: 'Frame', C: Frame },
  { name: 'Stat, light', C: () => <Stat bg="var(--warm-white)" band="var(--electric-violet)" ink="var(--near-black)" figure="var(--electric-violet)" /> },
  { name: 'Stat, coral', C: () => <Stat bg="var(--electric-coral)" band="var(--near-black)" ink="var(--warm-white)" figure="var(--warm-white)" /> },
  { name: 'Split', C: Split },
];

export function SocialPosts() {
  return (
    <div className="post-grid">
      {posts.map(({ name, C }) => (
        <figure key={name} className="post-fig">
          <C />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
