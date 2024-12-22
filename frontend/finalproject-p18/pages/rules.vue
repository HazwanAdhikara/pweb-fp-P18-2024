<template>
  <div class="min-h-screen bg-[#FEF9F2] py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <header
        class="bg-[#789DBC] text-white py-6 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 class="text-4xl font-extrabold">Aturan Kost</h1>
        <p class="mt-2 text-white font-light">
          Harap diperhatikan dan dipatuhi untuk kenyamanan bersama.
        </p>
      </header>

      <div class="p-6 sm:p-8 lg:p-10 space-y-8">
        <section>
          <h2 class="text-2xl font-semibold text-red-300 flex items-center">
            <AlertTriangle class="mr-2 h-6 w-6" />
            Peringatan
          </h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div
              v-for="(item, index) in warnings"
              :key="index"
              class="bg-[#C9E9D2] bg-opacity-30 p-4 rounded-lg flex items-start"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 text-[#789DBC] mr-3 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="font-bold text-[#789DBC]">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-red-300 flex items-center">
            <Book class="mr-2 h-6 w-6" />
            Peraturan
          </h2>
          <div class="mt-4 space-y-4">
            <div
              v-for="(item, index) in rules"
              :key="index"
              class="bg-white border border-[#C9E9D2] p-4 rounded-lg shadow-sm flex items-start"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 text-[#789DBC] mr-3 mt-1 flex-shrink-0"
              />
              <div>
                <h3 class="font-bold text-[#789DBC]">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-gray-600">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer
        class="bg-[#FEF9F2] text-center py-4 text-sm text-[#789DBC] font-light"
      >
        Terima kasih atas kerja sama Anda dalam mematuhi aturan kost ini.
      </footer>
    </div>
  </div>
</template>

<script setup>
import {
  AlertTriangle,
  Book,
  Clock,
  CreditCard,
  Home,
  Music,
  PawPrint,
  Power,
  Trash2,
  Users,
} from "lucide-vue-next";

const warnings = [
  {
    icon: Trash2,
    title: "Kebersihan",
    content:
      "Jaga kebersihan kamar dan area bersama. Buang sampah pada tempatnya.",
  },
  {
    icon: Music,
    title: "Kebisingan",
    content:
      "Hindari membuat kebisingan yang mengganggu, terutama pada malam hari.",
  },
  {
    icon: Home,
    title: "Keamanan",
    content: "Pastikan pintu kamar dan pintu utama selalu terkunci.",
  },
  {
    icon: Users,
    title: "Tamu",
    content:
      "Tamu hanya diperbolehkan berkunjung pada jam yang telah ditentukan.",
  },
];

const rules = [
  {
    icon: Clock,
    title: "Jam Malam",
    content: "Penghuni harus kembali ke kost sebelum jam 22.00.",
  },
  {
    icon: CreditCard,
    title: "Pembayaran",
    content: "Pembayaran sewa kost harus dilakukan tepat waktu setiap bulan.",
  },
  {
    icon: AlertTriangle,
    title: "Larangan",
    content:
      "Merokok dan mengonsumsi alkohol di dalam area kost dilarang keras.",
  },
  {
    icon: PawPrint,
    title: "Hewan Peliharaan",
    content: "Hewan peliharaan tidak diperbolehkan kecuali dengan izin khusus.",
  },
  {
    icon: Home,
    title: "Perbaikan",
    content: "Penghuni tidak diperbolehkan melakukan perbaikan tanpa izin.",
  },
  {
    icon: Power,
    title: "Penggunaan Listrik dan Air",
    content: "Gunakan listrik dan air dengan bijak.",
  },
  {
    icon: Users,
    title: "Kegiatan Sosial",
    content: "Kegiatan sosial harus mendapatkan izin terlebih dahulu.",
  },
];
</script>
