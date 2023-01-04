const bmiCal = {
  template: `
  <div>
    <el-card class="bmi-cal-card">
      <div slot="header" class="bmi-cal-card-header">
        <span>计算</span>
      </div>
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item prop="height" label="身高">
          <el-input v-model="form.height" placeholder="请输入身高">
            <template slot="append">cm</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="weight" label="体重">
          <el-input v-model="form.weight" placeholder="请输入体重">
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card class="bmi-cal-card" v-if="showBmi">
      <div slot="header" class="bmi-cal-card-header">
        <span>计算结果</span>
      </div>
      <div>
        <span v-if="rightAnswer">您的BMI指数为：</span>
        <span v-if="rightAnswer" class="bmi-cal-result" :style="'color:' + color">{{ bmi }}</span>
        <span v-if="rightAnswer">，身体状态：</span>
        <span class="bmi-cal-result" :style="'color:' + color">{{ status }}</span>
      </div>
    </el-card>
    
    <el-card class="bmi-cal-card">
      <div slot="header" class="bmi-cal-card-header">
        <span>说明</span>
      </div>
      <ul>
        <li>
          采用中国标准，即 BMI < 18.5 为偏瘦，18.5 <= BMI < 24 为正常，24 <= BMI < 28 为超重，BMI >= 28 为肥胖。
        </li>
        <li>
          BMI 指的是体重指数，国际上通过公式计算人体胖瘦程度和是否处于健康状态的标准。
        </li>
        <li>
          仅通过 BMI，即体重指数也不能准确地描述体内脂肪的分布情况，也不能区分脂肪和肌肉含量，容易对健康状态出现误判。
        </li>
      </ul>
    </el-card>
  </div>
  `,
  data() {
    return {
      form: {
        height: '',
        weight: '',
      },
      showBmi: false,
      rightAnswer: false,
      bmi: '',
      status: '',
      color: '',
      statusList: [ "偏瘦", "正常", "超重", "肥胖" ],
      colorList: [ "#409EFF", "#67C23A", "#E6A23C", "#F56C6C" ],
    };
  },
  methods: {
    onSubmit() {
      this.showBmi = true;
      this.bmi = (Number(this.form.weight) / Math.pow(Number(this.form.height) / 100, 2)).toFixed(2);
      if (isNaN(this.bmi)) {
        this.rightAnswer = false;
        this.status = "请输入正确的身高和体重";
        this.color = "#000";
      } else {
        this.rightAnswer = true;
        let idx = 0;
        if (this.bmi < 18.5) {
          idx = 0;
        } else if (this.bmi < 24) {
          idx = 1;
        } else if (this.bmi < 28) {
          idx = 2;
        } else {
          idx = 3;
        }
        this.status = this.statusList[idx];
        this.color = this.colorList[idx];
      }
    },
    onReset() {
      this.form.height = '';
      this.form.weight = '';
      this.showBmi = false;
    }
  }
}

export default bmiCal;
