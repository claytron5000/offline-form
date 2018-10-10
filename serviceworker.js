
const version = 'V0.08';
const staticCacheName = version + 'staticfiles';


addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName)
        .then( staticCache => {
            return staticCache.addAll([
                '/index.html',
                '/style.e308ff8e.css'
            ])
        })
        .catch( error => {
            console.log('Failed to cache');
        })
    )
})

addEventListener('activate', activateEvent => {
    console.log('The service worker is activated.')
})

addEventListener('fetch', fetchEvent => {

    const request = fetchEvent.request;

    fetchEvent.respondWith(
        // Check cache for request.
        caches.match(request)
        .then( responseFromCache => {
            console.log('check that caches match request', request)

            if (responseFromCache) {
                console.log('responsefromCache')
                return responseFromCache;
            }
            console.log('response from fetch')
            return fetch(request)
        })
    );
})
