const colorConverter = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>快速选择</span>
    </div>
    <div class="tipText">
      docsify 主题色
    </div>
    <el-button v-for="item in docsifyColorList" :key="item.color" :style="{ backgroundColor: item.color, color: item.isDark ? '#000' : '#fff' }" @click="quickChoose(item.color)">{{ item.color }}</el-button>
    <div class="tipText" style="margin-top: 15px">
      Element UI 主题色
    </div>
    <el-button v-for="item in elementUIColorList" :key="item.color" :style="{ backgroundColor: item.color, color: item.isDark ? '#000' : '#fff' }" @click="quickChoose(item.color)">{{ item.color }}</el-button>
  </el-card>

  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>颜色转换</span>
    </div>
    <div class="tipText" v-if="isPicker">
      请选择颜色。
    </div>
    <div class="tipText" v-else>
      请正确输入颜色值。
    </div>
    <el-form :model="colorForm" label-width="85px">
      <el-form-item label="选择模式">
        <el-switch v-model="isPicker" active-text="选择器" inactive-text="输入框" active-color="#42B983"></el-switch>
      </el-form-item>
      <el-form-item label="颜色输入框" v-if="!isPicker">
        <el-input v-model="colorForm.input" :placeholder="inputPlaceholder">
          <el-select v-model="colorForm.type" slot="prepend" placeholder="请选择" style="width: 90px" @change="onTypeChange">
            <el-option label="HEX" value="hex"></el-option>
            <el-option label="RGB" value="rgb"></el-option>
            <el-option label="HSL" value="hsl"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="颜色选择器" v-else>
        <el-color-picker v-model="colorForm.color" @change="convert"></el-color-picker>
      </el-form-item>
      <el-form-item v-if="!isPicker">
        <el-button type="basic" @click="convert">转换</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card" v-if="showResult">
    <div slot="header" class="vue-component-card-header">
      <span>转换结果</span>
    </div>
    <div class="tipText">
      请点击色块复制颜色值。
    </div>
    <el-table :data="result" style="font-size: 16px; width: 100%">
      <el-table-column prop="color" label="色块" width="100" align="center">
        <template slot-scope="scope">
          <el-button class="copyBtn" @click="onCopy" :data-clipboard-text="scope.row.value" :style="{ backgroundColor: scope.row.value }"></el-button>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="200" align="center"></el-table-column>
      <el-table-column prop="value" label="值" align="center"></el-table-column>
    </el-table>
  </el-card>
</div>
  `,
  data() {
    return {
      isPicker: false,
      colorForm: {
        color: '',
        type: '',
        input: '',
      },
      inputPlaceholder: '',
      docsifyColorList: [
        { color: '#42B983', isDark: false },
        { color: '#ECF8F2', isDark: true },
        { color: '#5CC593', isDark: false },
        { color: '#40AE7D', isDark: false },
      ],
      elementUIColorList: [
        { color: '#409EFF', isDark: false },
        { color: '#67C23A', isDark: false },
        { color: '#E6A23C', isDark: false },
        { color: '#F56C6C', isDark: false },
        { color: '#909399', isDark: false },
        { color: '#303133', isDark: false },
      ],
      showResult: false,
      result: [],
    }
  },
  methods: {
    convert() {
      this.showResult = true;
      let hex = '', rgb = '', hsl = '';
      if (this.isPicker) {
        hex = this.colorForm.color;
        if (!hex) {
          this.showResult = false;
          return;
        }
        ({ hex, rgb, hsl } = this.hexToOther(hex));
      } else {
        if (!this.colorForm.type) {
          this.$message.error('请选择颜色类型');
          this.showResult = false;
          return;
        }
        if (!this.colorForm.input) {
          this.$message.error('请输入颜色值');
          this.showResult = false;
          return;
        }
        if (this.colorForm.type === 'hex') {
          hex = this.colorForm.input;
          ({ hex, rgb, hsl } = this.hexToOther(hex));
        } else if (this.colorForm.type === 'rgb') {
          rgb = this.colorForm.input;
          ({ hex, rgb, hsl } = this.rgbToOther(rgb));
        } else if (this.colorForm.type === 'hsl') {
          hsl = this.colorForm.input;
          ({ hex, rgb, hsl } = this.hslToOther(hsl));
        }
      }
      this.result = [
        { type: 'HEX', value: hex },
        { type: 'RGB', value: rgb },
        { type: 'HSL', value: hsl },
      ];
    },
    hexToOther(hex) {
      hex = hex.replace('#', '');
      let rgb = '', hsl = '';
      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      let hslArr = this.rgbToHsl(r, g, b);
      hsl = 'hsl(' + hslArr[0] + ', ' + hslArr[1] + '%, ' + hslArr[2] + '%)';
      hex = '#' + hex;
      return { hex, rgb, hsl };
    },
    rgbToOther(rgb) {
      rgb = rgb.replace('rgb(', '').replace(')', '');
      const [r, g, b] = rgb.split(',').map(Number);
      let hex = '', hsl = '';
      hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
      let hslArr = this.rgbToHsl(r, g, b);
      hsl = 'hsl(' + hslArr[0] + ', ' + hslArr[1] + '%, ' + hslArr[2] + '%)';
      rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      return { hex, rgb, hsl };
    },
    hslToOther(hsl) {
      hsl = hsl.replace('hsl(', '').replace(')', '');
      let [h, s, l] = hsl.split(',').map(i => i.replace('%', '')).map(Number);
      let hex = '', rgb = '';
      let rgbArr = this.hslToRgb(h, s, l);
      rgb = 'rgb(' + rgbArr[0] + ', ' + rgbArr[1] + ', ' + rgbArr[2] + ')';
      hex = '#' + ((1 << 24) + (rgbArr[0] << 16) + (rgbArr[1] << 8) + rgbArr[2]).toString(16).slice(1).toUpperCase();
      hsl = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
      return { hex, rgb, hsl };
    },
    rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min, e = max + min;
        s = l > 0.5 ? d / (2 - e) : d / e;
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    },
    hslToRgb(h, s, l) {
      let r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        h /= 360;
        s /= 100;
        l /= 100;
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
    reset() {
      this.colorForm.type = '';
      this.colorForm.input = '';
      this.inputPlaceholder = '请选择颜色类型';
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
    onTypeChange() {
      if (this.colorForm.type === 'hex') {
        this.inputPlaceholder = '42B983 或 #42B983';
      } else if (this.colorForm.type === 'rgb') {
        this.inputPlaceholder = '66, 185, 131 或 rgb(66, 185, 131)';
      } else if (this.colorForm.type === 'hsl') {
        this.inputPlaceholder = '153, 47%, 49% 或 hsl(153, 47%, 49%)';
      }
    },
    quickChoose(value) {
      this.colorForm.color = value;
      this.colorForm.type = 'hex';
      this.colorForm.input = value;
      this.inputPlaceholder = '42B983 或 #42B983';
      this.convert();
    }
  },
  created() {
    this.colorForm.color = '#42B983';
    this.inputPlaceholder = '请选择颜色类型';
  }
};

export default colorConverter;
