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
    <h1 class="text-3xl font-bold mb-6 text-blue-600">
      Laporan Kerusakan Fasilitas
    </h1>

    <!-- Form Pelaporan Kerusakan -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">
        Form Laporan Kerusakan
      </h2>

      <form @submit.prevent="submitReport">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700"
            >Pesan Laporan</label
          >
          <textarea
            id="message"
            v-model="message"
            class="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Kirim Laporan
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DamageReport",
  setup() {
    const username = ref("");
    const message = ref("");

    const submitReport = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:4000/user/laporan/fasilitas",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Pastikan mengirimkan token autentikasi
            },
            body: JSON.stringify({
              username: username.value,
              message: message.value,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          alert("Laporan berhasil dikirim: " + data.message);
          // Reset form setelah pengiriman
          username.value = "";
          message.value = "";
        } else {
          const errorData = await response.json();
          alert("Error: " + errorData.message);
        }
      } catch (error) {
        console.error("Gagal mengirim laporan", error);
        alert("Terjadi kesalahan, coba lagi nanti.");
      }
    };

    return { username, message, submitReport };
  },
};
</script>

<style scoped>
/* Styling tambahan untuk tampilan form */
</style>
