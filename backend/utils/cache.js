// utils/cache.js
const cache = {};
const ttl = 10 * 60 * 1000; // 1 minute

function setCache(key, data) {
  cache[key] = {
    data,
    expiry: Date.now() + ttl
  };
}

function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    delete cache[key];
    return null;
  }
  return entry.data;
}

function clearCache(key) {
  delete cache[key];
}

module.exports = { setCache, getCache,clearCache };
