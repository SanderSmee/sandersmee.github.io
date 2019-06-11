self.addEventListener("fetch", event => {
  event.respondWith(handleRequest(event))
});

async function handleRequest(event) {
  const response = await fetch(event.request);
  return response;
}
