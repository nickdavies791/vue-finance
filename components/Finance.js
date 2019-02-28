export default {
    template: `
        <div>
            <h4 class="my-4">School A</h4>
            <hr>
            <div class="form-group">
                <label>Accounting End Date</label>
                <input class="form-control" type="date" v-model="account_end">
            </div><br />
            <div class="form-group">
                <label>Purchase Cost</label>
                <input class="form-control" type="text" v-model="cost">
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Purchase Date</label>
                        <input class="form-control" type="date" v-model="start">
                    </div>                
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>End Date</label>
                        <input class="form-control" type="date" v-model="end">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Lifetime (Years)</label>
                        <input class="form-control" type="number" :value="getYears" disabled>
                    </div>
                </div>
            </div><br />
            <h5>Costs</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Costs Brought Forward</label>
                        <input class="form-control" type="text" v-model="costs.bfwd">
                    </div>                
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Additions</label>
                        <input class="form-control" type="text" v-model="costs.additions">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Disposals</label>
                        <input class="form-control" type="text" v-model="costs.disposals">
                    </div>                
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Costs Carried Forward</label>
                        <input class="form-control" type="text" v-model="getCostsCfwd">
                    </div>
                </div>
            </div><br />
            <h5>Depreciation</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Depreciation Brought Forward</label>
                        <input class="form-control" type="text" v-model="deprec.bfwd">
                    </div>                
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Charges</label>
                        <input class="form-control" type="text" :value="getDepreciationCharges">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Disposals</label>
                        <input class="form-control" type="text" v-model="deprec.disposals">
                    </div>                
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Depreciation Carried Forward</label>
                        <input class="form-control" type="text" :value="getDeprecCfwd">
                    </div>
                </div>
            </div><br />
            <div class="form-group">
                <label>Net Book Value</label>
                <input class="form-control" type="text" :value="getNetBookValue" disabled>
            </div>
            <h4 class="my-4">School B</h4>
            <hr>
            <div class="form-group">
                <label>Transfer Date</label>
                <input class="form-control" type="date" v-model="transfer">
            </div>
            <div class="form-group">
                <label>Transferred Cost</label>
                <input class="form-control" type="text" :value="getTransferredCost" disabled>
            </div>
        </div>
    `,

    data() {
        return {
            cost: '5425.93',
            start: '2019-05-19',
            end: '2022-05-19',
            account_end: '2019-08-31',
            transfer: '2019-08-19',
            costs: {
                bfwd: '',
                additions: '',
                disposals: '',
                cfwd: ''
            },
            deprec: {
                bfwd: '',
                charges: '',
                disposals: '',
                cfwd: ''
            }
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
            let nbv = this.costs.cfwd - this.deprec.cfwd;

            return this.round(nbv);
        },

        getPercentage() {
            return this.round(1 / this.getYears);
        },

        getDepreciationCharges() {
            return this.deprec.charges = this.round(this.costs.cfwd * this.getPercentage)
        },

        getMonthlyDepreciation() {
            let cost = this.cost;
            let percentage = this.getPercentage;
            let monthly_depreciation = cost * percentage / 12;

            return monthly_depreciation;
        },

        getCostsCfwd() {
            return this.costs.cfwd = this.round(this.costs.bfwd + this.costs.additions - this.costs.disposals);
        },

        getDeprecCfwd() {
            return this.deprec.cfwd = this.round(this.deprec.bfwd + this.deprec.charges - this.deprec.disposals);
        },

        getTransferredCost() {
            let nbv = this.cost - ((this.getDepreciationCharges / 12) * this.getTransferMonths);

            return this.round(nbv);
        },
    }
}
