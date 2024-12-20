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
          <input type="radio" :value="3" v-model="rentalPeriod" class="mr-2" />
          3 Bulan
        </label>
        <label>
          <input type="radio" :value="6" v-model="rentalPeriod" class="mr-2" />
          6 Bulan
        </label>
      </div>
    </div>

    <!-- Fitur Tambahan -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Fitur Tambahan</h2>

      <div class="grid grid-cols-2 gap-4">
        <!-- Laundry -->
        <div>
          <label>
            <input
              type="radio"
              :value="3"
              v-model="selectedFeatures.laundry"
              class="mr-2"
              name="laundry"
            />
            Laundry (3 Bulan - Rp 600.000)
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              :value="6"
              v-model="selectedFeatures.laundry"
              class="mr-2"
              name="laundry"
            />
            Laundry (6 Bulan - Rp 1.200.000)
          </label>
        </div>

        <!-- Cleaning Service -->
        <div>
          <label>
            <input
              type="radio"
              :value="3"
              v-model="selectedFeatures.cleaning"
              class="mr-2"
              name="cleaning"
            />
            Cleaning Service (3 Bulan - Rp 300.000)
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              :value="6"
              v-model="selectedFeatures.cleaning"
              class="mr-2"
              name="cleaning"
            />
            Cleaning Service (6 Bulan - Rp 600.000)
          </label>
        </div>

        <!-- Catering -->
        <div>
          <label>
            <input
              type="radio"
              :value="3"
              v-model="selectedFeatures.catering"
              class="mr-2"
              name="catering"
            />
            Catering (3 Bulan - Rp 3.000.000)
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              :value="6"
              v-model="selectedFeatures.catering"
              class="mr-2"
              name="catering"
            />
            Catering (6 Bulan - Rp 6.000.000)
          </label>
        </div>
      </div>
    </div>

    <!-- Menampilkan Harga -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Rincian Harga</h2>
      <p><strong>Harga Kamar:</strong> Rp {{ roomCost.toLocaleString() }}</p>
      <p>
        <strong>Harga Laundry:</strong> Rp {{ laundryCost.toLocaleString() }}
      </p>
      <p>
        <strong>Harga Cleaning Service:</strong> Rp
        {{ cleaningCost.toLocaleString() }}
      </p>
      <p>
        <strong>Harga Catering:</strong> Rp {{ cateringCost.toLocaleString() }}
      </p>
      <p><strong>Total Biaya:</strong> Rp {{ totalCost.toLocaleString() }}</p>
    </div>

    <!-- Tombol Navigasi -->
    <div class="flex justify-end">
      <router-link
        :to="{
          path: '/user/sewa/bayar',
          query: {
            period: rentalPeriod,
            laundry: selectedFeatures.laundry,
            cleaning: selectedFeatures.cleaning,
            catering: selectedFeatures.catering,
            total: totalCost,
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
import { ref, computed } from "vue";

export default {
  name: "SewaKamar",
  setup() {
    const rentalPeriod = ref(null);
    const selectedFeatures = ref({
      laundry: null,
      cleaning: null,
      catering: null,
    });

    const prices = {
      room: { 3: 6000000, 6: 12000000 },
      laundry: { 3: 600000, 6: 1200000 },
      cleaning: { 3: 300000, 6: 600000 },
      catering: { 3: 3000000, 6: 6000000 },
    };

    const roomCost = computed(() => {
      return rentalPeriod.value ? prices.room[rentalPeriod.value] : 0;
    });

    const laundryCost = computed(() => {
      return selectedFeatures.value.laundry
        ? prices.laundry[selectedFeatures.value.laundry]
        : 0;
    });

    const cleaningCost = computed(() => {
      return selectedFeatures.value.cleaning
        ? prices.cleaning[selectedFeatures.value.cleaning]
        : 0;
    });

    const cateringCost = computed(() => {
      return selectedFeatures.value.catering
        ? prices.catering[selectedFeatures.value.catering]
        : 0;
    });

    const totalCost = computed(() => {
      return (
        roomCost.value +
        laundryCost.value +
        cleaningCost.value +
        cateringCost.value
      );
    });

    return {
      rentalPeriod,
      selectedFeatures,
      roomCost,
      laundryCost,
      cleaningCost,
      cateringCost,
      totalCost,
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
}
</style>
