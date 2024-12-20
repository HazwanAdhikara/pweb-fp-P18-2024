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

    <h1 class="text-3xl font-bold mb-6 text-blue-600">Laporan Penghuni</h1>

    <!-- Form Laporan Penghuni -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">Form Laporan</h2>
      <form @submit.prevent="submitReport">
        <div class="mb-4">
          <label for="message" class="block text-gray-700 font-medium mb-2"
            >Pesan Laporan:</label
          >
          <textarea
            id="message"
            v-model="message"
            rows="4"
            class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
            placeholder="Tuliskan laporan Anda di sini..."
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

    <!-- Pesan Konfirmasi -->
    <p v-if="successMessage" class="mt-4 text-green-600">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "UserReport",
  setup() {
    const message = ref("");
    const successMessage = ref("");
    const errorMessage = ref("");
    const token = localStorage.getItem("token");
    const submitReport = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/laporan/penghuni",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message: message.value }),
          }
        );
        console.log(response);
        console.log("Token:", token);

        if (response.ok) {
          const data = await response.json();
          successMessage.value = "Laporan berhasil dikirim.";
          errorMessage.value = "";
          message.value = ""; // Reset form
        } else {
          throw new Error("Gagal mengirim laporan.");
        }
      } catch (error) {
        successMessage.value = "";
        errorMessage.value = error.message;
      }
    };

    return {
      message,
      successMessage,
      errorMessage,
      submitReport,
    };
  },
};
</script>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>
