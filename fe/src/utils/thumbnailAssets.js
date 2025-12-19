/**
 * List of available thumbnail images in the public/assets folder
 * These can be selected when creating or editing videos
 */
export const AVAILABLE_THUMBNAILS = [
  { filename: 'RoDynRF.jpg', label: 'RoDynRF' },
  { filename: 'alot.jpg', label: 'A Lot' },
  { filename: 'backprop.jpg', label: 'Backprop' },
  { filename: 'chelsea.png', label: 'Chelsea' },
  { filename: 'chimsau.png', label: 'Chim Sau' },
  { filename: 'clan.jpg', label: 'Clan' },
  { filename: 'doraemon.jpg', label: 'Doraemon' },
  { filename: 'elclasico.jpg', label: 'El Clasico' },
  { filename: 'embedding.jpg', label: 'Embedding' },
  { filename: 'loveis.jpg', label: 'Love Is' },
  { filename: 'mission_impossible.jpg', label: 'Mission Impossible' },
  { filename: 'mu_spurs.jpg', label: 'MU vs Spurs' },
  { filename: 'onepiece.jpg', label: 'One Piece' },
  { filename: 'predator.jpg', label: 'Predator' },
  { filename: 'video.jpg', label: 'Video' },
];

/**
 * Get the full path for a thumbnail asset
 */
export const getThumbnailPath = (filename) => {
  return `/assets/${filename}`;
};
