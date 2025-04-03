<script setup lang="ts">
interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const supabase = useSupabaseClient();
const router = useRouter();

const messages = ref<Message[]>([]);
const showMessages = ref(false);
const isLoading = ref(false); // متغیر برای نمایش لودینگ

const fetchMessages = async () => {
  isLoading.value = true; // نمایش لودینگ هنگام شروع درخواست
  try {
    const response = await fetch("/api/portfolio/contact");
    const data = await response.json();
    if (data.success) {
      messages.value = data.contacts;
      showMessages.value = true;
    }
  } catch (error) {
    console.error("خطا در دریافت پیام‌ها:", error);
  } finally {
    isLoading.value = false; // مخفی کردن لودینگ پس از دریافت داده
  }
};

// تابع خروج از حساب
const Signout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    router.push("/");
  }
};
</script>


<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="logo">Admin</h2>
      <nav>
        <ul class="nav-list">
          <li class="nav-item">
            <a class="nav-link cursor" @click="fetchMessages">📩 Messages</a>
          </li>
          <li class="nav-item">
            <a class="nav-link cursor" @click="showMessages = false">📩 Close Messages</a>
          </li>
          <li class="nav-item">
            <a class="nav-link cursor" @click="Signout">⚙ Logout</a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- نمایش لودینگ هنگام دریافت داده‌ها -->
      <div v-if="isLoading" class="loading-spinner"></div>

      <!-- نمایش پیام‌ها بعد از لود شدن -->
      <section v-if="showMessages && !isLoading" class="dashboard-main">
        <div v-for="message in messages" :key="message.id" class="message-card">
          <div class="message-header">
            <h3>{{ message.name }}</h3>
            <p class="created-at">{{ new Date(message.createdAt).toLocaleString() }}</p>
          </div>
          <p><strong>Email:</strong> {{ message.email }}</p>
          <p><strong>Phone:</strong> {{ message.phone }}</p>
          <p><strong>Message:</strong> {{ message.message }}</p>
        </div>
      </section>
    </main>
  </div>
</template>


<style scoped>
/* انیمیشن لودینگ */
.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cursor {
  cursor: pointer;
}

/* Main Layout */
.dashboard-container {
  display: flex;
  /* background: #000000; */
  flex-direction: column;
}

/* Sidebar */
.sidebar {
  width: 100%;
  background: #1c2b38;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
}

.nav-list {
  list-style: none;
  padding: 0;
}

.nav-item {
  margin-bottom: 15px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 12px 20px;
  display: block;
  border-radius: 6px;
  transition: 0.3s ease;
}

.nav-link:hover {
  background: #3b4a60;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

/* Dashboard Cards */
.dashboard-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.message-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-size: 1rem;
  color: #333;
  width: 100%;
  word-wrap: break-word; /* اضافه کردن این خط برای شکستن کلمات طولانی */
  white-space: normal;  /* اطمینان از اینکه متن به خط بعدی برود */
}

.message-card:hover {
  background: #f4f7fc;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.message-header h3 {
  font-size: 1.2rem;
  margin: 0;
}

.created-at {
  font-size: 0.9rem;
  color: #888;
}

p {
  margin: 10px 0;
}

strong {
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 15px;
  }

  .header {
    padding: 15px;
  }

  .message-card {
    width: 100%;
    margin: 0;
  }
}
</style>
