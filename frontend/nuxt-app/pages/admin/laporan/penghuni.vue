<template>
  <div class="p-6 bg-[#f8f9fa] min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-[#789DBC]">Laporan Penghuni</h1>

    <div v-if="errorMessage" class="text-red-500 mb-4">
      {{ errorMessage }}
    </div>

    <div v-if="reports.length === 0" class="text-gray-500">Tidak ada laporan penghuni</div>
    <div v-else class="grid gap-4">
      <div
        v-for="report in reports"
        :key="report._id"
        class="p-4 bg-white rounded-lg shadow"
      >
        <p><strong>Message:</strong> {{ report.message }}</p>
        <p><strong>Submitted At:</strong> {{ new Date(report.createdAt).toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "LaporanPenghuni",
  setup() {
    const reports = ref([]);
    const errorMessage = ref(null);

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:4000/admin/laporan/penghuni", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to fetch reports";
          return;
        }

        reports.value = await response.json();
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    onMounted(() => {
      fetchReports();
    });

    return {
      reports,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
