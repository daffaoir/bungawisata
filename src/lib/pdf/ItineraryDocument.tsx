import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ADDRESS_LINE, site } from "@/content/site";
import type { AppLocale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import {
  formatDurationCode,
  formatMealCodes,
  toPdfText,
} from "@/lib/itinerary-pdf";
import type { Package } from "@/lib/schema";

/**
 * Label PDF sengaja tidak diambil dari `src/messages/*.json`.
 *
 * Kosakatanya khas lembar itinerary (kode makan, kolom "min. peserta") dan
 * tidak dipakai di mana pun di situs, jadi menaruhnya di sini membuat modul
 * PDF berdiri sendiri — bisa dirender dari route handler statis tanpa perlu
 * konteks permintaan next-intl.
 */
const LABELS: Record<AppLocale, Record<string, string>> = {
  id: {
    day: "HARI",
    accommodation: "AKOMODASI",
    hotel: "HOTEL",
    city: "KOTA",
    nights: "MALAM",
    price: "HARGA",
    perPerson: "per orang",
    minPax: "min. peserta",
    departure: "Keberangkatan",
    airline: "Maskapai",
    includes: "Harga termasuk",
    excludes: "Harga tidak termasuk",
    notes: "Catatan",
    mealLegend: "Mp = makan pagi · Ms = makan siang · Mm = makan malam",
    disclaimer:
      "Harga bersifat indikatif dan dapat berubah. Silakan konfirmasi ke kami sebelum memesan.",
  },
  en: {
    day: "DAY",
    accommodation: "ACCOMMODATION",
    hotel: "HOTEL",
    city: "CITY",
    nights: "NIGHTS",
    price: "PRICE",
    perPerson: "per person",
    minPax: "min. pax",
    departure: "Departure from",
    airline: "Airline",
    includes: "Price includes",
    excludes: "Price excludes",
    notes: "Notes",
    mealLegend: "B = breakfast · L = lunch · D = dinner",
    disclaimer:
      "Prices are indicative and subject to change. Please confirm with us before booking.",
  },
};

const INK = "#0F0F0F";
const INK_SOFT = "#4A4A4A";
const INK_MUTED = "#6E6E6E";
const GOLD = "#8A6D3B";
const LINE = "#DCD8D0";

/**
 * Helvetica adalah salah satu dari 14 font standar PDF, jadi tidak perlu
 * disematkan — berkasnya jauh lebih kecil dan tidak ada file TTF yang harus
 * ikut masuk repo. Konsekuensinya, PDF tidak memakai Playfair/Inter seperti
 * situsnya.
 */
const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 56,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: INK,
    lineHeight: 1.5,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1.5,
    borderBottomColor: GOLD,
    paddingBottom: 12,
  },
  logo: { width: 108 },
  headerRight: { alignItems: "flex-end", maxWidth: 300 },
  title: { fontFamily: "Helvetica-Bold", fontSize: 16, textAlign: "right" },
  subtitle: { fontSize: 10, color: INK_SOFT, marginTop: 3 },
  meta: { fontSize: 8, color: INK_MUTED, marginTop: 2 },

  dayBlock: { marginTop: 14 },
  dayHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F1ED",
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  dayTitle: { fontFamily: "Helvetica-Bold", fontSize: 9.5, flex: 1 },
  dayMeals: { fontFamily: "Helvetica-Bold", fontSize: 8.5, color: GOLD },

  bullet: { flexDirection: "row", marginTop: 4, paddingRight: 8 },
  bulletDot: { width: 10, color: GOLD },
  bulletText: { flex: 1, color: INK_SOFT },

  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 1.1,
    marginBottom: 6,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: LINE,
    paddingVertical: 4,
  },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: INK,
    paddingBottom: 3,
  },
  cellHead: { fontFamily: "Helvetica-Bold", fontSize: 8, letterSpacing: 0.8 },
  colHotel: { flex: 3 },
  colCity: { flex: 2 },
  colNights: { flex: 1, textAlign: "right" },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: INK,
    paddingTop: 8,
  },
  price: { fontFamily: "Helvetica-Bold", fontSize: 15 },

  columns: { flexDirection: "row", gap: 22, marginTop: 18 },
  column: { flex: 1 },

  footer: {
    position: "absolute",
    bottom: 22,
    left: 40,
    right: 40,
    borderTopWidth: 0.5,
    borderTopColor: LINE,
    paddingTop: 6,
    fontSize: 7.5,
    color: INK_MUTED,
  },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{toPdfText(children)}</Text>
    </View>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, index) => (
        <View key={item} style={styles.bullet} wrap={false}>
          <Text style={styles.bulletDot}>{index + 1}.</Text>
          <Text style={styles.bulletText}>{toPdfText(item)}</Text>
        </View>
      ))}
    </>
  );
}

export function ItineraryDocument({
  pkg,
  locale,
  logo,
}: {
  pkg: Package;
  locale: AppLocale;
  /** Isi `public/logo-full.png`; dibaca pemanggil supaya modul ini murni. */
  logo: Buffer;
}) {
  const t = LABELS[locale];
  const content = pkg.content[locale];
  const duration = formatDurationCode(
    pkg.durationDays,
    pkg.durationNights,
    locale,
  );

  return (
    <Document
      title={content.title}
      author={site.name}
      subject={content.summary}
      creator={site.name}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          {/*
            Ini <Image> milik @react-pdf, bukan HTML — komponennya tidak
            mengenal prop `alt`, jadi aturan jsx-a11y tidak berlaku di sini.
          */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={{ data: logo, format: "png" }} style={styles.logo} />

          <View style={styles.headerRight}>
            <Text style={styles.title}>{toPdfText(content.title)}</Text>
            <Text style={styles.subtitle}>
              {toPdfText(pkg.destination)} · {duration}
            </Text>
            <Text style={styles.meta}>
              {t.departure}: {toPdfText(pkg.departureFrom)}
              {pkg.airline ? ` · ${t.airline}: ${toPdfText(pkg.airline)}` : ""}
            </Text>
          </View>
        </View>

        {content.itinerary.map((day) => {
          const codes = formatMealCodes(day.meals, locale);

          return (
            <View key={day.day} style={styles.dayBlock} wrap={false}>
              <View style={styles.dayHead}>
                <Text style={styles.dayTitle}>
                  {t.day} {day.day} — {toPdfText(day.title).toUpperCase()}
                </Text>
                {codes ? <Text style={styles.dayMeals}>({codes})</Text> : null}
              </View>

              {day.activities.map((activity) => (
                <Bullet key={activity}>{activity}</Bullet>
              ))}
            </View>
          );
        })}

        <View style={{ marginTop: 20 }} wrap={false}>
          <Text style={styles.sectionTitle}>{t.accommodation}</Text>

          <View style={styles.tableHead}>
            <Text style={[styles.cellHead, styles.colHotel]}>{t.hotel}</Text>
            <Text style={[styles.cellHead, styles.colCity]}>{t.city}</Text>
            <Text style={[styles.cellHead, styles.colNights]}>{t.nights}</Text>
          </View>

          {pkg.hotels.map((hotel) => (
            <View key={`${hotel.city}-${hotel.name}`} style={styles.tableRow}>
              {/*
                Bintangnya ditulis "3*", bukan "★★★": Helvetica bawaan PDF
                memakai encoding WinAnsi yang tidak punya glif bintang, dan
                karakter yang tidak ada akan hilang tanpa peringatan.
              */}
              <Text style={styles.colHotel}>
                {toPdfText(hotel.name)}
                {hotel.stars ? ` (${hotel.stars}*)` : ""}
              </Text>
              <Text style={styles.colCity}>{toPdfText(hotel.city)}</Text>
              <Text style={styles.colNights}>{hotel.nights}</Text>
            </View>
          ))}

          <View style={styles.priceRow}>
            <Text style={{ color: INK_MUTED }}>
              {t.price} · {t.minPax} {pkg.minPax}
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>
                {formatPrice(pkg.priceFrom, locale)}
              </Text>
              <Text style={{ color: INK_MUTED }}>{t.perPerson}</Text>
            </View>
          </View>
        </View>

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>{t.includes.toUpperCase()}</Text>
            <NumberedList items={content.includes} />
          </View>
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>{t.excludes.toUpperCase()}</Text>
            <NumberedList items={content.excludes} />
          </View>
        </View>

        {content.notes ? (
          <View style={{ marginTop: 18 }}>
            <Text style={styles.sectionTitle}>{t.notes.toUpperCase()}</Text>
            <Text style={{ color: INK_SOFT }}>{toPdfText(content.notes)}</Text>
          </View>
        ) : null}

        <Text style={{ marginTop: 12, fontSize: 7.5, color: INK_MUTED }}>
          {t.mealLegend}
        </Text>

        <View style={styles.footer} fixed>
          <Text>
            {site.name} · WhatsApp {site.phoneDisplay} · {site.email}
          </Text>
          <Text>{ADDRESS_LINE}</Text>
          <Text style={{ marginTop: 2 }}>{t.disclaimer}</Text>
        </View>
      </Page>
    </Document>
  );
}
