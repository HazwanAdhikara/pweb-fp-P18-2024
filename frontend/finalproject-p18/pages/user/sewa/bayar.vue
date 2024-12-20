<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-blue-600">Pembayaran</h1>

    <!-- Detail Perhitungan -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">
        Detail Perhitungan
      </h2>
      <p><strong>Periode Sewa:</strong> {{ period }} bulan</p>
      <p><strong>Harga Sewa:</strong> Rp {{ rentalCost }}</p>
      <p>
        <strong>Fitur Tambahan:</strong>
        {{ selectedFeatures.join(", ") || "Tidak ada" }}
      </p>
      <p><strong>Biaya Fitur Tambahan:</strong> Rp {{ additionalCost }}</p>
      <p class="text-lg font-bold mt-4">Total: Rp {{ totalCost }}</p>
    </div>

    <!-- Form Pembayaran -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Form Pembayaran</h2>
      <form @submit.prevent="submitPayment">
        <!-- Pilihan Metode Pembayaran -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">
            Metode Pembayaran
          </label>
          <select v-model="paymentMethod" class="w-full border rounded-lg p-2">
            <option value="" disabled>Pilih Metode Pembayaran</option>
            <option value="QRIS">QRIS</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>

        <!-- Nama Bank (jika Transfer) -->
        <div v-if="paymentMethod === 'Transfer'" class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">
            Nama Bank
          </label>
          <input
            type="text"
            v-model="bankName"
            class="w-full border rounded-lg p-2"
            placeholder="Masukkan Nama Bank"
          />
        </div>

        <!-- Tombol Submit -->
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Bayar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Pembayaran",
  setup() {
    const route = useRoute();

    // Data dari query string
    const period = route.query.period || 0;
    const selectedFeatures = route.query.features
      ? route.query.features.split(",")
      : [];

    // Perhitungan biaya
    const rentalCost = computed(() => period * 500000); // Rp 500.000 per bulan
    const additionalCost = computed(() => selectedFeatures.length * 100000); // Rp 100.000 per fitur tambahan
    const totalCost = computed(() => rentalCost.value + additionalCost.value);

    // Data form pembayaran
    const paymentMethod = ref("");
    const bankName = ref("");

    // Fungsi submit pembayaran
    const submitPayment = () => {
      if (!paymentMethod.value) {
        alert("Silakan pilih metode pembayaran.");
        return;
      }

      const paymentData = {
        period,
        rentalCost: rentalCost.value,
        additionalCost: additionalCost.value,
        totalCost: totalCost.value,
        paymentMethod: paymentMethod.value,
        bankName: paymentMethod.value === "Transfer" ? bankName.value : null,
      };

      // Simulasi pengiriman data
      console.log("Data pembayaran:", paymentData);
      alert("Pembayaran berhasil! Invoice akan di-generate.");
    };

    return {
      period,
      selectedFeatures,
      rentalCost,
      additionalCost,
      totalCost,
      paymentMethod,
      bankName,
      submitPayment,
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
