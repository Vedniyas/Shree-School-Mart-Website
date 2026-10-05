export type GalleryTab = 'stationery' | 'eco' | 'fiber' | 'wooden';

function trophyGallery(prefix: string, pageCount: number, folder: string, title: string) {
  return Array.from({ length: pageCount * 6 }, (_, index) => {
    const page = Math.floor(index / 6) + 1;
    const item = (index % 6) + 1;
    const pageNumber = String(page).padStart(3, '0');
    const itemNumber = String(item).padStart(2, '0');
    return {
      id: `${prefix}-${pageNumber}-${itemNumber}`,
      reference: `${prefix.toUpperCase()}-P${pageNumber}-${itemNumber}`,
      title: `${title} · Page ${page} · Item ${item}`,
      image: `${folder}/page-${pageNumber}-item-${itemNumber}.webp`,
    };
  });
}

export const stationeryGallery = Array.from({ length: 74 }, (_, index) => {
  const number = String(index + 1).padStart(3, '0');
  return {
    id: `stationery-${number}`,
    reference: `SSM-S${number}`,
    title: `Stationery product ${index + 1}`,
    image: `/products/stationery/item-${number}.webp`,
  };
});

export const galleryGroups = {
  stationery: stationeryGallery,
  eco: trophyGallery('eco', 11, '/products/trophies/eco-items', 'Economical Trophy'),
  fiber: trophyGallery('fiber', 14, '/products/trophies/fiber-items', 'Fiber Trophy'),
  wooden: trophyGallery('wooden', 36, '/products/trophies/wooden-items', 'Wooden Memento'),
};

export const galleryTabs: { id: GalleryTab; label: string; count: number }[] = [
  { id: 'stationery', label: 'Stationery photos', count: 74 },
  { id: 'eco', label: 'Economical trophies', count: 66 },
  { id: 'fiber', label: 'Fiber trophies', count: 84 },
  { id: 'wooden', label: 'Wooden mementos', count: 216 },
];
