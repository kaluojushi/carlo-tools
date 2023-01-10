const binaryCal = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>位运算计算器</span>
    </div>
    <div class="tipText">
      数字范围为：
      <span style="font-size: 18px">{{ bitwise.range.join(' ~ ') }}</span>
    </div>
    <el-form :inline="true" :model="bitwise" label-width="60px">
      <el-form-item prop="bitCount" label="位数">
        <el-select v-model="bitwise.bitCount" placeholder="请选择位数" @change="onBitwiseTypeChange">
          <el-option label="4 位" value="4"></el-option>
          <el-option label="8 位" value="8"></el-option>
          <el-option label="16 位" value="16"></el-option>
          <el-option label="32 位" value="32"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="hasSign" label="有符号">
        <el-switch v-model="bitwise.hasSign" active-color="#42B983" @change="onBitwiseTypeChange"></el-switch>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="bitwise" label-width="60px">
      <el-form-item prop="num1" label="数字 1" v-if="bitwise.op !== 'not'">
        <el-input-number v-model="bitwise.num1" :min="bitwise.range[0]" :max="bitwise.range[1]" :step="1" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item prop="op" label="位运算">
        <el-select v-model="bitwise.op" placeholder="请选择位运算">
          <el-option label="按位或" value="or"></el-option>
          <el-option label="按位与" value="and"></el-option>
          <el-option label="按位非" value="not"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="num2" :label="bitwise.op !== 'not' ? '数字 2' : '数字'">
        <el-input-number v-model="bitwise.num2" :min="bitwise.range[0]" :max="bitwise.range[1]" :step="1" :precision="0"></el-input-number>
      </el-form-item>
    </el-form>
    <el-form label-width="60px">
      <el-form-item>
        <el-button type="basic" @click="onBitwiseCal">计算</el-button>
        <el-button @click="onBitwiseReset">清零</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="bitwiseResult" style="font-size: 16px; width: 100%" v-if="showBitwiseResult">
      <el-table-column prop="op" label="" width="70" align="center"></el-table-column>
      <el-table-column prop="sign" label="符" align="center" v-if="bitwise.hasSign" class="abc">
        <template slot-scope="scope">
          <el-button :type="scope.row.signType">{{ scope.row.binary[0] }}</el-button>
        </template>
      </el-table-column>
      <el-table-column v-for="idx in bitwise.bitCount - (bitwise.hasSign ? 1 : 0)" :key="idx" :prop="'bit' + idx" :label="String(bitwise.bitCount - (bitwise.hasSign ? 1 : 0) - idx)" align="center">
        <template slot-scope="scope">
          <el-button :type="scope.row.binary[idx - (bitwise.hasSign ? 0 : 1)] === '0' ? 'warning' : 'primary'">{{ scope.row.binary[idx - (bitwise.hasSign ? 0 : 1)] }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="decimal" label="十进制值" width="105" align="center"></el-table-column>
    </el-table>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>原码/反码/补码计算器</span>
    </div>
    <div class="tipText">
      数字范围为：
      <span style="font-size: 18px">{{ codec.range.join(' ~ ') }}</span>
    </div>
    <el-form :inline="true" :model="codec" label-width="60px">
      <el-form-item prop="bitCount" label="位数">
        <el-select v-model="codec.bitCount" placeholder="请选择位数" @change="onCodecTypeChange">
          <el-option label="4 位" value="4"></el-option>
          <el-option label="8 位" value="8"></el-option>
          <el-option label="16 位" value="16"></el-option>
          <el-option label="32 位" value="32"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="codec" label-width="60px">
      <el-form-item prop="num" label="数字">
        <el-input-number v-model="codec.num" :min="codec.range[0]" :max="codec.range[1]" :step="1" :precision="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onCodecCal(0)">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="codec" label-width="60px">
      <el-form-item prop="origin" label="原码">
        <el-input type="textarea" v-model="codec.origin" @input="onCodecInput(1)" placeholder="请输入原码" :maxlength="codec.bitCount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onCodecCal(1)">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="codec" label-width="60px">
      <el-form-item prop="reverse" label="反码">
        <el-input type="textarea" v-model="codec.reverse" @input="onCodecInput(2)" placeholder="请输入反码" :maxlength="codec.bitCount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onCodecCal(2)">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="codec" label-width="60px">
      <el-form-item prop="complement" label="补码">
        <el-input type="textarea" v-model="codec.complement" @input="onCodecInput(3)" placeholder="请输入补码" :maxlength="codec.bitCount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onCodecCal(3)">计算</el-button>
      </el-form-item>
    </el-form>
    <el-form label-width="60px">
      <el-form-item>
        <el-button @click="onCodecReset">清零</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
  `,
  data() {
    return {
      bitwise: {
        bitCount: "4",
        hasSign: true,
        range: [0, 0],
        num1: 5,
        op: "or",
        num2: -2,
      },
      showBitwiseResult: false,
      bitwiseResult : [],
      codec: {
        bitCount: "8",
        range: [0, 0],
        num: -9,
        origin: "",
        reverse: "",
        complement: "",
      },
    };
  },
  methods: {
    onBitwiseTypeChange() {
      if (!this.bitwise.hasSign) {
        this.bitwise.range[0] = 0;
        this.bitwise.range[1] = Math.pow(2, this.bitwise.bitCount) - 1;
      } else {
        this.bitwise.range[0] = -Math.pow(2, this.bitwise.bitCount - 1);
        this.bitwise.range[1] = Math.pow(2, this.bitwise.bitCount - 1) - 1;
      }
      this.showBitwiseResult = false;
    },
    onBitwiseCal() {
      if (this.isOutOfRange(this.bitwise.num1, this.bitwise.range) || this.isOutOfRange(this.bitwise.num2, this.bitwise.range)) {
        this.$message.error('当前数字超出范围');
        this.showBitwiseResult = false;
        return;
      }
      if (this.bitwise.op === "not") {
        const result = ~this.bitwise.num2;
        this.bitwiseResult = [
          { op: "非", binary: this.toBinary(this.bitwise.num2, this.bitwise.bitCount, this.hasSign), decimal: this.bitwise.num2, signType: this.getSignType(this.bitwise.num2) },
          { op: "结果", binary: this.toBinary(result, this.bitwise.bitCount, this.hasSign), decimal: result, signType: this.getSignType(result) },
        ]
      } else {
        const result = this.bitwise.op === "or" ? (this.bitwise.num1 | this.bitwise.num2) : (this.bitwise.num1 & this.bitwise.num2);
        this.bitwiseResult = [
          { op: "", binary: this.toBinary(this.bitwise.num1, this.bitwise.bitCount, this.hasSign), decimal: this.bitwise.num1, signType: this.getSignType(this.bitwise.num1) },
          { op: this.bitwise.op === "or" ? "或" : "与", binary: this.toBinary(this.bitwise.num2, this.bitwise.bitCount, this.hasSign), decimal: this.bitwise.num2, signType: this.getSignType(this.bitwise.num2) },
          { op: "结果", binary: this.toBinary(result, this.bitwise.bitCount, this.hasSign), decimal: result, signType: this.getSignType(result) },
        ];
      }
      this.showBitwiseResult = true;
    },
    onBitwiseReset() {
      this.bitwise.num1 = 0;
      this.bitwise.num2 = 0;
      this.showBitwiseResult = false;
    },
    isOutOfRange(num, range) {
      return num < range[0] || num > range[1] || !Number.isInteger(num);
    },
    toBinary(num, bitCount, hasSign) {
      let ans = "";
      if (hasSign) {
        ans += num < 0 ? "1" : "0";
        bitCount--;
      }
      if (num >= 0) {
        ans += num.toString(2).padStart(bitCount, "0");
      } else {
        ans += (Math.pow(2, bitCount) + num).toString(2).padStart(bitCount, "0");
      }
      return ans;
    },
    getSignType(num) {
      if (this.bitwise.hasSign) {
        return num < 0 ? "danger" : "basic";
      } else {
        return "default";
      }
    },

    onCodecTypeChange() {
      this.codec.range[0] = -Math.pow(2, this.codec.bitCount - 1);
      this.codec.range[1] = Math.pow(2, this.codec.bitCount - 1) - 1;
    },
    onCodecInput(type) {
      const map = [ "origin", "reverse", "complement" ];
      type--;
      this.codec[map[type]] = this.codec[map[type]].replace(/[^01]/g, "");
    },
    onCodecCal(type) {
      if (type === 0) {
        if (this.codec.num === undefined) {
          this.$message.error('请输入数字');
          return;
        }
        if (this.isOutOfRange(this.codec.num, this.codec.range)) {
          this.$message.error('当前数字超出范围');
          return;
        }
        if (this.codec.num >= 0) {
          this.codec.origin = this.codec.reverse = this.codec.complement = this.toBinary(this.codec.num, this.codec.bitCount, true);
        } else {
          this.codec.origin = "1" + this.toBinary(-this.codec.num, this.codec.bitCount - 1, false);
          this.codec.reverse = "1" + this.codec.origin.slice(1).split("").map(x => x === "0" ? "1" : "0").join("");
          this.codec.complement = this.toBinary(this.codec.num, this.codec.bitCount, true);
        }
      } else if (type === 1) {
        if (this.codec.origin === "") {
          this.$message.error('请输入原码');
          return;
        }
        if (this.codec.origin.length !== +this.codec.bitCount) {
          this.$message.error('原码长度不正确');
          return;
        }
        if (this.codec.origin[0] === "0") {
          this.codec.num = parseInt(this.codec.origin, 2);
        } else {
          this.codec.num = -parseInt(this.codec.origin.slice(1), 2);
        }
        this.onCodecCal(0);
      } else if (type === 2) {
        if (this.codec.reverse === "") {
          this.$message.error('请输入反码');
          return;
        }
        if (this.codec.reverse.length !== +this.codec.bitCount) {
          this.$message.error('反码长度不正确');
          return;
        }
        if (this.codec.reverse[0] === "0") {
          this.codec.origin = this.codec.reverse;
        } else {
          this.codec.origin = "1" + this.codec.reverse.slice(1).split("").map(x => x === "0" ? "1" : "0").join("");
        }
        this.onCodecCal(1);
      } else if (type === 3) {
        if (this.codec.complement === "") {
          this.$message.error('请输入补码');
          return;
        }
        if (this.codec.complement.length !== +this.codec.bitCount) {
          this.$message.error('补码长度不正确');
          return;
        }
        if (this.codec.complement[0] === "0") {
          this.codec.num = parseInt(this.codec.complement, 2);
        } else {
          this.codec.num = parseInt(this.codec.complement.slice(1), 2) - Math.pow(2, this.codec.bitCount - 1);
        }
        this.onCodecCal(0);
      }
    },
    onCodecReset() {
      this.codec.num = 0;
      this.codec.origin = "";
      this.codec.reverse = "";
      this.codec.complement = "";
    },
  },
  created() {
    this.onBitwiseTypeChange();
    this.onCodecTypeChange();
  },
};

export default binaryCal;
