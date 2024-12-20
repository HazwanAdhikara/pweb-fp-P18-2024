import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "Guest",
    role: "guest",
  }),
  actions: {
    setUser(username: string, role: string) {
      this.username = username;
      this.role = role;
    },
    clearUser() {
      this.username = "Guest";
      this.role = "guest";
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    },
  },
});
