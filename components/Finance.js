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
                <label>Years</label>
                <input class="form-control" min="0" type="number" :value="getYears">
            </div>
            <div class="form-group">
                <label>Percentage Depreciation</label>
                <input class="form-control" type="text" :value="getPercentage">
            </div>
        </div>
    `,

    data() {
        return {
            start: '2017-05-19',
            end: '2020-05-19',
        }
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

            return percentage;
        }
    }
}
