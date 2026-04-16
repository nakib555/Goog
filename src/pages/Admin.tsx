import { File as FileIcon, Download, Package } from 'lucide-react';

// Fetch list of ZIPs from the public/updates folder using Vite's glob import
const updateModules = import.meta.glob('/public/updates/*.zip', { query: '?url', eager: true });

export default function Admin() {
  const updates = Object.keys(updateModules).map(path => {
    const fileName = path.split('/').pop() || '';
    return {
      name: fileName,
      url: `https://apkdistributionserver.nakibprince666.workers.dev/updates/${fileName}`
    };
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Update Management</h1>
        <p className="text-dim mt-1">List of ZIP files currently available in the public/updates directory.</p>
      </div>

      <div className="bg-surface rounded-xl shadow-sm border border-line overflow-hidden">
        <div className="bg-background px-6 py-4 border-b border-line flex items-center gap-2">
          <Package size={20} className="text-dim" />
          <h2 className="font-semibold text-foreground">Available Updates</h2>
        </div>
        
        {updates.length === 0 ? (
          <div className="p-12 text-center text-dim">
            <p>No ZIP files found.</p>
            <p className="text-sm mt-2">Add .zip files to the <code className="bg-background border border-line px-1 py-0.5 rounded">public/updates/</code> folder to see them here.</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {updates.map((update, i) => (
              <li key={i} className="p-6 hover:bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-line p-3 rounded-xl text-accent shrink-0">
                    <FileIcon size={28} />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground text-lg break-all">{update.name}</span>
                    <p className="text-sm text-dim mt-0.5">Path: {update.url}</p>
                  </div>
                </div>
                <a 
                  href={update.url} 
                  download
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-surface border border-line text-foreground rounded-lg hover:bg-line transition-colors shrink-0 shadow-sm"
                >
                  <Download size={18} />
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
