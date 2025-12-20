import { create } from "zustand";
import axios from "../config/axios";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';

export const useUserStore = create((set, get) => ({
	user: null,
	userInfo: [],
	token: null,
	loading: false,
	checkingAuth: false,
	isUpdatingProfile: false,

	// Helper to check if current user is admin
	isAdmin: () => {
		const user = get().user;
		return user?.roles?.includes('ROLE_ADMIN') || false;
	},

	signup: async ({ username, email, password }) => {
		set({ loading: true });
		try {
			await axios.post("/auth/signup", { username, email, password });
			toast.success("Signup successful. Please login.");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during signup");
		} finally {
			set({ loading: false });
		}
	},

	login: async ({ username, password }) => {
		set({ loading: true });
		try {
			const res = await axios.post("/auth/signin",
				{ username, password },
				{ withCredentials: true }
			);

			const { ...userData } = res.data;
			const jwtToken = Cookies.get("jwt");

			set({
				user: userData,
				token: jwtToken,
				loading: false
			});
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "Login failed");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout", {}, { withCredentials: true });
			set({ user: null });
			// Clear any cached data
			localStorage.removeItem('user');
			sessionStorage.removeItem('user');
		} catch (error) {
			toast.error(error.response?.data?.message || "Error during logout");
		}
	},

	fetchUser: async (id) => {
		set({ loading: true });
		try {
			const res = await axios.get(`/users/${id}`, { withCredentials: true });
			set({ userInfo: res.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch user", loading: false });
			toast.error(error.response.data.error || "Failed to fetch user");
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axios.post("/uploads/avatar", data, { withCredentials: true });
			toast.success("Profile updated successfully");
		} catch (error) {
			toast.error(error.response?.data?.message);
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	updateAvatarUrl: async (avatarUrl) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axios.post("/uploads/avatar-url", { avatarUrl }, { withCredentials: true });
			toast.success("Avatar updated successfully");
			return res.data;
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to update avatar");
			throw error;
		} finally {
			set({ isUpdatingProfile: false });
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const res = await axios.get("/auth/me", { withCredentials: true });
			set({
				user: res.data,
				checkingAuth: false
			});
		} catch (error) {
			set({ checkingAuth: false, user: null });
		}
	}
}));
