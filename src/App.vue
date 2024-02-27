<template>
  <v-app>
    <router-view/>  
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>

<style>


::-webkit-scrollbar
{
  width: 30px; /* 스크롤 바의 너비 */
  border-radius: 20px;
  background-color: #BDBDBD; /* 스크롤 바의 배경색 */
}

::-webkit-scrollbar-thumb
{
  border-radius: 20px;
  background: #757575; 
}
</style>
