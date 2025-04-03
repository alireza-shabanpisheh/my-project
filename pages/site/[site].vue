<script setup lang="ts">
import { useSitesStore } from "../../stores/useSites";
const { sites } = useSitesStore();

const route = useRoute();
const site = decodeURIComponent(route.params.site as string);

const isValidSite = computed(() => sites.some((s: any) => s.url === site));

onMounted(() => {
  if (!isValidSite.value) {
    throw createError
  }
});
</script>

<template>
  <div>
    <div class="full-page">
      <iframe :src="site" frameborder="0"></iframe>
    </div>
  </div>
</template>

<style scoped>
.full-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>