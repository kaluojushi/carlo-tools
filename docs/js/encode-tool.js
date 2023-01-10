const encodeTool = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>URL 编码/解码</span>
    </div>
    <el-form ref="form" :model="urlForm" label-width="60px">
      <el-form-item prop="input" label="字符串">
        <el-input type="textarea" v-model="urlForm.input" placeholder="请输入字符串" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onUrlEncode">URL 编码</el-button>
        <el-button type="primary" @click="onUrlDecode">URL 解码</el-button>
        <el-button type="danger" @click="onReset(urlForm)">清空</el-button>
        <el-button @click="onUseResult(urlForm)">使用结果</el-button>
        <el-button @click="onCopy" class="copyBtn" :data-clipboard-text="urlForm.output">复制结果</el-button>
      </el-form-item>
      <el-form-item prop="output" label="结果">
        <el-input type="textarea" v-model="urlForm.output" placeholder="结果" readonly :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>Unicode 编码/解码</span>
    </div>
    <el-form ref="form" :model="unicodeForm" label-width="60px">
      <el-form-item prop="input" label="字符串">
        <el-input type="textarea" v-model="unicodeForm.input" placeholder="请输入字符串" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onUnicodeEncode">Unicode 编码</el-button>
        <el-button type="primary" @click="onUnicodeDecode">Unicode 解码</el-button>
        <el-button type="danger" @click="onReset(unicodeForm)">清空</el-button>
        <el-button @click="onUseResult(unicodeForm)">使用结果</el-button>
        <el-button @click="onCopy" class="copyBtn" :data-clipboard-text="unicodeForm.output">复制结果</el-button>
      </el-form-item>
      <el-form-item prop="output" label="结果">
        <el-input type="textarea" v-model="unicodeForm.output" placeholder="结果" readonly :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>URL 参数转换</span>
    </div>
    <el-form ref="form" :model="urlParamForm" label-width="60px">
      <el-form-item prop="input" label="字符串">
        <el-input type="textarea" v-model="urlParamForm.input" placeholder="请输入 URL 字符串或 JSON 对象" :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="onUrlParamToJson">转 JSON</el-button>
        <el-button type="primary" @click="onJsonToUrlParam">转 URL</el-button>
        <el-button type="danger" @click="onReset(urlParamForm)">清空</el-button>
        <el-button @click="onUseResult(urlParamForm)">使用结果</el-button>
        <el-button @click="onCopy" class="copyBtn" :data-clipboard-text="urlParamForm.output">复制结果</el-button>
      </el-form-item>
      <el-form-item prop="output" label="结果">
        <el-input type="textarea" v-model="urlParamForm.output" placeholder="结果" readonly :autosize="{ minRows: 3 }"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</div>
  `,
  data() {
    return {
      urlForm: {
        input: '',
        output: '',
      },
      unicodeForm: {
        input: '',
        output: '',
      },
      urlParamForm: {
        input: '',
        output: '',
      },
    };
  },
  methods: {
    onUrlEncode() {
      if (!this.urlForm.input) {
        this.$message.error('请输入字符串');
        return;
      }
      this.urlForm.output = encodeURIComponent(this.urlForm.input);
    },
    onUrlDecode() {
      if (!this.urlForm.input) {
        this.$message.error('请输入字符串');
        return;
      }
      this.urlForm.output = decodeURIComponent(this.urlForm.input);
    },
    onUnicodeEncode() {
      if (!this.unicodeForm.input) {
        this.$message.error('请输入字符串');
        return;
      }
      this.unicodeForm.output = this.unicodeForm.input.split('').map((c) => {
        return '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0');
      }).join('');
    },
    onUnicodeDecode() {
      if (!this.unicodeForm.input) {
        this.$message.error('请输入字符串');
        return;
      }
      this.unicodeForm.output = this.unicodeForm.input.replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      });
    },
    onUrlParamToJson() {
      if (!this.urlParamForm.input) {
        this.$message.error('请输入字符串');
        return;
      }
      try {
        this.urlParamForm.output = JSON.stringify(this.parseUrlParam(this.urlParamForm.input), null, 2);
      } catch (e) {
        this.$message.error('解析失败');
      }
    },
    onJsonToUrlParam() {
      if (!this.urlParamForm.input) {
        this.$message.error('请输入字符串');
        return;
      }
      try {
        this.urlParamForm.output = this.stringifyUrlParam(JSON.parse(this.urlParamForm.input));
      } catch (e) {
        this.$message.error('解析失败');
      }
    },
    parseUrlParam(url) {
      const params = {};
      if (url.indexOf('?') > -1) {
        url = url.split('?')[1];
      }
      const paramArr = url.split('&');
      paramArr.forEach((item) => {
        const param = item.split('=');
        params[param[0]] = param[1];
      });
      return params;
    },
    stringifyUrlParam(obj) {
      return Object.keys(obj).map((key) => {
        return `${key}=${obj[key]}`;
      }).join('&');
    },
    onReset(form) {
      form.input = '';
      form.output = '';
    },
    onUseResult(form) {
      form.input = form.output;
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
  created() {
    this.urlForm.input = 'URL编码转换123';
    this.unicodeForm.input = 'Unicode编码转换123';
    this.urlParamForm.input = 'https://www.baidu.com/s?ie=utf-8&wd=hello';
  },
};

export default encodeTool;
