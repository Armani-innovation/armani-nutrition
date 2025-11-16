<!--<template>-->
<!--  <canvas ref="canvas" class="fixed inset-0 -z-10"></canvas>-->
<!--</template>-->

<!--<script setup>-->
<!--import { onMounted, ref } from 'vue'-->

<!--const canvas = ref(null)-->
<!--const items = []-->

<!--// رنگ‌های پاستلی خیلی روشن (هماهنگ با لیمو و برگ)-->
<!--const pastelColors = {-->
<!--  lemon: "#F8F3B4",-->
<!--  leaf: "#D9E8C4",-->
<!--  apple: "#F6C8C8",-->
<!--  strawberry: "#F7C2D0",-->
<!--  banana: "#F9F3C8",-->
<!--  carrot: "#F5D4B2",-->
<!--  eggplant: "#E2D2F2"-->
<!--}-->

<!--// =======================-->
<!--//   Food Drawing Shapes (واقعی‌تر و بزرگ‌تر)-->
<!--// =======================-->

<!--// 🍋 لیمو واقعی‌تر-->
<!--function drawLemon(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.lemon + "CC"-->
<!--  ctx.moveTo(0, -25)-->
<!--  ctx.bezierCurveTo(30, -18, 28, 18, 0, 25)-->
<!--  ctx.bezierCurveTo(-28, 18, -30, -18, 0, -25)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// 🍃 برگ واقعی‌تر-->
<!--function drawLeaf(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.leaf + "CC"-->
<!--  ctx.moveTo(0, -20)-->
<!--  ctx.bezierCurveTo(25, -15, 25, 15, 0, 20)-->
<!--  ctx.bezierCurveTo(-25, 15, -25, -15, 0, -20)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// 🍎 سیب واقعی‌تر-->
<!--function drawApple(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.apple + "CC"-->
<!--  ctx.moveTo(0, -20)-->
<!--  ctx.bezierCurveTo(22, -18, 18, 18, 0, 22)-->
<!--  ctx.bezierCurveTo(-18, 18, -22, -18, 0, -20)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// 🍓 توت‌فرنگی واقعی‌تر-->
<!--function drawStrawberry(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.strawberry + "CC"-->
<!--  ctx.moveTo(0, -18)-->
<!--  ctx.bezierCurveTo(20, -5, 18, 22, 0, 25)-->
<!--  ctx.bezierCurveTo(-18, 22, -20, -5, 0, -18)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// 🍌 موز واقعی‌تر-->
<!--function drawBanana(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.banana + "CC"-->
<!--  ctx.moveTo(-25, 0)-->
<!--  ctx.bezierCurveTo(-15, -28, 35, -25, 25, 0)-->
<!--  ctx.bezierCurveTo(15, 25, -35, 25, -25, 0)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// 🥕 هویج واقعی‌تر-->
<!--function drawCarrot(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.carrot + "CC"-->
<!--  ctx.moveTo(0, -25)-->
<!--  ctx.bezierCurveTo(18, -12, 12, 25, 0, 28)-->
<!--  ctx.bezierCurveTo(-12, 25, -18, -12, 0, -25)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// 🍆 بادمجان واقعی‌تر-->
<!--function drawEggplant(ctx, x, y, size) {-->
<!--  ctx.save()-->
<!--  ctx.translate(x, y)-->
<!--  ctx.scale(size, size)-->
<!--  ctx.beginPath()-->
<!--  ctx.fillStyle = pastelColors.eggplant + "CC"-->
<!--  ctx.moveTo(0, -28)-->
<!--  ctx.bezierCurveTo(22, -15, 22, 25, 0, 30)-->
<!--  ctx.bezierCurveTo(-22, 25, -22, -15, 0, -28)-->
<!--  ctx.fill()-->
<!--  ctx.restore()-->
<!--}-->

<!--// آرایه اشکال-->
<!--const shapes = [-->
<!--  drawLemon,-->
<!--  drawLeaf,-->
<!--  drawApple,-->
<!--  drawStrawberry,-->
<!--  drawBanana,-->
<!--  drawCarrot,-->
<!--  drawEggplant-->
<!--]-->

<!--// =======================-->
<!--// Generate Items (اطراف صفحه)-->
<!--// =======================-->
<!--function generateItems(width, height) {-->
<!--  items.length = 0-->
<!--  const count = 80-->

<!--  for (let i = 0; i < count; i++) {-->
<!--    let x, y-->
<!--    let safe = false-->

<!--    while (!safe) {-->
<!--      x = Math.random() * width-->
<!--      y = Math.random() * height-->

<!--      const centerX = width / 2-->
<!--      const centerY = height / 2-->
<!--      const dist = Math.hypot(x - centerX, y - centerY)-->

<!--      if (dist > width * 0.28) safe = true-->
<!--    }-->

<!--    items.push({-->
<!--      x,-->
<!--      y,-->
<!--      size: 0.6 + Math.random() * 1.2, // بزرگ‌تر-->
<!--      draw: shapes[Math.floor(Math.random() * shapes.length)]-->
<!--    })-->
<!--  }-->
<!--}-->

<!--// =======================-->
<!--// Render Loop-->
<!--// =======================-->
<!--function render() {-->
<!--  const ctx = canvas.value.getContext("2d")-->
<!--  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)-->

<!--  items.forEach(item => {-->
<!--    item.draw(ctx, item.x, item.y, item.size)-->
<!--  })-->

<!--  requestAnimationFrame(render)-->
<!--}-->

<!--onMounted(() => {-->
<!--  const c = canvas.value-->
<!--  c.width = window.innerWidth-->
<!--  c.height = window.innerHeight-->

<!--  generateItems(c.width, c.height)-->
<!--  render()-->

<!--  window.addEventListener("resize", () => {-->
<!--    c.width = window.innerWidth-->
<!--    c.height = window.innerHeight-->
<!--    generateItems(c.width, c.height)-->
<!--  })-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--canvas {-->
<!--  pointer-events: none;-->
<!--}-->
<!--</style>-->

<template>
  <div class="w-full h-[100vh] bg-[url('~/assets/images/1.jpg')] fixed inset-0 -z-10"></div>
</template>