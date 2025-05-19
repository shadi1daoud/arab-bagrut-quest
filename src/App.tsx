
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCourses";
import Shop from "./pages/student/Shop";
import Community from "./pages/student/Community";
import Settings from "./pages/student/Settings";
import CourseDetail from "./pages/student/CourseDetail";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AdminUsers from "./pages/admin/Users";
import AdminUploadCourse from "./pages/admin/UploadCourse";
import AdminEditCourse from "./pages/admin/EditCourse";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route path="shop" element={<Shop />} />
              <Route path="community" element={<Community />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiresAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="courses/upload" element={<AdminUploadCourse />} />
              <Route path="courses/edit/:id" element={<AdminEditCourse />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
