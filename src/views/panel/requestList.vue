<template>
    <v-container fluid class="h-100 w-100 pa-0 ma-0"> 
        <v-row class="h-100 w-100 pa-5 ma-0 bg-blue-grey-lighten-4">
            <v-card class="h-100 w-100 pa-0 ma-0">
                <v-table fixed-header style="height: 85.1vh;" id="custom-scrollbar">
                    <thead>
                        <tr>
                            <th class="text-center">No.</th>
                            <th class="text-center">라인공정</th>
                            <th class="text-center">자재코드</th>
                            <th class="text-center">요청시간</th>
                            <th class="text-center">AMR 호출</th>
                            <th class="text-center">loading</th>
                        </tr>     
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index">
                            <td class="text-center">{{ index }}</td>
                            <td class="text-center">{{ items[index].lineStation }}</td>
                            <td class="text-center">{{ items[index].MaterialCode }}</td>
                            <td class="text-center">{{ items[index].requestTime }}</td>
                            <td class="text-center">{{ items[index].AmrCall }}</td>
                            <td class="text-center">{{ items[index].Load }}</td>
                        </tr>
                    </tbody>    
                </v-table>
            </v-card>             
        </v-row>      
    </v-container>
</template>
<script lang="ts">
  export default {
    data() {
      return {
        currentDateFormat: "",
        monitoringTimer : null as number | null,
        items:[
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false}, 
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},
            {lineStation: "1Line 1Station", MaterialCode: "M00001", requestTime: 1, AmrCall: false, Load: false},     
        ]       
      };
    },
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
  };
</script>
<style scoped>
@import "../../../public/assets/scss/commonHmi.scss";
#virtual-scroll-table {
  max-height: 400px;
  overflow: auto;
}
th {
font-size: 5vh;
font-weight: bold;
color: white;
background-color: #0091EA !important;
}
td {
font-size: 3.5vh;
font-weight: bold;
}
.v-table--density-default{
    --v-table-header-height: 10vh;
    --v-table-row-height: 10vh;
}
</style>
