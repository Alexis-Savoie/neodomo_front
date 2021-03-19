import { Line, mixins } from 'vue-chartjs'
import Vue from 'vue'
const { reactiveProp } = mixins

export default Vue.extend({
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  data(): any {
    return {
      itemsSelect: ["Foo", "Bar", "Fizz", "Buzz"],
    };
  },
})