<script setup>



</script>

<template>
    <div class="text-center ">
        
        <div class="w-full flex flex-col h-screen justify-center gap-4 p-10" >
        <h1 class="text-4xl font-bold mt-4">IMG.LY</h1>
        <h2 class="text-3xl font-bold">Apple Bingo</h2>
        <input type="text" class="border-2 border-gray-300 p-2 rounded-lg" placeholder="Enter your name" v-model="name">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="startGame">Start Game</button>
    </div>
    </div>
</template>