const timestamp = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>当前时间戳</span>
    </div>
    <el-row :gutter="20">
      <el-form :inline="true" :model="current">
        <el-col :span="8">
          <el-form-item label="当前日期">
            <el-input v-model="current.date" placeholder="当前日期" readonly @click="onCopy"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="当前时间戳">
            <el-input v-model="current.timestamp" placeholder="当前时间戳" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毫秒时间戳">
            <el-input v-model="current.msTimeStamp" placeholder="毫秒时间戳" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      
    </el-row>
  </el-card>
</div>
  `,
  data() {
    return {
      current: {
        date: '',
        timestamp: '',
        msTimeStamp: '',
      }
    };
  },
  methods: {
    getCurrentTime() {
      const date = new Date();
      this.current.date = date.toLocaleString();
      this.current.timestamp = Math.floor(date.getTime() / 1000);
      this.current.msTimeStamp = date.getTime();
    },
    onCopy() {
      this.$message.success('复制成功');
    }
  },
  mounted() {
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }
};

export default timestamp;
