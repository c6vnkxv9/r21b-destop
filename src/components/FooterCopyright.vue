<template lang="pug">
.banner-wrap.w-100.p-2
    p.footer-text.text-end Copyright © 2023 by Paulina Tong and Kami Liu. 
    p.text-end.footer-text All rights reserved.
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FooterCopyright'}
  )
</script>
<style lang="scss">
.footer-text{
    color: #fff;
    font-size: 12px;
    margin-bottom: 0;
    width: 100%;
}
</style>