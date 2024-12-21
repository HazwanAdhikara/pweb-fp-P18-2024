<template>
    <div class="p-6 bg-[#f8f9fa] min-h-screen">
      <h1 class="text-3xl font-bold mb-6 text-[#789DBC]">User Details</h1>
  
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div v-if="!user" class="text-gray-500">Loading...</div>
      <div v-else>
        <!-- User Info -->
        <div class="mb-6">
          <img
            :src="`/images/${user.username}.jpg`"
            alt="User Photo"
            class="w-32 h-32 object-cover rounded-full mb-4"
          />
          <p><strong>Username:</strong> {{ user.username }}</p>
        </div>
  
        <!-- Invoice History -->
        <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Invoice History</h2>
        <div class="p-4 bg-white rounded-lg shadow">
          <p><strong>Bill:</strong> Rp {{ invoiceHistory.bill.toLocaleString() }}</p>
          <p><strong>Payment Date:</strong> {{ formatDate(invoiceHistory.created_at) }}</p>
        </div>
  
        <!-- Remove User Button -->
        <button
          @click="removeUser"
          class="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Remove User
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  export default {
    name: "UserDetails",
    setup() {
      const route = useRoute();
      const router = useRouter();
      const user = ref(null);
      const invoiceHistory = ref({});
      const errorMessage = ref(null);
  
      const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem("token");
  
          const response = await fetch(
            `http://localhost:4000/admin/penghuni/${route.params.id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (!response.ok) {
            const errorData = await response.json();
            errorMessage.value = errorData.message || "Failed to fetch user details";
            return;
          }
  
          const data = await response.json();
          user.value = data.user;
          invoiceHistory.value = data.invoice_history;
        } catch (error) {
          errorMessage.value = "An error occurred. Please try again.";
        }
      };
  
      const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };
  
      const removeUser = async () => {
        if (!confirm("Are you sure you want to remove this user?")) return;
  
        try {
          const token = localStorage.getItem("token");
  
          const response = await fetch(
            `http://localhost:4000/admin/penghuni/${route.params.id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (!response.ok) {
            const errorData = await response.json();
            errorMessage.value = errorData.message || "Failed to remove user";
            return;
          }
  
          alert("User removed successfully");
          router.push("/admin/dashboard");
        } catch (error) {
          errorMessage.value = "An error occurred. Please try again.";
        }
      };
  
      onMounted(() => {
        fetchUserDetails();
      });
  
      return {
        user,
        invoiceHistory,
        errorMessage,
        formatDate,
        removeUser,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling jika diperlukan */
  </style>
  