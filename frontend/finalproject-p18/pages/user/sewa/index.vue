<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <RouterLink
      to="/user"
      class="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Dashboard
    </RouterLink>

    <h1 class="text-3xl font-bold mb-6 text-blue-600">Sewa Kamar</h1>

    <!-- Spesifikasi Kamar -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">
        Spesifikasi Kamar
      </h2>
      <ul class="list-disc list-inside text-gray-700">
        <li>Luas Kamar: 4x5 meter</li>
        <li>Fasilitas: TV, Meja Belajar, Kursi Belajar, Tempat Tidur Queen</li>
      </ul>
    </div>

    <!-- Pilihan Periode Sewa -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">
        Pilih Periode Sewa
      </h2>
      <div class="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            name="rentalPeriod"
            value="3"
            v-model="rentalPeriod"
            class="mr-2"
          />
          3 Bulan
        </label>
        <label>
          <input
            type="radio"
            name="rentalPeriod"
            value="6"
            v-model="rentalPeriod"
            class="mr-2"
          />
          6 Bulan
        </label>
      </div>
    </div>

    <!-- Fitur Tambahan -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Fitur Tambahan</h2>
      <div class="flex flex-col space-y-2">
        <label>
          <input
            type="checkbox"
            value="Laundry"
            v-model="additionalFeatures"
            class="mr-2"
          />
          Laundry
        </label>
        <label>
          <input
            type="checkbox"
            value="Cleaning Service"
            v-model="additionalFeatures"
            class="mr-2"
          />
          Cleaning Service
        </label>
        <label>
          <input
            type="checkbox"
            value="Catering"
            v-model="additionalFeatures"
            class="mr-2"
          />
          Catering
        </label>
      </div>
    </div>

    <!-- Tombol Navigasi -->
    <div class="flex justify-end">
      <router-link
        :to="{
          path: '/user/sewa/bayar',
          query: {
            period: rentalPeriod,
            features: additionalFeatures.join(','),
          },
        }"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Lanjutkan ke Pembayaran
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SewaKamar",
  setup() {
    const rentalPeriod = ref(null); // Menyimpan pilihan periode sewa
    const additionalFeatures = ref([]); // Menyimpan fitur tambahan yang dipilih

    return {
      rentalPeriod,
      additionalFeatures,
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
