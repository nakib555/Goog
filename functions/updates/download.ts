import JSZip from 'jszip';
import { apkName } from './apk-config';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  // Get the requested file name, default to the dynamically found APK
  const fileName = url.searchParams.get('file') || apkName;
  const actualFileName = fileName.replace(/_/g, ' ');
  
  try {
    // 1. Fetch the APK file from the static assets (/public/updates/...)
    const apkUrl = new URL(`/updates/${actualFileName}`, context.request.url);
    const apkResponse = await context.env.ASSETS.fetch(new Request(apkUrl));
    
    if (!apkResponse.ok) {
      return new Response(JSON.stringify({ error: 'APK file not found on server' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Read the APK file into memory
    const apkArrayBuffer = await apkResponse.arrayBuffer();

    // 2. Create a new ZIP file and add the APK inside it
    const zip = new JSZip();
    zip.file(actualFileName, apkArrayBuffer);

    // 3. Generate the ZIP file buffer
    const zipBuffer = await zip.generateAsync({ 
      type: 'arraybuffer',
      compression: 'STORE' // Use STORE (no compression) since APK is already compressed. This saves CPU and Memory!
    });

    // 4. Return the ZIP file as a download
    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="Update_${actualFileName}.zip"`,
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
