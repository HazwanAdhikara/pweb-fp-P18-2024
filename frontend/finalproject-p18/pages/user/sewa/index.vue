<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Back Button -->
      <RouterLink
        to="/user"
        class="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-all transform hover:translate-x-[-4px]"
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

      <!-- Header -->
      <h1
        class="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        Sewa Kamar
      </h1>

      <!-- Room Specifications -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">🏠</span> Spesifikasi Kamar
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center p-4 bg-blue-50 rounded-xl">
            <span class="text-2xl mr-3">📏</span>
            <div>
              <p class="text-sm text-gray-600">Luas Kamar</p>
              <p class="font-semibold">4 x 5 meter</p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-blue-50 rounded-xl">
            <span class="text-2xl mr-3">✨</span>
            <div>
              <p class="text-sm text-gray-600">Fasilitas</p>
              <p class="font-semibold">TV, Meja & Kursi Belajar, Queen Bed</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rental Period -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">📅</span> Periode Sewa
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <label
            class="period-option"
            :class="{ selected: rentalPeriod === 3 }"
          >
            <input
              type="radio"
              :value="3"
              v-model="rentalPeriod"
              class="hidden"
            />
            <div class="p-4 rounded-xl border-2 cursor-pointer transition-all">
              <span class="text-xl mb-2 block">3 Bulan</span>
              <span class="text-blue-600 font-semibold">Rp 6.000.000</span>
            </div>
          </label>
          <label
            class="period-option"
            :class="{ selected: rentalPeriod === 6 }"
          >
            <input
              type="radio"
              :value="6"
              v-model="rentalPeriod"
              class="hidden"
            />
            <div class="p-4 rounded-xl border-2 cursor-pointer transition-all">
              <span class="text-xl mb-2 block">6 Bulan</span>
              <span class="text-blue-600 font-semibold">Rp 12.000.000</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Additional Features -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">🎁</span> Fitur Tambahan
        </h2>

        <!-- Laundry -->
        <div class="feature-section mb-6">
          <h3 class="text-lg font-semibold mb-3 text-gray-700">
            🧺 Laundry Service
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              class="feature-option"
              :class="{ selected: selectedFeatures.laundry === 3 }"
            >
              <input
                type="radio"
                :value="3"
                v-model="selectedFeatures.laundry"
                class="hidden"
                name="laundry"
              />
              <div
                class="p-4 rounded-xl border-2 cursor-pointer transition-all"
              >
                <span class="block mb-2">3 Bulan</span>
                <span class="text-blue-600 font-semibold">Rp 600.000</span>
              </div>
            </label>
            <label
              class="feature-option"
              :class="{ selected: selectedFeatures.laundry === 6 }"
            >
              <input
                type="radio"
                :value="6"
                v-model="selectedFeatures.laundry"
                class="hidden"
                name="laundry"
              />
              <div
                class="p-4 rounded-xl border-2 cursor-pointer transition-all"
              >
                <span class="block mb-2">6 Bulan</span>
                <span class="text-blue-600 font-semibold">Rp 1.200.000</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Similar sections for Cleaning and Catering -->
        <div class="feature-section mb-6">
          <h3 class="text-lg font-semibold mb-3 text-gray-700">
            🧹 Cleaning Service
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              class="feature-option"
              :class="{ selected: selectedFeatures.cleaning === 3 }"
            >
              <input
                type="radio"
                :value="3"
                v-model="selectedFeatures.cleaning"
                class="hidden"
                name="cleaning"
              />
              <div
                class="p-4 rounded-xl border-2 cursor-pointer transition-all"
              >
                <span class="block mb-2">3 Bulan</span>
                <span class="text-blue-600 font-semibold">Rp 300.000</span>
              </div>
            </label>
            <label
              class="feature-option"
              :class="{ selected: selectedFeatures.cleaning === 6 }"
            >
              <input
                type="radio"
                :value="6"
                v-model="selectedFeatures.cleaning"
                class="hidden"
                name="cleaning"
              />
              <div
                class="p-4 rounded-xl border-2 cursor-pointer transition-all"
              >
                <span class="block mb-2">6 Bulan</span>
                <span class="text-blue-600 font-semibold">Rp 600.000</span>
              </div>
            </label>
          </div>
        </div>

        <div class="feature-section">
          <h3 class="text-lg font-semibold mb-3 text-gray-700">
            🍽️ Catering Service
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              class="feature-option"
              :class="{ selected: selectedFeatures.catering === 3 }"
            >
              <input
                type="radio"
                :value="3"
                v-model="selectedFeatures.catering"
                class="hidden"
                name="catering"
              />
              <div
                class="p-4 rounded-xl border-2 cursor-pointer transition-all"
              >
                <span class="block mb-2">3 Bulan</span>
                <span class="text-blue-600 font-semibold">Rp 3.000.000</span>
              </div>
            </label>
            <label
              class="feature-option"
              :class="{ selected: selectedFeatures.catering === 6 }"
            >
              <input
                type="radio"
                :value="6"
                v-model="selectedFeatures.catering"
                class="hidden"
                name="catering"
              />
              <div
                class="p-4 rounded-xl border-2 cursor-pointer transition-all"
              >
                <span class="block mb-2">6 Bulan</span>
                <span class="text-blue-600 font-semibold">Rp 6.000.000</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Price Summary -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">💰</span> Rincian Harga
        </h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">Harga Kamar</span>
            <span class="font-semibold"
              >Rp {{ roomCost.toLocaleString() }}</span
            >
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">Laundry Service</span>
            <span class="font-semibold"
              >Rp {{ laundryCost.toLocaleString() }}</span
            >
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">Cleaning Service</span>
            <span class="font-semibold"
              >Rp {{ cleaningCost.toLocaleString() }}</span
            >
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">Catering Service</span>
            <span class="font-semibold"
              >Rp {{ cateringCost.toLocaleString() }}</span
            >
          </div>
          <div class="flex justify-between items-center py-4 text-lg font-bold">
            <span>Total</span>
            <span class="text-blue-600"
              >Rp {{ totalCost.toLocaleString() }}</span
            >
          </div>
        </div>
      </div>

      <!-- Navigation Button -->
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
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl hover:shadow-lg transform hover:translate-y-[-2px] transition-all font-semibold"
        >
          Lanjutkan ke Pembayaran →
        </router-link>
      </div>
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
.period-option .selected,
.feature-option .selected {
  @apply border-blue-600 bg-blue-50;
}

.period-option:hover div,
.feature-option:hover div {
  @apply border-blue-400 bg-blue-50;
}

/* Smooth transitions */
.feature-section {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-section:nth-child(1) {
  animation-delay: 0.1s;
}
.feature-section:nth-child(2) {
  animation-delay: 0.2s;
}
.feature-section:nth-child(3) {
  animation-delay: 0.3s;
}
</style>
