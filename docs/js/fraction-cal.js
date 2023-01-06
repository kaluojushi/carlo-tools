const fractionCal = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>约分</span>
    </div>
    <div class="tipText">
      约分：把分数化成最简分数的过程。
    </div>
    <el-form :inline="true" :model="reduction" label-width="90px">
      <el-form-item label="分子/分母">
        <el-col :span="11">
          <el-input v-model="reduction.numerator" placeholder="请输入分子"></el-input>
        </el-col>
        <el-col style="text-align: center" :span="2">/</el-col>
        <el-col :span="11">
          <el-input v-model="reduction.denominator" placeholder="请输入分母"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onReduction">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" label-width="90px">
      <el-form-item label="结果">
        <el-input v-model="reductionResult" placeholder="结果" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="reductionResult" @click="onCopy"></i>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>最大公约数</span>
    </div>
    <div class="tipText">
      最大公约数：两个或多个整数共有约数中最大的一个。
    </div>
    <el-form :inline="true" :model="gcd" label-width="50px">
      <el-form-item label="数字1">
        <el-input v-model="gcd.a" placeholder="请输入数字1"></el-input>
      </el-form-item>
      <el-form-item label="数字2">
        <el-input v-model="gcd.b" placeholder="请输入数字2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onGcd">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" label-width="50px">
      <el-form-item label="结果">
        <el-input v-model="gcdResult" placeholder="结果" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="gcdResult" @click="onCopy"></i>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>最小公倍数</span>
    </div>
    <div class="tipText">
      最小公倍数：两个或多个整数共有倍数中除 0 外最小的一个。
    </div>
    <el-form :inline="true" :model="lcm" label-width="50px">
      <el-form-item label="数字1">
        <el-input v-model="lcm.a" placeholder="请输入数字1"></el-input>
      </el-form-item>
      <el-form-item label="数字2">
        <el-input v-model="lcm.b" placeholder="请输入数字2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLcm">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" label-width="50px">
      <el-form-item label="结果">
        <el-input v-model="lcmResult" placeholder="结果" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="lcmResult" @click="onCopy"></i>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
</div>
  `,
  data() {
    return {
      reduction: {
        numerator: '',
        denominator: '',
      },
      reductionResult: '',
      gcd: {
        a: '',
        b: '',
      },
      gcdResult: '',
      lcm: {
        a: '',
        b: '',
      },
      lcmResult: '',
    };
  },
  methods: {
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
    onReduction() {
      const { numerator, denominator } = this.reduction;
      if (!numerator || !denominator) {
        this.$message.error('请输入分子和分母');
        return;
      }
      const n = Number(numerator);
      const d = Number(denominator);
      if (!Number.isInteger(n) || !Number.isInteger(d)) {
        this.$message.error('分子和分母必须是整数');
        return;
      }
      if (d === 0) {
        this.$message.error('分母不能为0');
        return;
      }
      const gcd = this.gcdCal(n, d);
      this.reductionResult = `${n / gcd}/${d / gcd}`;
    },
    onGcd() {
      const { a, b } = this.gcd;
      if (!a || !b) {
        this.$message.error('请输入数字1和数字2');
        return;
      }
      const x = Number(a);
      const y = Number(b);
      if (!Number.isInteger(x) || !Number.isInteger(y)) {
        this.$message.error('数字1和数字2必须是整数');
        return;
      }
      this.gcdResult = this.gcdCal(x, y);
    },
    onLcm() {
      const { a, b } = this.lcm;
      if (!a || !b) {
        this.$message.error('请输入数字1和数字2');
        return;
      }
      const x = Number(a);
      const y = Number(b);
      if (!Number.isInteger(x) || !Number.isInteger(y)) {
        this.$message.error('数字1和数字2必须是整数');
        return;
      }
      this.lcmResult = this.lcmCal(x, y);
    },
    gcdCal(a, b) {
      if (b === 0) {
        return a;
      }
      return this.gcdCal(b, a % b);
    },
    lcmCal(a, b) {
      return (a * b) / this.gcdCal(a, b);
    },
  },
};

export default fractionCal;
