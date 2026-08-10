# Foto asli

Taruh semua foto asli di sini, lalu rujuk dengan path absolut dari root situs.

Saran struktur:

```
public/images/
├── packages/     foto per paket  → "/images/packages/turki-hero.jpg"
├── gallery/      dokumentasi trip → "/images/gallery/cappadocia-2024.jpg"
└── team/         foto tim untuk halaman Tentang Kami
```

Yang perlu diubah setelah foto tersedia:

1. `heroImage` dan `gallery` di tiap file `src/content/packages/*.ts`
2. `src/content/gallery.ts`
3. `COLLAGE` di `src/components/home/Hero.tsx`
4. `CARDS` di `src/components/home/RegionSplit.tsx`

Setelah tidak ada lagi URL `picsum.photos` yang tersisa, hapus blok
`images.remotePatterns` di `next.config.ts`.

Ukuran yang disarankan: hero paket 1600×900, galeri minimal 1200 px sisi
terpanjang. Next.js yang mengurus kompresi dan ukuran responsifnya.
