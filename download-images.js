import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Menggunakan API khusus Developer (Picsum) yang kebal pemblokiran
const imagesToDownload = [
    { name: 'hero-1.jpg', url: 'https://picsum.photos/seed/alam1/1920/1080' },
    { name: 'hero-2.jpg', url: 'https://picsum.photos/seed/alam2/1920/1080' },
    { name: 'hero-3.jpg', url: 'https://picsum.photos/seed/alam3/1920/1080' },
    { name: 'tour-borobudur.jpg', url: 'https://picsum.photos/seed/candi/800/600' },
    { name: 'tour-penida.jpg', url: 'https://picsum.photos/seed/pantai/800/600' },
    { name: 'tour-bromo.jpg', url: 'https://picsum.photos/seed/gunung/800/600' },
    { name: 'tour-rajaampat.jpg', url: 'https://picsum.photos/seed/pulau/800/600' },
    { name: 'tour-gili.jpg', url: 'https://picsum.photos/seed/laut/800/600' },
    { name: 'tour-ubud.jpg', url: 'https://picsum.photos/seed/sawah/800/600' }
];

async function downloadImage(image) {
    try {
        console.log(`⏳ Sedang mengunduh ${image.name}...`);

        // Fetch akan otomatis mengikuti redirect dari API Picsum
        const response = await fetch(image.url);
        if (!response.ok) throw new Error(`Gagal fetch: ${response.status}`);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFileSync(path.join(imagesDir, image.name), buffer);
        console.log(`✅ Sukses: ${image.name}`);
    } catch (error) {
        console.error(`❌ Error pada ${image.name}:`, error.message);
    }
}

async function run() {
    console.log('🚀 Memulai unduhan dari server khusus Developer...\n');
    for (const img of imagesToDownload) {
        await downloadImage(img);
        // Memberikan jeda 0.5 detik antar unduhan agar lebih aman
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('\n🎉 Selesai! Silakan cek web Anda.');
}

run();