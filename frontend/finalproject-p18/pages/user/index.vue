<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-blue-600">Dashboard Penghuni</h1>

    <!-- Navigasi ke Halaman Lain -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Layanan</h2>
      <ul class="flex flex-wrap gap-4">
        <li>
          <router-link to="/user/sewa" class="bubble-link">
            Sewa Kamar
          </router-link>
        </li>
        <li>
          <router-link to="/user/sewa/bayar" class="bubble-link">
            Pembayaran
          </router-link>
        </li>
        <li>
          <router-link to="/user/laporan/fasilitas" class="bubble-link">
            Laporan Fasilitas
          </router-link>
        </li>
        <li>
          <router-link to="/user/laporan/penghuni" class="bubble-link">
            Laporan Penghuni
          </router-link>
        </li>
      </ul>
    </div>

    <!-- History Tagihan -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">History Tagihan</h2>
      <ul>
        <li
          v-for="(bill, index) in billingHistory"
          :key="index"
          class="mb-4 border-b pb-4"
        >
          <p><strong>Tanggal Pembayaran:</strong> {{ bill.date }}</p>
          <p><strong>Total:</strong> Rp {{ bill.total }}</p>
          <p><strong>Status:</strong> {{ bill.status }}</p>
        </li>
      </ul>
      <p v-if="billingHistory.length === 0" class="text-gray-500">
        Belum ada history tagihan.
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "UserDashboard",
  setup() {
    const billingHistory = ref([]);
    const errorMessage = ref("");

    const fetchBillingHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:4000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Transformasi data agar sesuai dengan template
        billingHistory.value = data.map((item) => ({
          total: item.bill,
          date: new Date(item.created_at).toLocaleDateString("id-ID"),
          status: item.status, // Sesuaikan logika status
        }));
      } catch (error) {
        errorMessage.value = "Gagal mengambil data tagihan. Silakan coba lagi.";
        console.error("Error fetching billing history:", error);
      }
    };

    onMounted(fetchBillingHistory);

    return { billingHistory, errorMessage };
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.bubble-link {
  display: inline-block;
  padding: 12px 20px;
  background-color: #e0f7fa;
  color: #00796b;
  border-radius: 999px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
}

.bubble-link:hover {
  background-color: blueviolet;
  color: #ffffff;
  transform: scale(1.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
