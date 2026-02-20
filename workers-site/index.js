import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  try {
    // Attempt to serve the asset as requested (CSS, JS, Images, etc.)
    return await getAssetFromKV(event);
  } catch (e) {
    // If the asset isn't found (likely a frontend route like /dashboard),
    // we force the request to look for index.html
    const url = new URL(event.request.url);
    url.pathname = '/index.html'; 
    
    const spaRequest = new Request(url.toString(), event.request);
    
    try {
      return await getAssetFromKV(event, {
        mapRequestToAsset: () => spaRequest,
      });
    } catch (innerError) {
      return new Response("Resource not found", { status: 404 });
    }
  }
}