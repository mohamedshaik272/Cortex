/** Web Mercator tile indices for Esri World Imagery (same grid as Leaflet at integer zoom). */
export function latLngToTile(lat, lon, zoom) {
  const z2 = 2 ** zoom;
  const x = Math.floor(((lon + 180) / 360) * z2);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * z2,
  );
  return { x, y };
}

/** Single tile JPEG — ~30 m across at z=20 near this latitude; unique per nearby lots. */
export function satelliteTileImageUrl(lat, lng, zoom = 20) {
  const { x, y } = latLngToTile(lat, lng, zoom);
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${x}`;
}
