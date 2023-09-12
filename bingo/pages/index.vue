<script setup>



const name = ref("")
const cards = ref([])
const activeCards = ref([])

const startGame = async () => {
    
    if (name.value == "") {
        alert("Please enter your name")
        return
    } 
    
    const { data: cardsResponse, error } = await useFetch(`/api/cards/${name.value}`)
    
    if (error.value) {
        alert("Error getting cards")
        return
    }

    cards.value = cardsResponse.value.cards
}

setInterval(async () => {
    if(cards.value.length == 0)
        return

    const { data: activeResponse, error } = await useFetch('https://batyngbuxwemltbimltd.supabase.co/rest/v1/active?select=text', {
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdHluZ2J1eHdlbWx0YmltbHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1MTI5MjEsImV4cCI6MjAxMDA4ODkyMX0.OJvK4j4w1tfjaSErOaxi-R3ws36H6NjpzbQ5q4xVLts'
        }
    })

    if(error.value)
        return

    activeCards.value = activeResponse.value.map((x => x.text))

}, 500)

const isOneOfActives = (card) => {
    return activeCards.value.indexOf(card) !== -1
}


</script>

<template>
    <div class="text-center bg-gray-800 ">
        <div class="w-full flex flex-col min-h-screen gap-4 p-10 " :class="{ 'justify-center': cards.length == 0 }" >
            <template v-if="cards.length == 0">
                <h1 class="text-4xl font-bold mt-4 text-white">IMG.LY</h1>
                <h2 class="text-3xl font-bold text-white">Apple Bingo</h2>
                <input type="text" class="border-2 border-gray-300 p-2 rounded-lg" placeholder="Enter your name" v-model="name">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="startGame">Start Game</button>
            </template>
            <template v-else>
                <div class="flex flex-col gap-4">
                    <h1 class="text-4xl font-bold text-white ">IMG.LY</h1>
                    <h2 class="text-3xl font-bold text-white">Apple Bingo</h2>
                    <h3 class="text-2xl font-bold text-white">Welcome {{name}}</h3>
                    <div class="flex flex-col gap-4 mt-4">
                        <template v-for="card in cards">
                            <div :class="{'bg-green-600': isOneOfActives(card)}" class="bg-white shadow-md rounded-lg p-4">
                                <h3 class="text-xl font-bold"  :class="{'text-white': isOneOfActives(card)}">{{card}}</h3>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>