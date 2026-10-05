import { Logo } from '../components/Logo.jsx';
import { Section } from '../components/ui.jsx';
import { flatNav } from '../nav.js';

export default function Overview() {
  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <Logo variant="stacked" height={96} color="var(--warm-white)" />
          <p className="hero-line">Cut Energy Cost. On Your Terms.</p>
        </div>
      </div>

      <Section title="What this is">
        <p className="prose">
          Brand and product guidelines for Neufin Energy.
        </p>
      </Section>

      <Section title="Contents">
        <div className="card-grid">
          {flatNav.filter((n) => n.id !== 'overview').map((n) => (
            <a key={n.id} href={`#/${n.id}`} className="card-link">
              <span>{n.label}</span>
              {n.status && <span className={`nav-status nav-status-${n.status}`}>{n.status}</span>}
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
