<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8">
        <h1
          class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Dashboard Penghuni
        </h1>
        <div class="flex items-center space-x-4">
          <span class="px-4 py-2 bg-white rounded-full shadow-sm text-gray-600">
            <span class="mr-2">👋</span> Selamat Datang
          </span>
        </div>
      </div>

      <!-- Services Grid -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-8 backdrop-blur-sm bg-white/90"
      >
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
          <span class="mr-2">🎯</span> Layanan
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            to="/user/sewa"
            class="service-card bg-gradient-to-br from-blue-500 to-blue-600"
          >
            <span class="text-3xl mb-2">🏠</span>
            <span class="font-semibold">Sewa Kamar</span>
          </router-link>

          <router-link
            to="/user/sewa/bayar"
            class="service-card bg-gradient-to-br from-purple-500 to-purple-600"
          >
            <span class="text-3xl mb-2">💳</span>
            <span class="font-semibold">Pembayaran</span>
          </router-link>

          <router-link
            to="/user/laporan/fasilitas"
            class="service-card bg-gradient-to-br from-green-500 to-green-600"
          >
            <span class="text-3xl mb-2">🔧</span>
            <span class="font-semibold">Laporan Fasilitas</span>
          </router-link>

          <router-link
            to="/user/laporan/penghuni"
            class="service-card bg-gradient-to-br from-orange-500 to-orange-600"
          >
            <span class="text-3xl mb-2">📝</span>
            <span class="font-semibold">Laporan Penghuni</span>
          </router-link>
        </div>
      </div>

      <!-- Billing History -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm bg-white/90"
      >
        <h2 class="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
          <span class="mr-2">📊</span> History Tagihan
        </h2>
        <div class="divide-y divide-gray-100">
          <div
            v-if="billingHistory.length === 0"
            class="text-gray-500 text-center py-8"
          >
            Belum ada history tagihan.
          </div>
          <div
            v-for="(bill, index) in billingHistory"
            :key="index"
            class="py-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-gray-600">Tanggal Pembayaran</p>
                <p class="font-semibold">{{ bill.date }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Total</p>
                <p class="font-semibold">Rp {{ bill.total }}</p>
              </div>
              <div>
                <span
                  :class="getStatusClass(bill.status)"
                  class="px-4 py-1 rounded-full text-sm font-medium"
                >
                  {{ bill.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
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

    const getStatusClass = (status) => {
      const classes = {
        Lunas: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Telat: "bg-red-100 text-red-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

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
        billingHistory.value = data.map((item) => ({
          total: new Intl.NumberFormat("id-ID").format(item.bill),
          date: new Date(item.created_at).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          status: item.status,
        }));
      } catch (error) {
        errorMessage.value = "Gagal mengambil data tagihan. Silakan coba lagi.";
        console.error("Error fetching billing history:", error);
      }
    };

    onMounted(fetchBillingHistory);

    return { billingHistory, errorMessage, getStatusClass };
  },
};
</script>

<style scoped>
.service-card {
  @apply flex flex-col items-center justify-center p-6 rounded-xl text-white
         transform transition-all duration-300 hover:scale-105 hover:shadow-lg
         cursor-pointer;
}

/* Add some animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card {
  animation: fadeIn 0.5s ease-out forwards;
}

.service-card:nth-child(1) {
  animation-delay: 0.1s;
}
.service-card:nth-child(2) {
  animation-delay: 0.2s;
}
.service-card:nth-child(3) {
  animation-delay: 0.3s;
}
.service-card:nth-child(4) {
  animation-delay: 0.4s;
}
</style>
