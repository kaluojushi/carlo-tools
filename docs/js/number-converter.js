const numberConverter = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>阿拉伯数字</span>
    </div>
    <div class="tipText">
      支持输入金额符号、千分位符号、小数点、负号。
    </div>
    <el-form :model="inputForm" label-width="50px">
      <el-form-item label="数字">
        <el-input v-model="inputForm.number" placeholder="￥12,345.67"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="convert">转换</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card" v-if="showResult">
    <div slot="header" class="vue-component-card-header">
      <span>转换结果</span>
    </div>
    <el-form :model="outputForm" label-width="100px">
      <el-form-item label="繁体中文">
        <el-switch v-model="isTraditionalChinese" @change="onSwitch"></el-switch>
      </el-form-item>
      <el-form-item label="分隔符">
        <el-input v-model="outputForm.split" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="outputForm.split" @click="onCopy"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="(isTraditionalChinese ? '繁' : '简') + '体中文小写'">
        <el-input v-model="outputForm.lower" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="outputForm.lower" @click="onCopy"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="(isTraditionalChinese ? '繁' : '简') + '体中文大写'">
        <el-input v-model="outputForm.upper" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="outputForm.upper" @click="onCopy"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="(isTraditionalChinese ? '繁' : '简') + '体金额简写'">
        <el-input v-model="outputForm.moneyBrief" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="outputForm.moneyBrief" @click="onCopy"></i>
        </el-input>
      </el-form-item>
      <el-form-item :label="(isTraditionalChinese ? '繁' : '简') + '体金额全写'">
        <el-input v-model="outputForm.moneyFull" readonly>
          <i slot="suffix" class="copyBtn el-icon-document-copy" :data-clipboard-text="outputForm.moneyFull" @click="onCopy"></i>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>说明</span>
    </div>
    <ul>
      <li>
        取“亿亿”为“兆”，即 10 的 16 次方。
      </li>
      <li>
        每 10 的 8 次方使用新的单位，即“亿”、“兆”、“京”、“垓”、“秭”、“壤”、“沟”、“涧”、“正”、“载”、“极”、“恒河沙”、“阿僧祇”、“那由他”、“不可思议”，最大支持 10 的 128 次方减 1。
      </li>
    </ul>
  </el-card>
</div>
  `,
  data() {
    return {
      inputForm: {
        number: '',
      },
      showResult: true,
      isTraditionalChinese: false,
      outputForm: {
        split: '',
        lower: '',
        upper: '',
        moneyBrief: '',
        moneyFull: '',
      },
      lowerMap: [ '零', '一', '二', '三', '四', '五', '六', '七', '八', '九' ],
      upperMap: [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ],
      upperTraditionalMap: [ '零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖' ],
    }
  },
  methods: {
    convert() {
      if (this.inputForm.number === '') {
        this.$message.error('请输入数字');
        this.showResult = false;
        return;
      }
      if (/[^0-9\.\,\-\$＄￥€£฿₽₹]/.test(this.inputForm.number)) {
        this.$message.error('输入的数字包含非法字符');
        this.showResult = false;
        return;
      }
      let number = this.inputForm.number.replace(/[^0-9\.\-]/g, '');
      let isNegative = false;
      if (number[0] === '-') {
        isNegative = true;
        number = number.slice(1);
      }
      if (number === '' || number.count('-') > 0 || number.count('.') > 1) {
        this.$message.error('输入的数字格式错误');
        this.showResult = false;
        return;
      }
      let [int, dec] = number.split('.');
      int = int.replace(/^0+/, '');
      dec = dec ? dec.replace(/0+$/, '') : '';
      if (int.length > 128) {
        this.$message.error('输入的数字过大');
        this.showResult = false;
        return;
      }
      const negative = isNegative ? this.isTraditionalChinese ? '負' : '负' : '';
      this.outputForm = {
        split: (negative ? '-' : '') + this.intToSplit(int) + (dec ? '.' + dec : ''),
        lower: negative + this.intToChinese(int, 1) + this.decToChinese(dec, 1),
        upper: negative + this.intToChinese(int, 2) + this.decToChinese(dec, 2),
        moneyBrief: negative + this.intToChinese(int, 3) + this.decToChinese(dec, 3),
        moneyFull: negative + this.intToChinese(int, 4) + this.decToChinese(dec, 4),
      };
      this.showResult = true;
    },
    intToSplit(int) {
      const result = [];
      let flag = false;
      while (int.length > 0) {
        result.push(int.slice(-4));
        int = int.slice(0, -4);
        if (int.length > 0) {
          result.push(flag ? '||' : '|');
          flag = !flag;
        }
      }
      return result.reverse().join('');
    },
    intToChinese(int, type) {
      if (!int) {
        return '零';
      }
      const units = this.isTraditionalChinese ?  [ '', '億', '兆', '京', '垓', '秭', '壤', '沟', '涧', '正', '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議' ] : [ '', '亿', '兆', '京', '垓', '秭', '壤', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由他', '不可思议' ];
      const result = [];
      let i = 0, last = '';
      while (int.length > 0) {
        const part = int.slice(-8).replace(/^0+/, '');
        if (i > 0) {
          if (!last) {
            result.pop();
            result.pop();
          }
          if (last && (part[part.length - 1] === '0' || last.length < 8)) {
            result.push('零');
          }
          result.push(units[i]);
        }
        result.push(this.intLessThan100mToChinese(part, type));
        int = int.slice(0, -8);
        last = part;
        i++;
      }
      return result.reverse().join('');
    },
    intLessThan10kToChinese(int, type) {
      const lowerMap = this.lowerMap;
      const upperMap = this.isTraditionalChinese ? this.upperTraditionalMap : this.upperMap;
      const map = type === 1 ? lowerMap : upperMap;
      const lowerUnits = [ '', '十', '百', '千' ];
      const upperUnits = [ '', '拾', '佰', '仟' ];
      const units = type === 1 ? lowerUnits : upperUnits;
      if (int.length > 4) {
        int = int.slice(-4);
      }
      int = int.replace(/^0+/, '');
      if (int === '') {
        return '零';
      }
      const intArr = int.split('').reverse();
      const result = [];
      for (let i = 0; i < intArr.length; i++) {
        const d = intArr[i];
        if (d === '0' && (result.length === 0 || result[result.length - 1] === '零')) {
          continue;
        }
        result.push(map[d] + (d === '0' ? '' :units[i]));
      }
      if (type === 1 && result[result.length - 1] === '一十') {
        result[result.length - 1] = '十';
      }
      return result.reverse().join('');
    },
    intLessThan100mToChinese(int, type) {
      if (int.length > 8) {
        int = int.slice(-8);
      }
      int = int.replace(/^0+/, '');
      const unit = this.isTraditionalChinese ? '萬' : '万';
      const [int1, int2] = [int.slice(0, -4), int.slice(-4)].map(int => int.replace(/^0+/, ''));
      const result = [];
      result.push(this.intLessThan10kToChinese(int2, type));
      if (int1 && !int2) {
        result.pop();
      }
      if (int1 && int2 && (int2.length < 4 || int1[int1.length - 1] === '0')) {
        result.push('零');
      }
      if (int1) {
        result.push(unit);
        result.push(this.intLessThan10kToChinese(int1, type));
      }
      return result.reverse().join('');
    },
    decToChinese(dec, type) {
      if (!dec) {
        dec = '';
      }
      if (type === 3 || type === 4) {
        dec = dec.slice(0, 2);
      }
      const lowerMap = this.lowerMap;
      const upperMap = this.isTraditionalChinese ? this.upperTraditionalMap : this.upperMap;
      if (type === 1 || type === 2) {
        if (!dec) {
          return '';
        }
        return '点' + dec.split('').map(d => type === 1 ? lowerMap[d] : upperMap[d]).join('');
      }
      let ans = this.isTraditionalChinese ? '圓' : '元';
      if (type === 3) {
        if (!dec) {
          ans += '整';
        } else {
          ans += upperMap[dec[0]] + '角';
          if (dec[1]) {
            ans += upperMap[dec[1]] + '分';
          }
        }
      } else if (type === 4) {
        ans += (upperMap[dec[0]] || '零') + '角' + (upperMap[dec[1]] || '零') + '分';
      }
      return ans;
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
    onSwitch() {
      this.convert();
    },
  },
};

export default numberConverter;

String.prototype.count = function(ch) {
  return this.split(ch).length - 1;
}

String.prototype.every = function(ch) {
  return this.split("").every(c => c === ch);
}
