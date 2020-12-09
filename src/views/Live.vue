<template>
  <v-container>
    <v-row>
      <v-col cols=2></v-col>
      <v-col cols=8>
        <line-chart :chart-data="storedata" :height="270" :responsive=false></line-chart>
        <button @click="getData()">Get Value</button>
      </v-col>
      <v-col cols=2></v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      storedata: null,
      timer: null
    }
  },
  computed: {
  },
  mounted () {
    clearInterval(this.timer);
    this.timer = setInterval(this.getData, 2000);
  },
  methods: {
    updateGraph() {
      this.storedata = {
        labels: Array(this.$store.state.chart_value.length).fill("Data"),
        datasets: [
          {
            label: 'Bat_V',
            fill: false,
            pointRadius: 2,
            lineTension: 0,
            data: this.$store.state.chart_value
          }
        ]
      }
    },
    async getData () {
      await this.$store.dispatch('update_chart_value');
      this.updateGraph();
    }
  }
}
</script>