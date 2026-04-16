import { apkName, apkVersion } from './apk-config';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Generate the dynamic zip URL that points to our download function
  const zipUrl = `${url.origin}/updates/download?file=${apkName}`;
  
  return new Response(JSON.stringify({
    version: apkVersion,
    zipUrl: zipUrl
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
