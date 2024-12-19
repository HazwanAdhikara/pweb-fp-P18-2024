<template>
  <div
    class="flex items-center justify-center h-screen bg-[#C9E9D2] bg-opacity-30"
  >
    <div class="w-full max-w-md bg-[#FEF9F2] shadow-md rounded-3xl p-12">
      <h1 class="text-4xl font-extrabold text-center mb-6 text-[#789DBC]">
        Login
      </h1>
      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="mb-4 text-red-400 text-sm">
          {{ errorMessage }}
        </div>
        <div class="mb-4">
          <label for="username" class="block text-sm font-bold text-[#789DBC]">
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#789DBC] focus:border-[#789DBC]"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-bold text-[#789DBC]">
            Password
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#789DBC] focus:border-[#789DBC] pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              <img
                v-if="showPassword"
                src="../public/showpassword.svg"
                alt="Show Password"
                class="w-6 h-5"
              />
              <img
                v-else
                src="../public/hidepassword.svg"
                alt="Hide Password"
                class="w-6 h-5"
              />
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label for="role" class="block text-sm font-bold text-[#789DBC]">
            Role
          </label>
          <input
            type="role"
            id="role"
            v-model="role"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#789DBC] focus:border-[#789DBC]"
            placeholder="USER or ADMIN"
            required
          />
        </div>
        <div class="flex flex-col">
          <button
            type="submit"
            class="w-full font-semibold py-2 px-4 bg-[#789DBC] text-[#FEF9F2] rounded-md hover:bg-[#789DBC]/90 focus:outline-none focus:ring-2 focus:ring-[#789DBC]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "../stores/store";

export default {
  name: "LoginPage",
  setup() {
    const username = ref("");
    const password = ref("");
    const role = ref("");
    const errorMessage = ref(null);
    const showPassword = ref(false);
    const userStore = useUserStore();

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:4000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value,
            role: role.value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          errorMessage.value = errorData.message || "Failed to login";
          return;
        }

        const data = await response.json();
        userStore.setUser(username.value, role.value);
        alert("Login successful!");
        window.location.href = "/facility";
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    return {
      username,
      password,
      role,
      errorMessage,
      showPassword,
      togglePasswordVisibility,
      handleSubmit,
    };
  },
};
</script>
