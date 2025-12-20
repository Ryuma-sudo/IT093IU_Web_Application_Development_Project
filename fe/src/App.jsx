import React, { useEffect, Suspense, lazy } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { LoadingBarProvider } from "./contexts/LoadingBarContext"

import HomePageAuth from './pages/HomePageAuth'
import LogInPage from "./pages/LogInPage"
import SignUpPage from "./pages/SignUpPage"
import WatchPage from "./pages/WatchPage"
import ProfilePage from './pages/ProfilePage'
import WatchListPage from './pages/WatchListPage'
import SearchPage from './pages/SearchPage'
import AdminPage from './pages/AdminPage'
import UserDashboard from './pages/UserDashboard'

import { useUserStore } from "./stores/useUserStore"

// Lazy load components
const HomePage = lazy(() => import('./pages/HomePage'));

const App = () => {
    const { user, checkAuth, checkingAuth, isAdmin } = useUserStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (checkingAuth) return <LoadingSpinner />; return (
        <LoadingBarProvider>
            <div className="bg-nf-bg min-h-screen">
                <ScrollToTop />

                <div className="bg-nf-bg/95 backdrop-blur-md sticky top-0 z-40 border-b border-nf-border/50">
                    <Navbar />
                </div>

                <Routes>
                    <Route path="/" element={user ? <HomePageAuth /> : <HomePage />} />

                    <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
                    <Route path='/login' element={!user ? <LogInPage /> : <Navigate to='/' />} />

                    <Route path="/watch/:id" element={<WatchPage />} />
                    <Route path="/search" element={<SearchPage />} />

                    <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
                    <Route path="/watchlist/:id" element={user ? <WatchListPage /> : <Navigate to="/" />} />

                    <Route path="/dashboard/:id" element={user ? <UserDashboard /> : <Navigate to="/login" />} />
                    <Route path="/admin/:id" element={user && isAdmin() ? <AdminPage /> : <Navigate to="/" />} />
                </Routes>

                <Footer />
                <Toaster />
            </div>
        </LoadingBarProvider>
    )
}

// Loading component
const LoadingSpinner = () => (
    <div className="h-screen w-screen flex items-center justify-center bg-nf-bg">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nf-accent"></div>
            <span className="text-nf-text-muted text-sm font-medium">Loading...</span>
        </div>
    </div>
);

export default App