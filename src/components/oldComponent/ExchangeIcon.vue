<template lang="pug">
.container
    i.bi.bi-person-walking(v-for="i in quantity" :class="`person${i}`")
    i.bi.bi-door-open.door
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'ExchangeIcon',
    props: {
        quantity: {
            type: Number,
            required: true
        }
    },
    setup() {
        const title = ref('這是一個標題')
        const description = ref('這是一段描述文字。')

        return {
            title,
            description
        }
    }
})
</script>
<style scoped>
.container {
    position: relative;
    width: 200px;
    height: 60px;
}

.bi {
    font-size: 40px;
    position: absolute;
    bottom: 0;
}

/* 
.person1, .person2, .person3 {
    animation: walkOut 5s forwards;
} */

.person3 {
    left: 0;
    animation-delay: 0s;
}

.person2 {
    left: 40px;
    animation-delay: 1s;
}

.person1 {
    left: 80px;
    animation-delay: 2s;
}

.door {
    right: 0;
}

@keyframes walkOut {
    to {
        transform: translateX(150px);
    }
}
</style>
