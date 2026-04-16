import { Download, Info, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const [downloadUrl, setDownloadUrl] = useState<string>('/updates/download');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/updates/version.json')
      .then(res => {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        throw new Error('Not JSON');
      })
      .then(data => {
        if (data.zipUrl) {
          setDownloadUrl(data.zipUrl);
        }
        setIsLoading(false);
      })
      .catch(() => {
        // Fallback for local dev environment silently
        setDownloadUrl('https://apkdistributionserver.nakibprince666.workers.dev/updates/download');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Get the Latest App Update
        </h1>
        <p className="text-lg md:text-xl text-dim max-w-2xl mx-auto">
          Download the latest version of our Android application directly from our secure static update server.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a 
            href={downloadUrl}
            className={`flex items-center gap-2 bg-accent hover:bg-accent-hover text-background px-6 py-3 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            download
          >
            <Download size={20} />
            {isLoading ? 'Loading...' : 'Download Latest ZIP'}
          </a>
          <a 
            href="/updates/version.json" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-surface border border-line hover:bg-line text-foreground px-6 py-3 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            View version.json
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-line flex flex-col items-center text-center space-y-4">
          <div className="bg-line p-3 rounded-full text-accent">
            <Zap size={28} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Fast Updates</h3>
          <p className="text-dim text-sm">
            Our app checks for updates automatically and downloads them in the background for a seamless experience.
          </p>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-line flex flex-col items-center text-center space-y-4">
          <div className="bg-line p-3 rounded-full text-accent">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Secure & Verified</h3>
          <p className="text-dim text-sm">
            Every update is cryptographically signed and verified using SHA-256 hashing before installation.
          </p>
        </div>
        <div className="bg-surface p-6 rounded-xl shadow-sm border border-line flex flex-col items-center text-center space-y-4">
          <div className="bg-line p-3 rounded-full text-accent">
            <Info size={28} />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Transparent</h3>
          <p className="text-dim text-sm">
            View detailed changelogs and version information before deciding to install an update.
          </p>
        </div>
      </section>

      <section className="bg-surface rounded-2xl p-8 md:p-12 text-foreground shadow-lg overflow-hidden relative border border-line">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-line opacity-50">
          <Smartphone size={200} />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">How the Auto-Update Works</h2>
          <ol className="space-y-4 text-dim list-decimal list-inside">
            <li>The app periodically fetches <code className="bg-background px-2 py-1 rounded text-accent text-sm border border-line">version.json</code> from this server.</li>
            <li>It compares the remote <code className="bg-background px-2 py-1 rounded text-accent text-sm border border-line">versionCode</code> with its current version.</li>
            <li>If an update is available, it downloads the ZIP file.</li>
            <li>The app verifies the downloaded file against the provided SHA-256 hash.</li>
            <li>The user is prompted to install the verified update.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
