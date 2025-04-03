<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const formData = ref({
  username: '',
  password: ''
})

const errorMessage = ref('') 

const signIn = async () => {
  errorMessage.value = '' 

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.username,
    password: formData.value.password,
  })

  if (error) {
    errorMessage.value = error.message 
  } else {
    formData.value.username = '' 
    formData.value.password = ''
    router.push('/confirm') 
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="signIn">
        <input type="text" id="username" placeholder="Username" v-model="formData.username">
        <input autocomplete="off" type="password" id="password" placeholder="Password" v-model="formData.password">
        <button type="submit">Login</button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.login-box {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 320px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 600;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: 0.3s;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0056b3;
}

.error-message {
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
}
</style>
