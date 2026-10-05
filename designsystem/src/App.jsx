import { useEffect, useState } from 'react';
import { nav, flatNav } from './nav.js';
import { Logo } from './components/Logo.jsx';

const currentId = () => window.location.hash.replace(/^#\/?/, '') || flatNav[0].id;

export default function App() {
  const [id, setId] = useState(currentId);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setId(currentId());
      setMenuOpen(false);
      document.querySelector('.content')?.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const index = Math.max(0, flatNav.findIndex((i) => i.id === id));
  const item = flatNav[index];
  const Page = item.page;
  const prev = flatNav[index - 1];
  const next = flatNav[index + 1];

  useEffect(() => {
    document.title = `${item.label} · Neufin Brand`;
  }, [item]);

  return (
    <div className={`shell ${menuOpen ? 'menu-open' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-top">
          <a href="#/overview" className="sidebar-logo" aria-label="Neufin Energy brand home">
            <Logo variant="horizontal" height={22} />
          </a>
          <span className="sidebar-tag">Brand &amp; Product</span>
        </div>
        <nav className="sidebar-nav">
          {nav.map((g) => (
            <div key={g.group} className="nav-group">
              <div className="nav-group-label">{g.group}</div>
              {g.items.map((n) => (
                <a key={n.id} href={`#/${n.id}`} className={`nav-link ${n.id === item.id ? 'active' : ''}`}>
                  {n.label}
                  {n.status && <span className={`nav-status nav-status-${n.status}`}>{n.status}</span>}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">v0.1 · Source of truth for Neufin brand</div>
      </aside>

      <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle navigation">
        <span /><span /><span />
      </button>

      <main className="content">
        <div className="page" key={item.id}>
          <Page />
          <footer className="pager">
            {prev ? <a href={`#/${prev.id}`}>← {prev.label}</a> : <span />}
            {next ? <a href={`#/${next.id}`}>{next.label} →</a> : <span />}
          </footer>
        </div>
      </main>
    </div>
  );
}
