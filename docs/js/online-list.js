const onlineList = {
  template: `
<div>
  <el-row :gutter="15">
    <el-col :xl="4" :xs="24" :sm="12" :md="8" :lg="6" v-for="item in list" :key="item.link" style="margin-bottom: 15px">
      <el-card shadow="hover">
        <div slot="header" style="height: 25px;">
          <el-link :href="'#/online/' + item.link" target="_blank" type="primary" :underline="true" style="font-size: 20px; font-weight: bold">
            {{ item.name }}
          </el-link>
        </div>
        <div style="height: 50px;">
          {{ item.description }}
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
  `,
  data() {
    return {

    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true,
    }
  },
  methods: {

  }
};

export default onlineList;
