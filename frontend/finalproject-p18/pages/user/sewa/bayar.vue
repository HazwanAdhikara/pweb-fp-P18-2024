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
      <p><strong>Periode Sewa:</strong> {{ rentalDetails.period }} bulan</p>
      <p>
        <strong>Total Biaya Seluruhnya:</strong> Rp
        {{ formatCurrency(rentalDetails.total) }}
      </p>
    </div>

    <!-- Status Pembayaran -->
    <div v-if="showPaymentStatus" class="bg-white rounded-lg shadow p-4 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-blue-600">
        Status Pembayaran
      </h2>
      <p><strong>Tanggal Pembayaran:</strong> {{ formattedPaymentDate }}</p>
      <p>
        <strong>Status:</strong> {{ paymentStatus?.status || "Belum Lunas" }}
      </p>
      <p v-if="error" class="text-red-500">{{ error }}</p>

      <div v-if="invoiceUrl" class="mt-4">
        <a
          :href="invoiceUrl"
          target="_blank"
          class="text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded-md mb-4"
        >
          Klik di sini untuk melihat invoice
        </a>
      </div>
    </div>

    <!-- Form Pembayaran -->
    <div
      v-if="!paymentStatus || paymentStatus.status === 'Belum Lunas'"
      class="bg-white rounded-lg shadow p-4"
    >
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
            <option value="BANK_TRANSFER">Transfer Bank</option>
          </select>
        </div>

        <!-- Input Nama Bank -->
        <div v-if="paymentMethod === 'BANK_TRANSFER'" class="mb-4">
          <label class="block text-gray-700 font-medium mb-2">Nama Bank</label>
          <input
            type="text"
            v-model="bankName"
            class="w-full border rounded-lg p-2"
            placeholder="Masukkan nama bank"
            required
          />
        </div>

        <!-- Tombol Submit -->
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded"
          :disabled="!paymentMethod"
        >
          Submit Pembayaran
        </button>
      </form>
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

        if (result.invoice) {
          invoiceUrl.value = `http://localhost:4000/api/downloads/${result.invoice._id}`;
        }
        console.log("Invoice URL:", invoiceUrl.value);

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
