export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  // اگر کاربر لاگین نکرده و از صفحه خاصی آمده، هدایت شود
  if (!user.value && to.path === '/myDashboard') {
    return navigateTo('/login');
  }
});
