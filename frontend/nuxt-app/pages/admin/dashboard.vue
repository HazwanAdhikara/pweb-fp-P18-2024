<template>
  <div class="p-6 bg-[#f8f9fa] min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-[#789DBC]">Dashboard Admin</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Room Occupancy -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Room Occupancy</h2>
        <p><strong>Empty Rooms:</strong> {{ roomOccupancy.empty }}</p>
        <p><strong>Filled Rooms:</strong> {{ roomOccupancy.filled }}</p>
      </div>

      <!-- Navigation to Reports -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Reports</h2>
        <router-link
          to="/admin/laporan/fasilitas"
          class="block text-blue-500 hover:underline mb-2"
        >
          Laporan Fasilitas
        </router-link>
        <router-link
          to="/admin/laporan/penghuni"
          class="block text-blue-500 hover:underline"
        >
          Laporan Penghuni
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "AdminDashboard",
  setup() {
    const roomOccupancy = ref({ empty: 0, filled: 0 });
    const errorMessage = ref(null);

    const fetchRoomOccupancy = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari localStorage

        const response = await fetch("http://localhost:4000/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token di header
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to fetch room occupancy";
          return;
        }

        const data = await response.json();
        roomOccupancy.value = data[0]; // Asumsi data berupa array dengan satu objek
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    onMounted(() => {
      fetchRoomOccupancy();
    });

    return {
      roomOccupancy,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
