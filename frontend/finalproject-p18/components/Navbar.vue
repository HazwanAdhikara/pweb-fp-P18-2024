<script>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "../stores/store";

export default {
  setup() {
    const isDropdownOpen = ref(false);
    const isMobileMenuOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const userStore = useUserStore();

    // Menggunakan computed untuk mengambil data dari localStorage
    const userName = computed(
      () => localStorage.getItem("username") || "Guest"
    );
    const userRole = computed(() => localStorage.getItem("role") || "GUEST");

    const handleSignOut = () => {
      userStore.clearUser(); // Reset user data
    };

    return {
      userName,
      userRole,
      isDropdownOpen,
      isMobileMenuOpen,
      toggleDropdown,
      toggleMobileMenu,
      handleSignOut,
    };
  },
};
</script>

<template>
  <nav class="bg-[#51829B]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu toggle -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            @click="toggleMobileMenu"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#80BCBD] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-if="!isMobileMenuOpen"
              class="block size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              v-else
              class="block size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Main navigation -->
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a class="text-gray-200 font-bold text-xl px-3 py-1.5"> P18 </a>
              <a
                href="/"
                class="rounded-md px-3 py-2 text-md font-medium"
                :class="{
                  'text-[white] hover:bg-[#80BCBD]': $route.path === '/',
                  'text-gray-300 hover:bg-[#80BCBD] hover:text-white':
                    $route.path !== '/',
                }"
                aria-current="$route.path === '/' ? 'page' : null"
              >
                Home
              </a>
              <a
                href="/facility"
                class="rounded-md px-3 py-2 text-md font-medium"
                :class="{
                  'text-white hover:bg-[#80BCBD]': $route.path === '/facility',
                  'text-gray-300 hover:bg-[#80BCBD] hover:text-white':
                    $route.path !== '/facility',
                }"
                aria-current="$route.path === '/facility' ? 'page' : null"
              >
                Facility
              </a>
              <a
                href="/rules"
                class="rounded-md px-3 py-2 text-md font-medium"
                :class="{
                  'text-white hover:bg-[#80BCBD]': $route.path === '/rules',
                  'text-gray-300 hover:bg-[#80BCBD] hover:text-white':
                    $route.path !== '/rules',
                }"
                aria-current="$route.path === '/rules' ? 'page' : null"
              >
                Rules
              </a>
            </div>
          </div>
        </div>

        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div class="flex items-center">
            <p class="text-white mx-5">
              {{ userName }} as {{ userRole.toUpperCase() }}
            </p>
            <button
              type="button"
              @click="toggleDropdown"
              class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="size-8 rounded-full"
                src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                alt=""
              />
            </button>
          </div>
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
            role="menu"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700"
              >Your Profile</a
            >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700"
              >Settings</a
            >
            <a
              href="/"
              class="block px-4 py-2 text-sm text-gray-700"
              @click="handleSignOut"
              aria-current="$route.path === '/' ? 'page' : null"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="/"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="{
            'bg-[#82A0D8] bg-opacity-40 text-white': $route.path === '/',
            'text-gray-300 hover:bg-[#80BCBD] hover:text-white':
              $route.path !== '/',
          }"
          aria-current="$route.path === '/' ? 'page' : null"
        >
          Home
        </a>
        <a
          href="/facility"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="{
            'bg-[#82A0D8] bg-opacity-20 text-white':
              $route.path === '/facility',
            'text-gray-300 hover:bg-[#80BCBD] hover:text-white':
              $route.path !== '/facility',
          }"
          aria-current="$route.path === '/facility' ? 'page' : null"
        >
          Facility
        </a>
        <a
          href="/rules"
          class="block rounded-md px-3 py-2 text-base font-medium"
          :class="{
            'bg-[#82A0D8] bg-opacity-20 text-white': $route.path === '/rules',
            'text-gray-300 hover:bg-[#80BCBD] hover:text-white':
              $route.path !== '/rules',
          }"
          aria-current="$route.path === '/rules' ? 'page' : null"
        >
          Rules
        </a>
      </div>
    </div>
  </nav>
</template>
