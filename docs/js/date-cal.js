const dateCal = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>计算日期差</span>
    </div>
    <el-form :inline="true" :model="dateDiff" label-width="80px">
      <el-form-item label="开始日期">
        <el-date-picker v-model="dateDiff.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="el-icon-refresh" @click="onDateDiffExchange"></el-button>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker v-model="dateDiff.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onDateDiff">计算</el-button>
      </el-form-item>
    </el-form>
    <div class="tipText" v-if="showDateDiff">
      日期差为：
      <span style="font-size: 24px">{{dateDiffResult}}</span>
      天
    </div>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>计算几天后的日期</span>
    </div>
    <div class="tipText">
      负数表示向前计算。
    </div>
    <el-form :inline="true" :model="dateAdd" label-width="80px">
      <el-form-item label="开始日期">
        <el-date-picker v-model="dateAdd.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item label="天数">
        <el-input-number v-model="dateAdd.days" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onDateAdd">计算</el-button>
      </el-form-item>
    </el-form>
    <div class="tipText" v-if="showDateAdd">
      计算日期为：
      <span style="font-size: 24px">{{dateAddResult}}</span>
    </div>
  </el-card>
</div>
  `,
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const date = new Date();
            picker.$emit('pick', new Date(date.getFullYear(), date.getMonth(), date.getDate()));
          },
        }],
      },
      dateDiff: {
        startDate: '',
        endDate: '',
      },
      dateDiffResult: '',
      showDateDiff: false,
      dateAdd: {
        startDate: '',
        days: 0,
      },
      dateAddResult: '',
      showDateAdd: false,
    };
  },
  methods: {
    onDateDiff() {
      if (this.dateDiff.startDate === '' || this.dateDiff.endDate === '') {
        this.$message.error('请输入开始日期和结束日期');
        this.showDateDiff = false;
        return;
      }
      let startDate = new Date(this.dateDiff.startDate);
      let endDate = new Date(this.dateDiff.endDate);
      let diff = endDate.getTime() - startDate.getTime();
      this.dateDiffResult = Math.floor(diff / (24 * 3600 * 1000));
      this.showDateDiff = true;
    },
    onDateDiffExchange() {
      let temp = this.dateDiff.startDate;
      this.dateDiff.startDate = this.dateDiff.endDate;
      this.dateDiff.endDate = temp;
    },
    onDateAdd() {
      if (this.dateAdd.startDate === '') {
        this.$message.error('请输入开始日期');
        this.showDateAdd = false;
        return;
      }
      const startDate = new Date(this.dateAdd.startDate);
      const endDate = new Date(startDate.getTime() + this.dateAdd.days * 24 * 3600 * 1000);
      this.dateAddResult = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
      this.showDateAdd = true;
    }
  },
  created() {
    const date = new Date();
    this.dateDiff.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.dateDiff.endDate = new Date(date.getFullYear(), 11, 31);
    this.onDateDiff();
    this.dateAdd.startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.dateAdd.days = 5;
    this.onDateAdd();
  },
};

export default dateCal;
