<template>
  <div class="flex items-center justify-center">
    <div class="relative group">
      <!-- 外圈光晕 -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
      
      <!-- Logo 主体 -->
      <div class="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl border border-gray-700/50 shadow-2xl">
        <div class="flex items-center justify-center w-12 h-12">
          <!-- AI 图标 - 使用简洁的几何形状 -->
          <svg class="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Logo 组件
</script>

