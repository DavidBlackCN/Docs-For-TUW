<template>
  <div class="text">
    <p class="hitokoto">{{ hitokoto }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hitokoto: "正在加载一言..."
    };
  },
  async mounted() {
    try {
      const response = await fetch("https://v1.hitokoto.cn");
      const data = await response.json();
      this.hitokoto = `${data.hitokoto} —— ${data.from}`;
    } catch (e) {
      this.hitokoto = "生活不止眼前的苟且。";
    }
  }
};
</script>

<style scoped>
.text {
  position: relative;
  bottom: 60px;
  text-align: center;
  padding: 0.5rem;
  color: #6a737d;
}
.hitokoto {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin: 0;
  font-family: 'STKaiti', 'KaiTi', serif;
  letter-spacing: 1px;
}
</style>