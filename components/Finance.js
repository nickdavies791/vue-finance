export default {
    template: `
        <div>
            <div class="form-group">
                <label>Accounting End Date</label>
                <input class="form-control" type="date" v-model="account_end">
            </div>
            <div class="form-group">
                <label>Purchase Price</label>
                <input class="form-control" type="text" v-model="cost">
            </div>
            <div class="form-group">
                <label>Purchase Date</label>
                <input class="form-control" type="date" v-model="start">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input class="form-control" type="date" v-model="end">
            </div>
            <div class="form-group">
                <label>Percentage Depreciation</label>
                <input class="form-control" type="text" :value="getPercentage" disabled>
            </div>
            <div class="form-group">
                <label>Annual Depreciation</label>
                <input class="form-control" type="text" :value="getAnnualDepreciation" disabled>
            </div>
            <div class="form-group">
                <label>Monthly Depreciation</label>
                <input class="form-control" type="text" :value="getMonthlyDepreciation" disabled>
            </div>
            <div class="form-group">
                <label>Net Book Value</label>
                <input class="form-control" type="text" :value="getNetBookValue" disabled>
            </div>
            <div class="form-group">
                <label>Transfer Date</label>
                <input class="form-control" type="date" v-model="transfer">
            </div>
            <div class="form-group">
                <label>Transferred Net Book Value</label>
                <input class="form-control" type="text" :value="getTransferredNetBookValue" disabled>
            </div>
        </div>
    `,

    data() {
        return {
            cost: '5425.93',
            start: '2017-05-19',
            end: '2020-05-19',
            account_end: '2017-08-31',
            transfer: '2017-08-19',
        }
    },

    methods: {
        round(x) {
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

        getTransferMonths() {
            let start = moment(this.start);
            let end = moment(this.transfer);
            let months = end.diff(start, 'months');

            return months;
        },

        getAccountingMonths() {
            let start = moment(this.start);
            let end = moment(this.account_end);
            let months = end.diff(start, 'months');

            return months;
        },

        getNetBookValue() {
            let nbv = this.cost - this.getMonthlyDepreciation * this.getAccountingMonths;

            return this.round(nbv);
        },

        getPercentage() {
            let percentage = (1 / this.getYears);

            return this.round(percentage);
        },

        getAnnualDepreciation() {
            let cost = this.cost;
            let percentage = this.getPercentage;
            let annual_depreciation = cost * percentage;

            return this.round(annual_depreciation);
        },

        getMonthlyDepreciation() {
            let cost = this.cost;
            let percentage = this.getPercentage;
            let monthly_depreciation = cost * percentage / 12;

            return monthly_depreciation;
        },

        getTransferredNetBookValue() {
            let nbv = this.cost - ((this.getAnnualDepreciation / 12) * this.getTransferMonths);

            return this.round(nbv);
        },
    }
}
