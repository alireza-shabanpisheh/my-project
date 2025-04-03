<script setup lang="ts">
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="container">
    <h2 class="error-code">404</h2>
    <p class="message">Oops! The page you are looking for does not exist.</p>
    <button class="btn" @click="handleError">Go Home</button>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e1e2f, #3a3d5a);
  color: #ffffff;
  text-align: center;
  padding: 20px;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
}

.message {
  font-size: 1.5rem;
  margin-bottom: 20px;
  max-width: 80%;
  line-height: 1.6;
}

.btn {
  background: #ff4757;
  color: white;
  padding: 12px 24px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn:hover {
  background: #e84118;
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-code {
    font-size: 4rem;
  }
  
  .message {
    font-size: 1.2rem;
  }

  .btn {
    font-size: 1rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 3rem;
  }

  .message {
    font-size: 1rem;
  }

  .btn {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
