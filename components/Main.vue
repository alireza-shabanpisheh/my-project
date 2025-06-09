<script setup lang="ts">
const isLoading = ref(false);
const showModal = ref(false);
const modalMessage = ref("");
const modalType = ref("");

const formData = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const handleSubmit = async () => {
  isLoading.value = true;
  showModal.value = false;

  try {
    const response = await fetch("/api/portfolio/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData.value),
    });

    const result = await response.json();

    if (result.success) {
      modalMessage.value = "Message sent successfully";
      modalType.value = "success";
      formData.value = {
        name: "",
        email: "",
        phone: "",
        message: ""
      };
    } else {
      modalMessage.value = "Failed to send message";
      modalType.value = "error";
    }
  } catch (error) {
    modalMessage.value = "Network error";
    modalType.value = "error";
  } finally {
    showModal.value = true; // Show the modal
    isLoading.value = false; // Reset the button state
    setTimeout(() => {
      showModal.value = false; // Hide modal after 2 seconds
    }, 3000);
  }
};

const closeModal = () => {
  showModal.value = false; // Close the modal manually
};



// import p1 from '../assets/images/p1.png'
// import p2 from '../assets/images/p2.png'
// import p3 from '../assets/images/p3.png'
// import p4 from '../assets/images/p4.png'
// import p5 from '../assets/images/p5.png'

// const sites = [
//   { url: 'https://landing-page-xi-blush-34.vercel.app/', thumbnail: p1 , name: 'Solana Website'},
//   { url: 'https://lighturngames.fun/', thumbnail: p2 , name: 'lighturngames' },
//   { url: 'https://mc-donald-s-corporation.vercel.app/', thumbnail: p3 , name: 'McDonald' },
//   { url: 'https://business-template-nine.vercel.app/', thumbnail: p4 , name: 'Business Template' },
//   { url: 'https://dashboard-admin-gamma-nine.vercel.app/', thumbnail: p5 , name: 'Dashboard Admin' },
// ];

import {
  useSitesStore
} from '../stores/useSites'

const {
  sites
} = useSitesStore()

const router = useRouter();

const goToSite = (site: string) => {
  router.push(`/site/${site}`);
};
</script>

<template>
  <div>
    <main>
      <section class="hero">
        <div class="bg-img">
          <img src="../assets/images/bg.png" alt="" />
        </div>
        <div class="hero-top container">
          <div class="content">
            <div class="info">
              <h1>Hi, I am</h1>

              <h2>Alireza</h2>
              <h6>Developer</h6>

            </div>

            <!-- <div class="contact-me">
              <a href="https://t.me/alireza_shiba" target="_blank"
                ><i class="fa-brands fa-telegram"></i
              ></a>
              <a
                href="https://api.whatsapp.com/send/?phone=989335930769&text&type=phone_number&app_absent=0"
                target="_blank"
                ><i class="fa-brands fa-whatsapp"></i
              ></a>

              <a href="#"
                ><i class="fa-brands fa-linkedin" target="_blank"></i
              ></a>
              <a href="https://github.com/alireza-shabanpisheh" target="_blank"
                ><i class="fa-brands fa-github"></i
              ></a>
            </div> -->
          </div>

          <div class="person-img">
            <img src="../assets/images/person1.png" alt="person" />
          </div>
        </div>
      </section>

      <section class="BERRIES">
        <h4>Contact Information</h4>
        <!-- <h4>Mobile: +989335930769</h4>
        <h4>Email: ashabanpisheh@gmail.com</h4> -->

        <div class="contact-me">
          <a href="mailto:ashabanpisheh@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>

          <a href="https://github.com/alireza-shabanpisheh" target="_blank"><i class="fa-brands fa-github"></i></a>

          <a href="https://t.me/alireza_shiba" target="_blank"><i class="fa-brands fa-telegram"></i></a>

          <a href="https://api.whatsapp.com/send/?phone=989335930769&text&type=phone_number&app_absent=0"
            target="_blank"><i class="fa-brands fa-whatsapp"></i></a>

          <!-- <a href="#"
                ><i class="fa-brands fa-linkedin" target="_blank"></i
              ></a> -->
        </div>
        <!-- <p class="p-tag">
          phone: +989335930769<br>
          email: alireza.shibanpisheh@gmail.com
        </p> -->
        <!-- <span>READ MORE</span> -->
      </section>

      <section class="aboutme container" id="About">
        <div class="header-info">
          <h4>ABOUT ME</h4>
          <p class="p-tag">
            I'm a web developer with a strong focus on user interfaces and the front-end experience. I care deeply about
            building interfaces that are not only visually clear and responsive but also intuitive and enjoyable to use.
            My interest in web development goes beyond just the UI — I value writing clean, maintainable code and
            understanding how things work under the hood. Whether it's translating a design into a polished interface or
            thinking through the structure of a web app, I’m driven by curiosity, care for detail, and a genuine passion
            for the craft of development.
          </p>
          <!-- <h6>EXPLORE</h6> -->
          <!-- <img src="../assets/images/separatorBlack 1.png" alt="" /> -->
        </div>

        <!-- <div class="grid-about">
          <div class="development columns">
            <h6>DEVELOPMENT</h6>
            <p>
              I can design the site based on your needs and suggestions. I can
              <br />
              also design the site from scratch and consult you during the job.
            </p>
          </div>
          <div class="maintenance columns">
            <h6>MAINTENANCE</h6>
            <p>
              I can design the site based on your needs and suggestions. I can
              <br />
              also design the site from scratch and consult you during the job.
            </p>
          </div>
        </div> -->
        <img src="../assets/images/separatorBlack 1.png" alt="" />
      </section>
      <section class="skills container" id="Skills">
        <div class="header-info">
          <h4>SKILLS</h4>
        </div>
        <div class="using-now">
          <!-- <h4>USING NOW:</h4> -->
          <div class="grid-skills">
            <div class="grid-item item1">
              <img src="../assets/images/html.svg" alt="" />
              <h6>HTML5</h6>
            </div>
            <div class="grid-item item2">
              <img src="../assets/images/css.svg" alt="" />
              <h6>CSS3</h6>
            </div>
            <div class="grid-item item3">
              <img src="../assets/images/bootstrap-solid 1.png" alt="" />
              <h6>bootstrap</h6>
            </div>
            <div class="grid-item item4">
              <img src="../assets/images/tailwind-css.svg" alt="" />
              <h6>Tailwind</h6>
            </div>
            <div class="grid-item item5">
              <img src="../assets/images/javascript.svg" alt="" />
              <h6>JavaScript</h6>
            </div>
            <div class="grid-item item6">
              <img src="../assets/images/typscript.png" alt="" />
              <h6>TypeScript</h6>
            </div>
            <div class="grid-item item7">
              <img src="../assets/images/vuejs.svg" alt="" />
              <h6>Vue js</h6>
            </div>
            <div class="grid-item item8">
              <img src="../assets/images/nuxtjs.svg" alt="" />
              <h6>Nuxt js</h6>
            </div>

            <div class="grid-item item9">
              <img src="../assets/images/Git-Icon-1788C 1.png" alt="" />
              <h6>Git</h6>
            </div>

            <div class="grid-item item10">
              <img src="../assets/images/laravel.svg" alt="Laravel" />
              <h6>Laravel</h6>
            </div>

            <div class="grid-item item2">
              <img src="../assets/images/mysql-icon.svg" alt="" />
              <h6>Mysql</h6>
            </div>

          </div>
        </div>
        <!-- <div class="learning-now">
          <h4>LEARNING NOW:</h4>
          <div class="grid-skills">
            <div class="grid-item item1">
              <img src="../assets/images/nodejs.png" alt="" />
              <h6>Node Js</h6>
            </div>
            <div class="grid-item item2">
              <img src="../assets/images/mysql-icon.svg" alt="" />
              <h6>Mysql</h6>
            </div>
          </div>
        </div> -->
        <!-- <div class="other-skills">
          <h4>OTHER SKILLS:</h4>
          <div class="grid-skills">
            <div class="grid-item item1">
              <img src="../assets/images/eng.svg" alt="" />
              <h6>ANGIELSKI C1/C2</h6>
            </div>
            <div class="grid-item item2">
              <img src="../assets/images/spanish.svg" alt="" />
              <h6>HISZPAŃSKI B1/B2/h6></h6>
            </div>
            <div class="grid-item item3">
              <img src="../assets/images/c++.svg" alt="" />
              <h6>C++</h6>
            </div>
          </div>
        </div> -->
      </section>

      <section class="portfolio" id="portofolio">
        <div class="header-img"></div>
        <div class="grid-header">
          <div class="info">
            <p>Explore Now</p>
            <!-- <p>CODED</p>
            <p>DESIGNED</p> -->
          </div>
        </div>
        <div class="grid-port">
          <!-- <iframe src="https://www.digikala.com/" style="width: 100%; height: 100%;"></iframe> -->

          <div v-for="(site, index) in sites" :key="index" class="grid-col card">
            <ClientOnly>
              <div class="fcard-image">
                <img :src="site.thumbnail" alt="Site Thumbnail" class="card-image" />
              </div>
            </ClientOnly>

            <h3 class="card-title">{{ site.name }}</h3>
            <NuxtLink :to="`/site/${encodeURIComponent(site.url)}`">
              <button class="visit-btn">View Full Website</button>
            </NuxtLink>
          </div>

          <!-- <div v-for="(site, index) in sites" :key="index" class="grid-col">
            <iframe :src="site" style="width: 100%; height: 85%"></iframe>
            <NuxtLink :to="`/site/${encodeURIComponent(site)}`">
              <button class="visit-btn">View Full Website</button>
            </NuxtLink>
          </div> -->

          <!-- <div class="grid-col col1"></div>
          <div class="grid-col col2"></div>
          <div class="grid-col col3"></div>
          <div class="grid-col col4"></div>
          <div class="grid-col col5"></div>
          <div class="grid-col col6"></div> -->
        </div>

        <div class="grid-header">
          <p>And many more to come...</p>
        </div>
      </section>
      <section class="contact container" id="contact">
        <div class="header-info">
          <h4>CONTACT</h4>
          <p class="p-tag">
            If you have any questions or would like to collaborate, I'd love to
            hear from you,<br />
            Please fill in your details and send your message. I'll get back to
            you as soon as possible.
          </p>
          <!-- <h6>EXPLORE</h6> -->
          <img src="../assets/images/separatorBlack 1.png" alt="" />
        </div>

        <form @submit.prevent="handleSubmit">
          <input type="text" name="name" id="name" placeholder="ENTER YOUR NAME*" v-model="formData.name" required />
          <input type="email" name="email" id="email" placeholder="ENTER YOUR EMAIL*" v-model="formData.email"
            required />
          <input type="text" name="phone" id="phone" placeholder=" YOUR PhONE*" v-model="formData.phone" required />
          <input type="text" name="comment" id="comment" placeholder="YOUR MESSAGE*" v-model="formData.message"
            required />
          <!-- <button class="btn-submit">SUBMIT</button> -->
          <button class="btn-submit" :disabled="isLoading">
            {{ isLoading ? 'Sending...' : 'SUBMIT' }}
          </button>
        </form>
      </section>

      <!-- Modal -->
      <div v-if="showModal" class="modal" :class="modalType" @click="closeModal">
        <div class="modal-content" @click.stop>
          <span class="close-btn" @click="closeModal">×</span>
          <p>{{ modalMessage }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 15px;
  display: inline-block;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.fcard-image {
  margin: 5px;
  border-radius: 10px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 350px;
  object-fit: fit;
  border-bottom: 2px solid #f0f0f0;
  display: block;
}


.card-title {
  font-size: 1.2rem;
  margin: 15px 0;
  font-weight: 600;
  color: #333;
}

.visit-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 15px;
}

.visit-btn:hover {
  background-color: #0056b3;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.modal.success {
  background-color: green;
}

.modal.error {
  background-color: red;
}

.modal-content {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.close-btn {
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 10px;
}

.modal p {
  margin: 0;
}

.btn-submit {
  cursor: pointer;
}

.p-tag {
  text-align: justify;
  line-height: 1.6rem;
  font-size: 1rem;
}
</style>
