<template>
  <v-container>
    <v-row>
      <v-col cols=2></v-col>
      <v-col cols=8>
        {{ tsdata }}
        <line-chart :chart-data="storedata" :height="270" :responsive=false></line-chart>
        <button @click="addData()">Get Value</button>
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
      tsdata: null,
      storedata: null
    }
  },
  computed: {
  },
  mounted () {
    this.$ajax.get('ts/serial/output')
      .then (response => (this.tsdata = response.data.Bat_V)),
    this.updateGraph()
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
    addData () {
      this.$store.dispatch('update_chart_value').then(this.updateGraph());
    },
  }
}
</script>