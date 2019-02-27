export default {
    template: `
        <div>
            <div class="form-group">
                <label>Purchase Date</label>
                <input class="form-control" type="date" v-model="start">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input class="form-control" type="date" v-model="end">
            </div>
            <div class="form-group">
                <label>Months</label>
                <input class="form-control" type="number" :value="getMonths">
            </div>
        </div>
    `,

    data() {
        return {
            start: '',
            end: '',
        }
    },

    computed: {
        getMonths() {
            let start = moment(this.start);
            let end = moment(this.end);
            let months = end.diff(start, 'months');

            return months;
        }
    }
}
