export default {
    template: `
        <div>
            <h3 class="my-4">School A</h3>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Accounting Start Date</label>
                        <input class="form-control" type="date" v-model="account_start">
                    </div><br />
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Accounting End Date</label>
                        <input class="form-control" type="date" v-model="account_end">
                    </div><br />
                </div>
            </div>
            <div class="form-group">
                <label>Purchase Cost</label>
                <input class="form-control" type="number" step="0.01" v-model="cost">
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Purchase Date</label>
                        <input class="form-control" type="date" v-model="purchase_date">
                    </div>                
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>End Date</label>
                        <input class="form-control" type="date" v-model="lifetime_end_date">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Lifetime (Years)</label>
                        <input class="form-control" type="number" step="0.01" :value="getYears" disabled>
                    </div>
                </div>
            </div><br />
            <h5>Depreciation</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Current Value</label>
                        <input class="form-control" type="number" step="0.01" v-model="costs.value">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Charges</label>
                        <input class="form-control" type="number" step="0.01" :value="getDepreciationCharges" disabled>
                    </div>
                </div>
            </div><br />
            <h5>Net Book Value</h5>
            <hr>
            <div class="form-group">
                <label>Value at end of accounting period</label>
                <input class="form-control" type="number" step="0.01" :value="getNetBookValue" disabled>
                <span v-if="isTransferred" style="color:red;">Disposed</span>
            </div><br />
            <h5>Transfer Ownership</h5>
            <hr>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="isTransferred" id="transfer-asset">
                    <label class="form-check-label" for="transfer-asset">Transfer Asset</label>
                </div>
            </div>
            <div v-if="isTransferred">            
                <h3 class="my-4">School B</h3>
                <hr>
                <div class="form-group">
                    <label>Transfer Date</label>
                    <input class="form-control" type="date" v-model="transfer_date">
                </div>
                <div class="form-group">
                    <label>Transferred Cost</label>
                    <input class="form-control" type="number" step="0.01" :value="getTransferredCost" disabled>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            cost: '5425.93',
            account_start: '2018-09-01',
            account_end: '2019-09-01',
            purchase_date: '2019-05-01',
            lifetime_end_date: '2022-05-01',
            transfer_date: '2019-06-01',
            isTransferred: false,
            costs: {
                value: '5425.93',
            },
            deprec: {
                charges: '0',
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
            let start = moment(this.purchase_date);
            let end = moment(this.lifetime_end_date);
            let years = end.diff(start, 'years');

            return years;
        },

        getPercentage() {
            return this.round(1 / this.getYears);
        },

        getDepreciationCharges() {
            return this.deprec.charges = this.round(((this.costs.value * this.getPercentage) / 12) * this.getAccountingMonths);
        },

        getAccountingMonths() {
            let start = moment(this.purchase_date);
            let end = moment(this.account_end);

            if (this.isTransferred) {
                end = moment(this.transfer_date)
            }

            if (end.diff(start, 'months') >= 12) {
                start = moment(this.account_start);
            }

            if (end.diff(moment(this.lifetime_end_date), 'months') <= 12 & end.diff(moment(this.lifetime_end_date), 'months') >= 0) {
                if (this.isTransferred) {
                    start = moment(this.transfer_date)
                }
                end = moment(this.lifetime_end_date);
            }

            let months = end.diff(start, 'months');

            return months;
        },

        getNetBookValue() {
            let nbv = parseFloat(this.costs.value) - parseFloat(this.deprec.charges);

            if (this.isTransferred) {
                nbv = 0;
            }

            return this.round(nbv);
        },

        getTransferredCost() {
            return parseFloat(this.costs.value) - parseFloat(this.deprec.charges);
        },
    }
}
