# Comunitate Muzicală
 - Pagina WEB este o simulare pentru un mini-Forum 
 - Se pot crea discutii printr-un formular iar cele existente apar in sectiunea "Discutii Comunitate"
 - Exista si un Camp de cautare pentru a cauta discutii dupa Titlu

## API
- URL: https://jsonplaceholder.typicode.com/posts din enuntul Temei

## CORS
- Aplicația cere date direct din browser.
- API-ul public permite aceste cereri cross-origin, nu am configurat server sau proxy.

## Status Codes tratate
- 200 la GET: afisez postarile primite printr-o lista
- Lista goala: afisez mesaj specific ca Lista este goala
- 4xx la GET: afisez mesaj specific si Status Code HTTP

- 201: la POST: adaug discutia noua in lista + mesaj de succes sub formular
- 4xx: la POST: sub Formular afisez mesajul error trimis de server, daca lipseste Status Code HTTP
- Alte erori prinse in 'catch': afisez mesaj generic
