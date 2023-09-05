<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Saved</h2>

            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div class="group relative h-full flex flex-col" v-for="item in products" :key="item?.id">
                    <div
                        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img :src="item?.thumbnail" alt="Front of men&#039;s Basic Tee in black."
                            class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                    </div>
                    <div class="mt-4 flex justify-between mb-4">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    {{ item?.description }}
                                </a>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ item?.category }}</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">${{ item.price }}</p>
                    </div>
                    <button
                        class="flex w-full justify-center rounded-md bg-[#2F4858] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 mt-auto btn"
                        @click="remove(item.id)">remove saved</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMainStore } from "~~/store/store"
const store = useMainStore()
const products = ref([])
async function getProducts() {
    const data = await $fetch('https://dummyjson.com/products?limit=100', {
        method: 'GET'
    })
    store.ids.forEach(id => {
        data.products.forEach(el => {
            if (id == el.id) {
                products.value.push(el)
            }
        })
    })
}

async function remove(id) {
    const prId = store.ids.filter(el => el !== id)
    store.ids = prId
    localStorage.setItem("saved", JSON.stringify(store.ids));
    let pr = []
    store.ids.forEach(id => {
        products.value.forEach(el => {
            if(id == el.id) {
                pr.push(el)
            }
        })
    })
    products.value = pr
}
await getProducts()
</script>

<style lang="scss" scoped></style>