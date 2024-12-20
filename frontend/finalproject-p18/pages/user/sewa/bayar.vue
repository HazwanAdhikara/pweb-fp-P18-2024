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
    <h1 class="text-3xl font-bold mb-6 text-blue-600">Pembayaran</h1>

    <!-- Detail Pembayaran -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">
        Detail Perhitungan
      </h2>
      <p><strong>Periode Sewa:</strong> {{ period }} bulan</p>
      <p><strong>Harga Sewa:</strong> Rp {{ rentalCost.toLocaleString() }}</p>
      <p>
        <strong>Fitur Tambahan:</strong>
        {{ selectedFeatures.join(", ") || "Tidak ada" }}
      </p>
      <p>
        <strong>Biaya Fitur Tambahan:</strong> Rp
        {{ additionalCost.toLocaleString() }}
      </p>
      <p class="text-lg font-bold mt-4">
        Total: Rp {{ totalCost.toLocaleString() }}
      </p>
    </div>

    <!-- Form Pembayaran -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Form Pembayaran</h2>
      <form @submit.prevent="submitPayment">
        <!-- Pilihan Metode Pembayaran -->
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2"
            >Metode Pembayaran</label
          >
          <select
            v-model="paymentMethod"
            class="w-full border rounded-lg p-2"
            required
          >
            <option value="" disabled>Pilih Metode Pembayaran</option>
            <option value="QRIS">QRIS</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>

        <!-- Nama Bank (jika Transfer) -->
        <div v-if="paymentMethod === 'Transfer'" class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Nama Bank</label>
          <input
            type="text"
            v-model="bankName"
            class="w-full border rounded-lg p-2"
            placeholder="Masukkan Nama Bank"
            required
          />
        </div>

        <!-- Tombol Submit -->
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full"
          :disabled="
            !paymentMethod || (paymentMethod === 'Transfer' && !bankName)
          "
        >
          Bayar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "UserPayment",
  setup() {
    const paymentMethod = ref("");
    const bankName = ref("");
    const period = ref(6); // Contoh periode sewa
    const rentalCost = ref(10000000); // Contoh biaya sewa
    const additionalCost = ref(300000); // Contoh biaya tambahan
    const selectedFeatures = ref([]); // Fitur tambahan yang dipilih oleh pengguna

    // Menghitung total biaya sewa
    const totalCost = computed(() => rentalCost.value + additionalCost.value);

    // Menangani pengiriman data pembayaran
    const submitPayment = async () => {
      const token = localStorage.getItem("token");

      // Data yang akan dikirimkan ke server
      const paymentData = {
        method: paymentMethod.value,
        bank: bankName.value,
        total: totalCost.value,
        status: "Lunas", // Status Lunas setelah pembayaran berhasil
      };

      try {
        const response = await fetch("http://localhost:4000/user/sewa/bayar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Pembayaran berhasil, bisa update riwayat tagihan
        alert("Pembayaran berhasil!");
      } catch (error) {
        console.error("Error submitting payment:", error);
        alert("Pembayaran gagal. Silakan coba lagi.");
      }
    };

    return {
      paymentMethod,
      bankName,
      period,
      rentalCost,
      additionalCost,
      selectedFeatures,
      totalCost,
      submitPayment,
    };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

button:hover:enabled {
  transform: scale(1.05);
}
</style>
