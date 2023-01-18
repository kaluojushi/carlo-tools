const downloader = {
  template: `
<div>
  <el-button type="basic" @click="handleDownload" :loading="loading" style="margin-bottom: 15px">下载文件</el-button>
</div>
  `,
  data() {
    return {
      loading: false,
    };
  },
  props: {
    content: {
      type: String,
      default: '',
      required: true,
    },
    fileName: {
      type: String,
      default: 'file',
      required: true,
    },
    fileType: {
      type: String,
      default: 'txt',
      required: true,
    },
  },
  methods: {
    handleDownload() {
      this.loading = true;
      this.$message.success("正在下载中……");
      const blob = new Blob([this.content], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.setAttribute('style', 'display:none');
      a.setAttribute('href', url);
      a.setAttribute('download', this.fileName + '.' + this.fileType);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.loading = false;
    },
  },
};

export default downloader;
