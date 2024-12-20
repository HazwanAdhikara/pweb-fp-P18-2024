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
        <strong>Total Biaya:</strong> Rp
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
      <p><strong>Total:</strong> {{ formattedBill }}</p>

      <!-- Tombol Download Invoice -->
      <button
        v-if="paymentStatus?.status === 'Lunas' && invoiceUrl"
        @click="downloadInvoice"
        class="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Download Invoice PDF
      </button>
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
            <option value="Transfer">Transfer</option>
          </select>
        </div>

        <!-- Tombol Submit -->
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition w-full"
          :disabled="!paymentMethod"
        >
          Bayar
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
    const paymentStatus = ref(null);
    const invoiceUrl = ref(null);
    const isLoading = ref(true);

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

        // Validasi query params
        if (!queryParams.period || !queryParams.total) {
          throw new Error("Data sewa tidak lengkap");
        }

        // Set rental details dari query params
        rentalDetails.value = {
          period: parseInt(queryParams.period) || 0,
          total: parseInt(queryParams.total) || 0,
        };

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

    // Mengambil status pembayaran
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

    // Handle submit pembayaran
    const submitPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login kembali.");
        }

        const paymentData = {
          total_bill: rentalDetails.value.total,
          payment_method: paymentMethod.value,
          rent_periods: rentalDetails.value.period,
        };

        const response = await fetch("http://localhost:4000/user/sewa/bayar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Pembayaran gagal");
        }

        const result = await response.json();

        if (result.invoice) {
          invoiceUrl.value = `http://localhost:4000/downloads/${result.invoice}`;
        }

        await fetchPaymentStatus();
        alert("Pembayaran berhasil!");
      } catch (error) {
        console.error("Error submitting payment:", error);
        alert(`Pembayaran gagal: ${error.message}`);
      }
    };

    // Handle download invoice
    const downloadInvoice = async () => {
      if (!invoiceUrl.value) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(invoiceUrl.value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Gagal mengunduh invoice");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${new Date().getTime()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error downloading invoice:", error);
        alert("Gagal mengunduh invoice. Silakan coba lagi.");
      }
    };

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
    };
  },
};
</script>
