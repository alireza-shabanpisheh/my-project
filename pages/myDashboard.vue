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
const toast = useToast()

// State
const messages = ref<Message[]>([]);
const isLoading = ref(false);
const sidebarOpen = ref(false);
const activeTab = ref('');
const deletingId = ref<number | null>(null);

// Close sidebar when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.sidebar') && !target.closest('.hamburger')) {
    sidebarOpen.value = false;
  }
};

// Add/remove event listener when sidebar opens/closes
watch(sidebarOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

// Fetch messages
const fetchMessages = async () => {
  isLoading.value = true;
  try {
    const response = await fetch("/api/portfolio/contact");
    const data = await response.json();
    if (data.success) {
      messages.value = data.contacts;
      activeTab.value = 'messages';
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
  } finally {
    isLoading.value = false;
  }
};

// Delete message
const deleteMessage = async (id: number) => {
  if (confirm('Are you sure you want to delete this message?')) {
    deletingId.value = id;
    try {
      const response = await fetch(`/api/portfolio/contact/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        messages.value = messages.value.filter(msg => msg.id !== id);
        toast.success({
          title: 'Success!',
          message: 'Message deleted successfully.',
          position: 'topRight',
          color: 'green',
        })
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error({
        title: 'Error!',
        message: 'Failed to delete message.',
        position: 'topRight',
        color: 'red',
      })
    } finally {
      deletingId.value = null;
    }
  }
};

// Sign out
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    router.push("/");
  }
};

// Close sidebar when clicking a nav item (for mobile)
const closeSidebar = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false;
  }
};

// Fetch messages on component mount
onMounted(() => {
  fetchMessages();
});
</script>

<template>
  <div class="dashboard">
    <!-- Mobile Header -->
    <header class="mobile-header">
      <button @click.stop="sidebarOpen = !sidebarOpen" class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <h1>Admin Panel</h1>
      <div class="spacer"></div>
    </header>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'open': sidebarOpen }" @click.stop>
      <div class="sidebar-header">
        <h2 class="logo">Admin</h2>
      </div>
      
      <nav class="sidebar-nav">
        <ul>
          <li>
            <button 
              @click="fetchMessages(); closeSidebar()"
              :class="{ 'active': activeTab === 'messages' }"
              class="nav-item"
            >
              <span class="icon">📩</span>
              <span class="text">Messages</span>
            </button>
          </li>
          <li>
            <button 
              @click="signOut()"
              class="nav-item"
            >
              <span class="icon">🔒</span>
              <span class="text">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content" @click="sidebarOpen = false">
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="loading-spinner"></div>

      <!-- Messages Section -->
      <section v-if="activeTab === 'messages' && !isLoading" class="messages-section">
        <div class="section-header">
          <h2>Contact Messages</h2>
          <p>List of all messages received through contact form</p>
        </div>

        <div v-if="messages.length === 0" class="no-messages">
          <p>No messages found</p>
        </div>

        <div class="messages-grid">
          <div v-for="message in messages" :key="message.id" class="message-card">
            <div class="message-header">
              <div class="sender-info">
                <h3>{{ message.name }}</h3>
                <p class="email">{{ message.email }}</p>
              </div>
              <div class="message-actions">
                <p class="created-at">{{ new Date(message.createdAt).toLocaleString() }}</p>
                <button 
                  @click.stop="deleteMessage(message.id)"
                  class="delete-btn"
                  :disabled="deletingId === message.id"
                  aria-label="Delete message"
                >
                  <span v-if="deletingId === message.id" class="loading-dots"></span>
                  <span v-else>×</span>
                </button>
              </div>
            </div>
            <div class="message-body">
              <div class="contact-info">
                <p><strong>Phone:</strong> {{ message.phone }}</p>
              </div>
              <div class="message-text">
                <p>{{ message.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <div v-if="activeTab === '' && !isLoading" class="empty-state">
        <div class="empty-content">
          <h2>Welcome to Admin Panel</h2>
          <p>Please select an option from the sidebar menu</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* Base Styles */
:root {
  --sidebar-width: 280px;
  --sidebar-bg: #1e293b;
  --sidebar-text: #f8fafc;
  --sidebar-active: #334155;
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --danger: #ef4444;
  --danger-hover: #dc2626;
  --bg-color: #f1f5f9;
  --card-bg: #ffffff;
  --text-color: #1e293b;
  --text-light: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

/* Dashboard Layout */
.dashboard {
  display: flex;
  min-height: 100vh;
  position: relative;
}

/* Mobile Header */
.mobile-header {
  display: none;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90;
  box-shadow: var(--shadow-md);
}

.mobile-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  z-index: 110;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--sidebar-text);
  border-radius: 3px;
  transition: var(--transition);
}

.spacer {
  width: 30px;
}

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--sidebar-bg);
  color: var(--sidebar-text);
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  transition: var(--transition);
  z-index: 100;
  transform: translateX(-100%);
}

.sidebar.open {
  transform: translateX(0);
  box-shadow: var(--shadow-lg);
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.sidebar-nav {
  padding: 1rem 0;
}

.sidebar-nav ul {
  list-style: none;
}

.nav-item {
  width: 100%;
  background: none;
  border: none;
  color: var(--sidebar-text);
  text-align: left;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: var(--transition);
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: var(--sidebar-active);
}

.nav-item .icon {
  font-size: 1.1rem;
}

.nav-item .text {
  font-size: 0.95rem;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 0;
  padding: 2rem;
  min-height: 100vh;
  transition: var(--transition);
}

/* Loading Spinner */
.loading-spinner {
  border: 4px solid rgba(59, 130, 246, 0.1);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Messages Section */
.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: var(--text-light);
}

.no-messages {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
}

.messages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.message-card {
  background-color: var(--card-bg);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: var(--transition);
}

.message-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.message-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.sender-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.sender-info .email {
  color: var(--primary);
  font-size: 0.85rem;
}

.message-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.created-at {
  font-size: 0.75rem;
  color: var(--text-light);
}

.delete-btn {
  background: none;
  border: none;
  color: var(--danger);
  font-size: 1.5rem;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: var(--transition);
}

.delete-btn:hover {
  background-color: #fee2e2;
  color: var(--danger-hover);
}

.delete-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-dots {
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  color: var(--danger);
}

.loading-dots::after {
  content: "...";
  position: absolute;
  left: 0;
  animation: dot-animation 1.5s infinite;
}

@keyframes dot-animation {
  0%, 20% { content: "."; }
  40% { content: ".."; }
  60%, 100% { content: "..."; }
}

.message-body {
  padding: 1rem;
}

.contact-info {
  margin-bottom: 1rem;
}

.contact-info p {
  font-size: 0.9rem;
}

.message-text {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4rem);
}

.empty-content {
  text-align: center;
  max-width: 400px;
}

.empty-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.empty-content p {
  color: var(--text-light);
}

/* Responsive Styles */
@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0);
  }

  .main-content {
    margin-left: var(--sidebar-width);
  }
}

@media (max-width: 1023px) {
  .mobile-header {
    display: flex;
  }

  .main-content {
    padding-top: 5rem;
  }
}

@media (max-width: 640px) {
  .messages-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 1rem;
    padding-top: 5rem;
  }
}
</style>