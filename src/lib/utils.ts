import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function calculateSHA256(file: File, onProgress?: (progress: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunkSize = 1024 * 1024 * 5; // 5MB chunks
    const fileSize = file.size;
    let offset = 0;
    
    // We'll use a simpler approach for browser: read as ArrayBuffer and hash
    // For very large files, this might use a lot of memory, but for typical APKs (10-100MB) it's fine.
    // To be truly memory efficient, we'd need a streaming hash library, but Web Crypto API 
    // requires the whole buffer at once unless we use experimental streams.
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        if (onProgress) onProgress(50); // Reading done
        
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        if (onProgress) onProgress(90); // Hashing done
        
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if (onProgress) onProgress(100);
        resolve(hashHex);
      } catch (err) {
        reject(err);
      }
    };
    
    reader.onerror = (e) => reject(e);
    reader.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        // Up to 50% for reading
        onProgress(Math.round((e.loaded / e.total) * 50));
      }
    };
    
    reader.readAsArrayBuffer(file);
  });
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
