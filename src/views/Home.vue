<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12">
          <div class="flex items-center justify-center mb-4">
            <Home class="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome Home
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Vue 3 + TypeScript + Tailwind CSS + Lucide Icons
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <Zap class="w-8 h-8 text-yellow-500 mr-3" />
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Fast & Modern
              </h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Built with Vite for lightning-fast development and optimized production builds.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <Palette class="w-8 h-8 text-pink-500 mr-3" />
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Beautiful UI
              </h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Styled with Tailwind CSS for rapid UI development with utility-first classes.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <Router class="w-8 h-8 text-green-500 mr-3" />
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Vue Router
              </h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Seamless navigation between pages with Vue Router integration.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="flex items-center mb-4">
              <Sparkles class="w-8 h-8 text-purple-500 mr-3" />
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                Lucide Icons
              </h2>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Beautiful, customizable icons from Lucide for a polished look.
            </p>
          </div>
        </div>

        <!-- Navigation Button -->
        <div class="text-center">
          <router-link
            to="/about"
            class="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            <Info class="w-5 h-5 mr-2" />
            Learn More
            <ArrowRight class="w-5 h-5 ml-2" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, Zap, Palette, Router, Sparkles, Info, ArrowRight } from 'lucide-vue-next'
</script>

