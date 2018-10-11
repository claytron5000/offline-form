
const version = 'V0.07';
const staticCacheName = version + 'staticfiles';


addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName)
        .then( staticCache => {
            return staticCache.addAll([
                'index.html',
                'style.css',
                'index_bundle.js'
            ])
        })
        .catch( error => {
            console.log('Failed to cache');
        })
    )
})


addEventListener('fetch', fetchEvent => {

    const request = fetchEvent.request;

    fetchEvent.respondWith(
        // Check cache for request.
        // cache = new Cache();
        caches.match(request)
            .then( responseFromCache => {
                console.log('request matched something in cache')
                if (responseFromCache) {
                    console.log('responsefromCache', responseFromCache)
                    return responseFromCache;
                }
                console.log('response from fetch', request)
                return fetch(request)
            })
    );
})
