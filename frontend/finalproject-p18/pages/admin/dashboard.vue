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

    <!-- Room List -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Room List</h2>
      <div v-if="errorMessageRooms" class="text-red-500 mb-4">{{ errorMessageRooms }}</div>
      <div v-if="rooms.length === 0" class="text-gray-500">No rooms available</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <!-- Individual Room Box -->
        <div
          v-for="room in rooms"
          :key="room._id"
          class="p-4 bg-white rounded-lg shadow flex flex-col items-center"
        >
          <p class="text-lg font-semibold">Room {{ room.room_number }}</p>
          <p
            class="text-sm font-medium mt-2"
            :class="room.status === 'EMPTY' ? 'text-green-500' : 'text-red-500'"
          >
            {{ room.status }}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Registered Users -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4 text-[#789DBC]">Registered Users</h2>
      <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
      <div v-if="users.length === 0" class="text-gray-500">No registered users</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
        <!-- Individual User Box -->
        <div
          v-for="user in users"
          :key="user._id"
          class="p-4 bg-white rounded-lg shadow cursor-pointer hover:shadow-lg flex flex-col items-center"
          @click="goToUserDetails(user._id)"
          style="width: 200px; height: 300px;"
        >
          <!-- Bagian Gambar -->
          <div class="flex-grow" style="flex: 7;">
            <img
              :src="`/images/${user.username}.jpg`"
              alt="User Photo"
              class="w-full h-full object-cover rounded-lg"
              style="max-height: 70%;"
            />
          </div>
          <!-- Bagian Teks -->
          <div class="flex-grow text-center mt-2" style="flex: 3;">
            <p class="font-semibold text-lg">{{ user.username }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AdminDashboard",
  setup() {
    const roomOccupancy = ref({ empty: 0, filled: 0 });
    const users = ref([]);
    const rooms = ref([]);
    const errorMessage = ref(null);
    const errorMessageRooms = ref(null);
    const router = useRouter();

    const fetchRoomOccupancy = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:4000/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
        errorMessage.value = "An error occurred while fetching room occupancy.";
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:4000/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to fetch users";
          return;
        }

        users.value = await response.json();
      } catch (error) {
        errorMessage.value = "An error occurred while fetching users.";
      }
    };

    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:4000/admin/rooms", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessageRooms.value = errorData.message || "Failed to fetch rooms";
          return;
        }

        rooms.value = await response.json();
      } catch (error) {
        errorMessageRooms.value = "An error occurred while fetching rooms.";
      }
    };

    const goToUserDetails = (id) => {
      router.push(`/admin/penghuni/${id}`);
    };

    onMounted(() => {
      fetchRoomOccupancy();
      fetchUsers();
      fetchRooms();
    });

    return {
      roomOccupancy,
      users,
      rooms,
      errorMessage,
      errorMessageRooms,
      goToUserDetails,
    };
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>