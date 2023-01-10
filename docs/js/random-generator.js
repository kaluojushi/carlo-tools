const randomGenerator = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>选项</span>
    </div>
    <el-form ref="form" :inline="true" :model="form" label-width="75px">
      <el-form-item prop="count" label="生成个数">
        <el-input v-model="form.count" placeholder="请输入生成个数"></el-input>
      </el-form-item>
      <el-form-item prop="range" label="范围">
        <el-col :span="11">
          <el-input v-model="form.min" placeholder="请输入最小值"></el-input>
        </el-col>
        <el-col style="text-align: center" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model="form.max" placeholder="请输入最大值"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item prop="isRepeat" label="是否重复">
        <el-switch v-model="form.isRepeat" active-text="是" inactive-text="否" active-color="#42B983"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card" v-if="showResult">
    <div slot="header" class="vue-component-card-header">
      <span>生成结果</span>
    </div>
    <span style="font-size: 20px">{{ tipText }}</span>
    <div style="margin-top: 10px">
      <el-button v-for="item in result" :key="item" class="copyBtn" style="margin: 5px; font-size: 16px" @click="onCopy" :data-clipboard-text="item">{{ item }}</el-button>
    </div>
    <div style="font-size: 18px">
      点击数字复制，或 <el-button class="copyBtn" style="font-size: 18px" type="text" @click="onCopy" :data-clipboard-text="result.join(',')">点击此处</el-button> 一键复制
    </div>
  </el-card>
</div>    
  `,
  data() {
    return {
      form: {
        count: 5,
        min: 0,
        max: 100,
        isRepeat: false,
      },
      showResult: false,
      tipText: '',
      result: [],
    }
  },
  methods: {
    onSubmit() {
      this.result = [];
      const { count, min, max, isRepeat } = this.form;
      if (!isRepeat && count > max - min + 1) {
        this.$message.error('生成个数不能大于范围');
        this.showResult = false;
      } else if (Number(count) === 0) {
        this.$message.error('生成个数不能为 0');
        this.showResult = false;
      } else {
        this.showResult = true;
        this.tipText = '生成的随机数为：';
        while (this.result.length < count) {
          const random = Math.floor(Math.random() * (max - min + 1) + min);
          if (isRepeat || !this.result.includes(random)) {
            this.result.push(random);
          }
        }
      }
    },
    onReset() {
      this.form = {
        count: '',
        min: '',
        max: '',
        isRepeat: false,
      };
      this.showResult = false;
    },
    onCopy() {
      const clipboard = new ClipboardJS('.copyBtn');
      const that = this;
      clipboard.on('success', function(e) {
        that.$message.success(`${e.text} 复制成功`);
        e.clearSelection();
        clipboard.destroy();
      });
      clipboard.on('error', function(e) {
        that.$message.error('复制失败');
        clipboard.destroy();
      });
    },
  },
};

export default randomGenerator;
