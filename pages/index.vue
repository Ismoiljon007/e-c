<template>
    <div class="bg-white pb-4">
        <div class="container flex flex-col items-center"> 
            <div class="mx-auto py-16 sm:py-24">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
    
                <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    <div class="group relative h-full flex flex-col" v-for="item in products?.products" :key="item?.id">
                        <div
                            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img :src="item?.thumbnail" alt="Front of men&#039;s Basic Tee in black."
                                class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                        </div>
                        <div class="mt-4 flex justify-between mb-4">
                            <div>
                                <h3 class="text-sm text-gray-700">
                                    <NuxtLink :to="`/product/${item.id}`">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        {{ item?.title }}
                                    </NuxtLink>
                                </h3>
                                <p class="mt-1 text-sm text-gray-500">{{ item?.category }}</p>
                            </div>
                            <p class="text-sm font-medium text-gray-900">${{ item.price }}</p>
                        </div>
                        <button class="flex w-full justify-center rounded-md bg-[#2F4858] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:opacity-80 mt-auto btn" @click="store.save(item.id)">add to cart</button>
                    </div>
                </div>
            </div>
            <nav class="mx-auto isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button href="#" v-for="item in products?.total / 20" :key="item" @click="pagination(item)"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">{{
                        item }}</button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import {useMainStore} from "~~/store/store"
const store = useMainStore()
const limitMax = ref(20)
const limitMin = ref(0)
const products = ref(null)
async function getProducts(num) {
    const data = await $fetch('https://dummyjson.com/products?limit=20&skip='+num, {
        method: 'GET'
    })
    products.value = data
}
await getProducts(0)
async function pagination(num) {
    if (num == 1) {
        await getProducts(0)
    } else if (num == 2) {
        await getProducts(20)
    } else if (num == 3) {
        await getProducts(40)
    } else if (num == 4) {
        await getProducts(60)
    } else if (num == 5) {
        await getProducts(80)
    }
}
</script>

<style>
.btn {
    z-index: 10;
}
</style>