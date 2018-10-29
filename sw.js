//ASIGNAR NOMBRE Y VERISON DE LA CACHE
const CACHE_NAME='v1_cache_pwa_prueba';

//archivos cacheables en la aplicación
//todas las imagenes y estilos
var UrlsToCache=[
  './',
  './css/styles.css',
  './img/favicon.png',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/facebook.png',
  './img/instagram.png',
  './img/twitter.png',
  './img/favicon-1024.png',
  './img/favicon-128.png',
  './img/favicon-16.png',
  './img/favicon-512.png',
  './img/favicon-384.png',
  './img/favicon-256.png',
  './img/favicon-192.png',
  './img/favicon-96.png',
  './img/favicon-64.png',
  './img/favicon-16.png',
];

//evento install (de instalación )
//instalación y guardar en cache los recursos estáticos
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(UrlsToCache)
      .then(()=>{
        self.skipWaiting();
      });
    }).catch(err=>
      console.log('no se ha registrado el cache',err)));
});

//evento activate activar la aplicación
//este evento es el que hace que funcione sin conexion
self.addEventListener('activate',e=>{
  const cacheWhiteList=[CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames =>{
        return Promise.all(cacheNames.map(cacheName=>{
          if(cacheWhiteList.indexOf(cacheName)===- 1){
              //borramos los elementos que no necesitamos
              return caches.delete(cacheName);
          }
        })
       );
     })
     .then(()=>{
       //activa la cache en el dispositivo
        self.clients.claim();
     })
  );
});

//evento fetch traer desde el internet
//comprobarra si la url está en cache y si no la solicita por internet
self.addEventListener('fetch',e=>{
    e.respondWith(
      caches.match(e.request)
        .then(res=>{
          if(res){
            //devuelvo datos desde caches
            return res;
          }
          return fetch(e.request);
        })
    );
});
