export default {
    template: `
        <div>
            <div class="form-group">
                <label>Purchase Price</label>
                <input class="form-control" type="text" v-model="cost">
            </div>
            <div class="form-group">
                <label>Purchase Date</label>
                <input class="form-control" type="date" v-model="start">
            </div>
            <div class="form-group">
                <label>Transfer Date</label>
                <input class="form-control" type="date" v-model="transfer">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input class="form-control" type="date" v-model="end">
            </div>
            <div class="form-group">
                <label>Years</label>
                <input class="form-control" min="0" type="number" :value="getYears">
            </div>
            <div class="form-group">
                <label>Percentage Depreciation</label>
                <input class="form-control" type="text" :value="getPercentage">
            </div>
            <div class="form-group">
                <label>Net Book Value</label>
                <input class="form-control" type="text" :value="getYearlyNetBookValue">
            </div>
            <div class="form-group">
                <label>Transferred Net Book Value</label>
                <input class="form-control" type="text" :value="getTransferredNetBookValue">
            </div>
        </div>
    `,

    data() {
        return {
            cost: '5425.93',
            start: '2017-05-19',
            end: '2020-05-19',
            transfer: '2017-08-19',
        }
    },

    methods: {
        round: function(x) {
            return +(Math.round(x + "e+2")  + "e-2");
        },
    },

    computed: {
        getYears() {
            let start = moment(this.start);
            let end = moment(this.end);
            let years = end.diff(start, 'years');

            return years;
        },

        getPercentage() {
            let percentage = (1 / this.getYears);

            return this.round(percentage);
        },

        getYearlyNetBookValue() {
            let cost = this.cost;
            let percentage = this.getPercentage;
            let nbv = cost * percentage;

            return this.round(nbv);
        },

        getTransferredNetBookValue() {
            let start = moment(this.start);
            let end = moment(this.transfer);
            let months = end.diff(start, 'months');
            let nbv = this.cost - ((this.getYearlyNetBookValue / 12) * months);

            return this.round(nbv);
        },
    }
}
