<script setup lang="ts">
const user = useSupabaseUser();
const redirectInfo = useSupabaseCookieRedirect();

watch(
  user,
  () => {
    if (user.value) {
      const path = redirectInfo.pluck();
      return navigateTo(path || "/");
    } else {
      throw createError
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="confirm-container">
    <div class="confirm-box">
      <div class="loader"></div>
      <p>Waiting for login...</p>
    </div>
  </div>
</template>

<style scoped>
/* استایل کلی صفحه */
.confirm-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}

/* باکس انتظار */
.confirm-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
  width: 90%;
}

/* متن */
p {
  margin-top: 15px;
  font-size: 1.1rem;
  color: #333;
}

/* انیمیشن لودینگ */
.loader {
  border: 4px solid #e0e0e0;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 400px) {
  .confirm-box {
    padding: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
