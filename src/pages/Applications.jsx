import { asset } from '../brand/asset.js';
import { Logo } from '../components/Logo.jsx';
import { Stripe } from '../components/Stripe.jsx';
import { SocialPosts } from '../components/SocialPosts.jsx';
import { PageHeader, Section, Figure } from '../components/ui.jsx';

export default function Applications() {
  return (
    <>
      <PageHeader
        eyebrow="Examples"
        title="Applications"
      />

      <Section title="Posters">
        <Figure src={asset('/assets/pdf/page-09.png')} alt="Four Neufin campaign posters" caption="Launch poster series." className="figure-narrow" />
      </Section>

      <Section title="Built from tokens" intro="The same poster built in HTML.">
        <div className="poster-live">
          <div className="poster-copy">
            <span>Cut<br />Energy<br />Cost.</span>
            <span className="poster-right">On<br />Your<br />Terms.</span>
          </div>
          <div className="poster-stripe"><Stripe width={600} height={300} y={20} thickness={70} kinkX={110} drop={150} /></div>
          <div className="poster-foot"><Logo height={30} color="var(--warm-white)" /></div>
        </div>
      </Section>

      <Section title="Social posts">
        <SocialPosts />
      </Section>

      <Section title="Banner">
        <div className="mini-poster" style={{ background: 'var(--electric-violet)' }}>
          <Stripe width={800} height={360} y={190} thickness={70} kinkX={260} drop={110} />
          <div className="mini-poster-copy">The smarter way to manage power.</div>
          <div className="mini-poster-logo"><Logo height={34} color="var(--warm-white)" /></div>
        </div>
      </Section>

      <Section title="Campaign pattern">
        <Figure src={asset('/assets/pdf/page-10.png')} alt="Do you know your bill? poster" caption="“Do you know your bill?” Type set on the Stripe angle." className="figure-narrow" />
      </Section>

      <Section title="Merchandise">
        <Figure src={asset('/assets/photos/merch.jpg')} alt="Tote bag, bottle and hard hat with the Neufin symbol" caption="On merchandise, the symbol works alone." className="figure-narrow" />
      </Section>

      <Section title="Stationery">
        <Figure src={asset('/assets/pdf/page-06.png')} alt="Neufin letterhead" caption="Letterhead: violet logo, Warm White Stripe." className="figure-narrow" />
      </Section>
    </>
  );
}
