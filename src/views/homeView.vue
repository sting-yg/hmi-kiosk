<template>
    <v-container fluid class="pa-0">
        <v-card elevation="7">
            <v-row no-gutters>
                <v-col cols="3" class="d-flex justify-center align-center">
                    <v-img style="height: 10vh;" src="../../public/assets/img/logo_icon.png" @click="lineSetVue"></v-img>
                </v-col>
                <v-col cols="6">
                    <span class="label" style="color: white; background-color: #0091EA; font-size: 7vh;">대기</span>
                </v-col>
                <v-col cols="3">
                    <span class="label" style="font-size: 3.5vh;" >{{currentDateFormat}}</span>
                </v-col>
            </v-row>
        </v-card>                  
    </v-container>
    <router-view></router-view>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useKioskStore } from '../stores/KioskStore';

export default defineComponent({
    setup() {
    const store = useKioskStore() // 使用 Pinia store
        return {
        store // 返回 store
        }
    },
    data: () => ({
    
        currentDateFormat: "",
        monitoringTimer : null as number | null,
        selectedCodeName: null as string | string[] | null,        
    }),
    methods: {
        updateCurrentTime() {
            const today = new Date();
            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);
            const hours = ('0' + today.getHours()).slice(-2); 
            const minutes = ('0' + today.getMinutes()).slice(-2);
            const seconds = ('0' + today.getSeconds()).slice(-2); 
            var _date = year + '-' + month  + '-' + day;
            var _time = hours + ':' + minutes  + ':' + seconds;
            this.currentDateFormat = _date + " " + _time;
        },
        lineSetVue()
        {
            this.$router.push('/lineSet')
        }
    },
    mounted() {
        this.monitoringTimer = setInterval(() =>{
            this.updateCurrentTime();
        }, 1000);     
    },
    beforeUnmount() {
        if(this.monitoringTimer) {
            clearInterval(this.monitoringTimer);
        }
    },
})
</script>
<style scoped>
@import "../../public/assets/scss/commonHmi.scss";
.label {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    color: black;
    background-color: white;
    width: 100%;
    height: 100%;
}
</style>
