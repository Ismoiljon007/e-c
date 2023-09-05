import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const ids = ref([]);

  if (localStorage.getItem("saved")) {
    ids.value = JSON.parse(localStorage.getItem("saved"));
  } else {
    ids.value = [];
  }
  function save(id) {
    const item = ids.value.find((elem) => elem === id);
    if (!item) {
      ids.value.push(id);
      localStorage.setItem("saved", JSON.stringify(ids.value));
    } else {
       const prId = ids.value.filter(el => el !== id)
       ids.value = prId
      localStorage.setItem("saved", JSON.stringify(ids.value));
    }
  }
  return {
    save,
    ids,
  };
});
