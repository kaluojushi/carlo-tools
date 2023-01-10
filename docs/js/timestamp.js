const timestamp = {
  template: `
<div>
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>当前时间戳</span>
    </div>
      <el-form :inline="true" :model="current" label-width="90px">
        <el-form-item label="当前日期">
          <el-input v-model="current.date" placeholder="当前日期" readonly @click="onCopy">
            <i slot="suffix" class="copyBtn copyBtnHover el-icon-document-copy" :data-clipboard-text="current.date" @click="onCopy"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="当前时间戳">
          <el-input v-model="current.timestamp" placeholder="当前时间戳" readonly>
            <i slot="suffix" class="copyBtn copyBtnHover el-icon-document-copy" :data-clipboard-text="current.timestamp" @click="onCopy"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="毫秒时间戳">
          <el-input v-model="current.msTimestamp" placeholder="毫秒时间戳" readonly>
            <i slot="suffix" class="copyBtn copyBtnHover el-icon-document-copy" :data-clipboard-text="current.msTimestamp" @click="onCopy"></i>
          </el-input>
        </el-form-item>
      </el-form>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>时间戳转时间</span>
    </div>
    <el-form :inline="true" :model="toTime" label-width="90px">
      <el-form-item label="时间戳格式">
        <el-select v-model="toTime.type" placeholder="请选择时间戳格式" @change="onChange">
          <el-option label="秒" value="s"></el-option>
          <el-option label="毫秒" value="ms"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间戳">
        <el-input v-model="toTime.timestamp" placeholder="请输入时间戳" @keyup.enter.native="handleToTime"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="handleToTime">转换</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="toTime" label-width="90px">
      <el-form-item label="转换时间">
        <el-input v-model="toTime.date" readonly>
          <i slot="suffix" class="copyBtn copyBtnHover el-icon-document-copy" :data-clipboard-text="toTime.date" @click="onCopy"></i>
        </el-input>
      </el-form-item>
    </el-form>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>时间转时间戳</span>
    </div>
    <el-form :inline="true" :model="toTimestamp" label-width="90px">
      <el-form-item label="时间">
        <el-input v-model="toTimestamp.date" placeholder="请输入时间" @keyup.enter.native="handleToTimestamp"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="basic" @click="handleToTimestamp">转换</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="toTimestamp" label-width="90px">
      <el-form-item label="转换时间戳">
        <el-input v-model="toTimestamp.timestamp" readonly>
          <i slot="suffix" class="copyBtn copyBtnHover el-icon-document-copy" :data-clipboard-text="toTimestamp.timestamp" @click="onCopy"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="毫秒时间戳">
        <el-input v-model="toTimestamp.msTimestamp" readonly>
          <i slot="suffix" class="copyBtn copyBtnHover el-icon-document-copy" :data-clipboard-text="toTimestamp.msTimestamp" @click="onCopy"></i>
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
        时间戳是指格林威治时间 1970 年 01 月 01 日 00 时 00 分 00 秒（北京时间 1970 年 01 月 01 日 08 时 00 分 00 秒）起至现在的总秒数。
      </li>
      <li>
        时间戳（timestamp）是使用数字签名技术产生的数据，签名的对象包括了原始文件信息、签名参数、签名时间等信息。时间戳系统用来产生和管理时间戳，对签名对象进行数字签名产生时间戳，以证明原始文件在签名时间之前已经存在。
      </li>
    </ul>
  </el-card>
  
  <el-card class="vue-component-card">
    <div slot="header" class="vue-component-card-header">
      <span>不同语言的时间戳</span>
    </div>
    <div class="tipText">
      点击文本框可直接复制代码。
    </div>
    <el-table :data="differentLanguages" style="font-size: 16px; width: 100%">
      <el-table-column prop="language" label="语言" width="100" align="center"></el-table-column>
      <el-table-column prop="code" label="代码" align="center">
        <template slot-scope="scope">
          <div class="copyBtn" :data-clipboard-text="scope.row.code" @click="onCopy">
            <el-input type="textarea" v-model="scope.row.code" readonly></el-input>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
  `,
  data() {
    return {
      current: {
        date: new Date().toLocaleString(),
        timestamp: Math.floor(new Date().getTime() / 1000),
        msTimestamp: new Date().getTime(),
      },
      toTime: {
        type: 's',
        timestamp: Math.floor(new Date().getTime() / 1000),
        date: '',
      },
      toTimestamp: {
        date: new Date().toLocaleString(),
        timestamp: '',
        msTimestamp: '',
      },
      differentLanguages: [
        { language: 'MYSQL', code: 'UNIX_TIMESTAMP()' },
        { language: 'PHP', code: 'echo time()' },
        { language: 'Java', code: '(int) (System.currentTimeMillis() / 1000)' },
        { language: 'JavaScript', code: 'Math.round(new Date().getTime() / 1000)' },
        { language: 'Shell', code: 'date +%s' },
        { language: 'SQLite', code: 'SELECT strftime("%s", "now")' },
        { language: 'Python', code: 'import time\ntime.time()' },
      ],
    };
  },
  methods: {
    getCurrentTime() {
      const date = new Date();
      this.current.date = date.toLocaleString();
      this.current.timestamp = Math.floor(date.getTime() / 1000);
      this.current.msTimestamp = date.getTime();
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
    onChange(type) {
      if (type === 's') {
        this.toTime.timestamp = Math.floor(new Date().getTime() / 1000);
      } else {
        this.toTime.timestamp = new Date().getTime();
      }
    },
    handleToTime() {
      let timestamp = this.toTime.timestamp;
      if (this.toTime.type === 's') {
        timestamp *= 1000;
      }
      this.toTime.date = new Date(timestamp).toLocaleString();
    },
    handleToTimestamp() {
      const date = new Date(this.toTimestamp.date);
      this.toTimestamp.timestamp = Math.floor(date.getTime() / 1000);
      this.toTimestamp.msTimestamp = date.getTime();
    },
  },
  created() {
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }
};

export default timestamp;
