<script setup>
const navbarVisible = ref(false);

function toggleNavbar() {
  navbarVisible.value = !navbarVisible.value;
}
</script>

<template>
  <div>
    <header>
      <div class="humburger" @click="toggleNavbar">
        <i 
          class="fa-solid fa-bars-staggered" 
          :data-visible="!navbarVisible"
        ></i>
        <i 
          class="fa-solid fa-xmark" 
          :data-visible="navbarVisible"
        ></i>
      </div>
      <nav class="container navbar">
        <img src="../assets/images/logo.png" alt="logo" class="logo">
        <img src="../assets/images/logo 2.png" alt="logo" class="mobile-logo">

        <ul 
          class="nav-links" 
          :data-visible="navbarVisible"
        >
          <li><a href="#About">About me</a></li>
          <li><a href="#Skills">Skills</a></li>
          <li><a href="#portofolio">Portfolio</a></li>
          <a class="btn" href="#contact">Contact Me</a>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style scoped>
</style>

<!-- ورژن قبلی - جاوا اسکریپت خام  -->

<!-- <script setup>
onMounted(() => {
  const navbar = document.querySelector(".nav-links");
  const humbergur = document.querySelector(".humburger");
  const icons = document.querySelectorAll("i");

  humbergur.addEventListener('click', function(event) {
    const isvible = navbar.getAttribute('data-visible');
    if (isvible === 'true') {
      navbar.setAttribute('data-visible', 'false');
      icons[0].setAttribute('data-visible', 'true');
      icons[1].setAttribute('data-visible', 'false');
    } else {
      navbar.setAttribute('data-visible', 'true');
      icons[0].setAttribute('data-visible', 'false');
      icons[1].setAttribute('data-visible', 'true');
    }
  });
});
</script>

<template>
  <div>
    <header>
        <div class="humburger">
            <i class="fa-solid fa-bars-staggered"  data-visible="true"></i>
            <i class="fa-solid fa-xmark"  data-visible="false"></i>
        </div>
      <nav class="container navbar">
        <img src="../assets/images/logo.png" alt="logo" class="logo">
        <img src="../assets/images/logo 2.png" alt="logo" class="mobile-logo">
        <ul class="nav-links"  data-visible="false">
            <li><a href="#About">About me</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#portofolio">Portfolio</a></li>
            <a class="btn" href="#contact">Contact Me</a>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style scoped>
</style> -->