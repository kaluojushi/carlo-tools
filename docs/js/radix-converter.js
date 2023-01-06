const radixConverter = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>进制转换</span>
    </div>
    <div class="tipText">
      请输入正确的数字。
    </div>
    <el-form :model="radixForm" label-width="80px">
      <el-form-item label="二进制">
        <el-input v-model="radixForm.binary" placeholder="请输入二进制数" @input="onInput(2)"></el-input>
      </el-form-item>
      <el-form-item label="八进制">
        <el-input v-model="radixForm.octal" placeholder="请输入八进制数" @input="onInput(8)"></el-input>
      </el-form-item>
      <el-form-item label="十进制">
        <el-input v-model="radixForm.decimal" placeholder="请输入十进制数" @input="onInput(10)"></el-input>
      </el-form-item>
      <el-form-item label="十六进制">
        <el-input v-model="radixForm.hexadecimal" placeholder="请输入十六进制数" @input="onInput(16)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
  `,
  data() {
    return {
      radixForm: {
        binary: '',
        octal: '',
        decimal: '',
        hexadecimal: ''
      }
    };
  },
  methods: {
    onInput(radix) {
      const map = {
        2: 'binary',
        8: 'octal',
        10: 'decimal',
        16: 'hexadecimal'
      }
      const key = map[radix];
      let pattern;
      switch (radix) {
        case 2:
          pattern = /[^01]*/g;
          break;
        case 8:
          pattern = /[^0-7]*/g;
          break;
        case 10:
          pattern = /[^0-9]*/g;
          break;
        case 16:
          pattern = /[^0-9a-fA-F]*/g;
          break;
      }
      this.radixForm[key] = this.radixForm[key].replace(pattern, '');
      if (this.radixForm[key] !== '') {
        this.radixCal(radix, this.radixForm[key]);
      } else {
        this.reset();
      }
    },
    radixCal(radix, value) {
      const num = parseInt(value, radix);
      this.radixForm.binary = num.toString(2);
      this.radixForm.octal = num.toString(8);
      this.radixForm.decimal = num.toString(10);
      this.radixForm.hexadecimal = num.toString(16);
    },
    reset() {
      this.radixForm.binary = '';
      this.radixForm.octal = '';
      this.radixForm.decimal = '';
      this.radixForm.hexadecimal = '';
    }
  },
};

export default radixConverter;
