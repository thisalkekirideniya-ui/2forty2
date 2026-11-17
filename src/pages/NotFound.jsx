import Page from '../components/layout/Page';
import Button from '../components/ui/Button';
import { Equalizer } from '../components/ui/Primitives';

export default function NotFound() {
  return (
    <Page meta={{ title: 'Page not found — 2Forty2', description: 'This page could not be found.' }}>
      <section className="container-x flex min-h-[90svh] flex-col items-start justify-center pt-28">
        <p className="t-eyebrow flex items-center gap-3" data-load="fade">
          <Equalizer className="text-signal-soft" /> Error 404
        </p>
        <h1 className="t-mega text-outline mt-6" data-load="fade" data-load-delay="0.1">404</h1>
        <p className="t-h3 mt-6" data-load="fade" data-load-delay="0.2">
          This track isn’t on <span className="t-accent text-signal-soft">the setlist.</span>
        </p>
        <div className="mt-10" data-load="fade" data-load-delay="0.3">
          <Button to="/" size="lg">Back to home</Button>
        </div>
      </section>
    </Page>
  );
}
