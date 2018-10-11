"use strict";

const version = 'V0.17';
const staticCacheName = version + 'staticfiles';


addEventListener('install', installEvent => {
    skipWaiting();
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
            console.log('Failed: ', error);
        })
    )
})

addEventListener('activate', activateEvent => {
    activateEvent.waitUntil(
        caches.keys()
        .then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName != staticCacheName) {
                        return caches.delete(cacheName);
                    } // end if
                }) // end map
            ); // end return Promise.all
        }) // end keys then
        .then( () => {
            return clients.claim();
        }) // end then
    ); // end waitUntil
}); // end addEventListener

addEventListener('fetch', fetchEvent => {

    const request = fetchEvent.request;

    fetchEvent.respondWith(
        // Check cache for request.
        // delete old caches here
        caches.match(request)
            .then( responseFromCache => {
                if (responseFromCache) {
                    console.log('responsefromCache', responseFromCache)
                    return responseFromCache;
                }
                console.log('response from fetch', request)
                return fetch(request)
            })
    );
})
