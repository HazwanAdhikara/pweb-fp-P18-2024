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
        Pembayaran
      </h1>

      <!-- Payment Details Card -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">📋</span> Detail Perhitungan
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-blue-50 rounded-xl p-4">
            <p class="text-sm text-gray-600 mb-1">Periode Sewa</p>
            <p class="text-xl font-semibold text-blue-600">
              {{ rentalDetails.period }} bulan
            </p>
          </div>
          <div class="bg-blue-50 rounded-xl p-4">
            <p class="text-sm text-gray-600 mb-1">Total Biaya</p>
            <p class="text-xl font-semibold text-blue-600">
              Rp {{ formatCurrency(rentalDetails.total) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Payment Status Card -->
      <div
        v-if="showPaymentStatus"
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">📊</span> Status Pembayaran
        </h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">Tanggal Pembayaran</span>
            <span class="font-semibold">{{ formattedPaymentDate }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b">
            <span class="text-gray-600">Status</span>
            <span :class="getStatusClass">
              {{ paymentStatus?.status || "Belum Lunas" }}
            </span>
          </div>
        </div>

        <!-- Invoice Download Button -->
        <div v-if="invoiceUrl" class="mt-6">
          <a
            :href="invoiceUrl"
            target="_blank"
            class="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:translate-y-[-2px] transition-all"
          >
            <span class="mr-2">📄</span>
            Lihat Invoice
          </a>
        </div>
      </div>

      <!-- Payment Form -->
      <div
        v-if="!paymentStatus || paymentStatus.status === 'Belum Lunas'"
        class="bg-white rounded-2xl shadow-lg p-6 transform transition hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold mb-6 flex items-center text-gray-800">
          <span class="text-2xl mr-2">💳</span> Form Pembayaran
        </h2>
        <form @submit.prevent="submitPayment" class="space-y-6">
          <!-- Payment Method Selection -->
          <div class="space-y-2">
            <label class="block text-gray-700 font-medium"
              >Metode Pembayaran</label
            >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                class="payment-method-card"
                :class="{ selected: paymentMethod === 'QRIS' }"
              >
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="QRIS"
                  class="hidden"
                />
                <div
                  class="p-4 border-2 rounded-xl cursor-pointer transition-all"
                >
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">📱</span>
                    <span class="font-medium">QRIS</span>
                  </div>
                </div>
              </label>

              <label
                class="payment-method-card"
                :class="{ selected: paymentMethod === 'BANK_TRANSFER' }"
              >
                <input
                  type="radio"
                  v-model="paymentMethod"
                  value="BANK_TRANSFER"
                  class="hidden"
                />
                <div
                  class="p-4 border-2 rounded-xl cursor-pointer transition-all"
                >
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">🏦</span>
                    <span class="font-medium">Transfer Bank</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Bank Name Input -->
          <div
            v-if="paymentMethod === 'BANK_TRANSFER'"
            class="transition-all duration-300 ease-in-out"
          >
            <label class="block text-gray-700 font-medium mb-2"
              >Nama Bank</label
            >
            <input
              type="text"
              v-model="bankName"
              class="w-full border-2 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama bank"
              required
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transform hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!paymentMethod"
          >
            Submit Pembayaran
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UserPayment",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const paymentMethod = ref("");
    const bankName = ref("");
    const paymentStatus = ref(null);
    const invoiceUrl = ref(null);
    const isLoading = ref(true);
    const isDownloading = ref(false);
    const downloadError = ref(null);

    // State untuk menyimpan detail sewa
    const rentalDetails = ref({
      period: 0,
      total: 0,
    });

    // Computed properties untuk formatting
    const showPaymentStatus = computed(() => !isLoading.value);

    const formattedPaymentDate = computed(() => {
      if (!paymentStatus.value?.created_at) return "-";
      try {
        return new Date(paymentStatus.value.created_at).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }
        );
      } catch {
        return "-";
      }
    });

    const formattedBill = computed(() => {
      if (!paymentStatus.value?.bill) return "Rp -";
      return `Rp ${formatCurrency(paymentStatus.value.bill)}`;
    });

    // Format currency
    const formatCurrency = (value) => {
      if (!value) return "0";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Mengambil data pembayaran saat komponen dimount
    onMounted(async () => {
      try {
        const queryParams = route.query;
        console.log("Query params:", queryParams);

        // Check if we have query params
        if (!queryParams.period || !queryParams.total) {
          console.log("No query params, redirecting to rental page");
          alert(
            "Anda Belum Melakukan Sewa. Silakan Sewa Kamar Terlebih Dahulu."
          );
          router.push("/user/sewa");
          return;
        }

        // Set rental details dari query params
        rentalDetails.value = {
          period: parseInt(queryParams.period) || 0,
          total: parseInt(queryParams.total) || 0,
        };

        // Validate the values
        if (rentalDetails.value.period <= 0 || rentalDetails.value.total <= 0) {
          console.error("Invalid rental details:", rentalDetails.value);
          throw new Error("Data sewa tidak valid");
        }

        console.log("Rental details:", rentalDetails.value);

        // Ambil status pembayaran terkini
        await fetchPaymentStatus();
      } catch (error) {
        console.error("Error initializing payment page:", error);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
        router.push("/user/sewa");
      } finally {
        isLoading.value = false;
      }
    });

    const fetchPaymentStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan");

        const response = await fetch("http://localhost:4000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Gagal mengambil status pembayaran");

        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          paymentStatus.value = {
            ...data,
            status: data.bill ? "Lunas" : "Belum Lunas",
          };
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        paymentStatus.value = {
          status: "Belum Lunas",
          bill: null,
          created_at: null,
        };
      }
    };

    const submitPayment = async () => {
      if (isLoading.value) return; // Prevent double submission
      isLoading.value = true;

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        // Validate bank name for bank transfer
        if (paymentMethod.value === "BANK_TRANSFER" && !bankName.value) {
          throw new Error(
            "Nama bank harus diisi untuk pembayaran transfer bank"
          );
        }

        const paymentData = {
          total_bill: rentalDetails.value.total,
          payment_method: paymentMethod.value,
          rent_periods: rentalDetails.value.period,
          bank_name:
            paymentMethod.value === "BANK_TRANSFER" ? bankName.value : "null",
        };

        console.log("Sending payment data:", paymentData);

        const response = await fetch("http://localhost:4000/user/sewa/bayar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Pembayaran gagal");
        }

        // Update payment status immediately after successful payment
        paymentStatus.value = {
          status: "Lunas",
          bill: rentalDetails.value.total,
          created_at: new Date().toISOString(),
        };

        if (result.invoice && result.invoice._id) {
          // Simpan ID dalam state
          const invoiceId = result.invoice._id.toString();
          invoiceUrl.value = `http://localhost:4000/api/downloads/${invoiceId}`;
          console.log("Invoice URL:", invoiceUrl.value);
        }

        alert("Pembayaran berhasil!");
      } catch (error) {
        console.error("Error submitting payment:", error);

        alert(`Pembayaran gagal: ${error.message}`);
      } finally {
        isLoading.value = false;
      }
    };

    const downloadInvoice = async () => {
      if (!invoiceUrl.value || isDownloading.value) return;

      const invoiceId = invoiceUrl.value.split("/").pop();
      if (!validatePaymentId(invoiceId)) {
        alert("Invalid invoice ID format");
        return;
      }
      isDownloading.value = true;
      downloadError.value = null;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(invoiceUrl.value, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response:", errorText);
          throw new Error(
            `Gagal mengunduh invoice: ${response.status} - ${errorText}`
          );
        }

        const blob = await response.blob();
        if (blob.size === 0) {
          throw new Error("File PDF kosong atau terdapat error pada server");
        }

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `invoice-${new Date().toISOString()}.pdf`;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }, 1000);
      } catch (error) {
        console.error("Download error:", error);
        downloadError.value = error.message;
        alert(`Gagal mengunduh invoice: ${error.message}`);
      } finally {
        isDownloading.value = false;
      }
    };

    const isValidAccess = computed(() => {
      return rentalDetails.value.period > 0 && rentalDetails.value.total > 0;
    });

    return {
      paymentMethod,
      rentalDetails,
      paymentStatus,
      invoiceUrl,
      showPaymentStatus,
      formattedPaymentDate,
      formattedBill,
      submitPayment,
      downloadInvoice,
      formatCurrency,
      bankName,
      isDownloading,
      downloadError,
      isValidAccess,
    };
  },
};
</script>

<style scoped>
/* Styling untuk membuat link seperti tombol */
.btn-green {
  background-color: #38a169; /* Hijau */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  text-align: center;
}

.btn-green:hover {
  background-color: #2f855a; /* Hijau lebih gelap saat hover */
}
</style>
