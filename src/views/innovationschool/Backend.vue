<template>
  <v-app>
    <a-divider>修改区</a-divider>
    <h2>当前标题名称: {{ this.current_title }}</h2>
    <h2>当前单人最大投票量: {{ this.current_vote }}</h2>
    <a-input-search
        placeholder="请输入需要修改的标题"
        enter-button="修改标题"
        style="width: 530px"
        size="large"
        @search="setTitle"
    />
    <br/>
    <a-input-search
        placeholder="请输入需要修改的单人最大投票量"
        enter-button="修改投票"
        style="width: 530px"
        size="large"
        @search="setVote"
    />
    <a-divider>文件上传区</a-divider>
    <a-input-search
        placeholder="请输入上传表格的赛道名"
        enter-button="保存"
        style="width: 300px"
        size="large"
        @search="setTrack"
    />
    <div class="clearfix">
      <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
        <a-button :disabled="upload_disabled" size="large">
          <a-icon type="upload"/>
          上传excel名单(从头列开始向下排序)
        </a-button>
      </a-upload>
      <a-button
          type="primary"
          :disabled="fileList.length === 0"
          :loading="uploading"
          style="margin-top: 16px"
          size="large"
          @click="handleUpload"
      >
        {{ uploading ? 'Uploading,please wait a minute' : 'Start Upload' }}
      </a-button>
    </div>
    <a-divider>数据显示区</a-divider>
    <a-row type="flex">
      <a-col :span="12">
        <a-input-search
            placeholder="请输入所查询的赛道名，清空再查询为查询全部"
            enter-button="查询"
            style="width: 500px"
            size="large"
            @search="queryResultByTrack"
        />
      </a-col>
      <a-col :span="12">
        <a-input-search
            placeholder="请输入所删除的赛道名"
            style="width: 500px"
            size="large"
            @search="deleteResultByTrack"
        >
          <a-button slot="enterButton" type="danger">
            删除
          </a-button>
        </a-input-search>
      </a-col>
    </a-row>
    <a-modal
        title="请确认您的操作"
        :visible="alert_visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
      <a-input-search placeholder="删除数据" @search="changeDeleteInputConfirm">
        <a-button slot="enterButton" type="primary">
          保存
        </a-button>
      </a-input-search>
    </a-modal>
    <br/>
    <a-table :data-source="tableData" :bordered=true :pagination="false" :columns="columns">
      <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
      >
        <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
            v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
          >{{ fragment }}</mark
          >
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
  </v-app>
</template>
<script>

import Axios from "axios";
import api from "@/api/index"

export default {
  name: "Backend",
  data() {
    return {
      changeDeleteInputStandardText: "删除数据",
      changeDeleteInputConfirmText: "",
      ModalText: '请在输入框内填写如下内容：删除数据',
      alert_visible: false,
      confirmLoading: false,

      upload_disabled: true,
      deleteTrack: "",

      default_title_name: "",
      default_vote: "",
      current_title: "",
      current_vote: "",
      track: "",
      fileList: [],
      uploading: false,

      tableData: [],
      searchText: '',
      searchInput: null,
      searchedColumn: '',

      columns: [
        {
          title: '名字  ',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.name
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: '得分',
          dataIndex: 'score',
          key: 'score',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.score
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        },
        {
          title: '赛道',
          dataIndex: 'track',
          key: 'track',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender',
          },
          onFilter: (value, record) =>
              record.track
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          },
        }]
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.getVote();
  },
  methods: {
    // ————————————删除弹窗警告区域——————————
    showModal() {
      this.alert_visible = true;
    },
    async handleOk(value) {
      if (this.changeDeleteInputStandardText === this.changeDeleteInputConfirmText) {
        this.confirmLoading = true;
        // ————————————发删除请求————————————
        console.log("deleteTrack: " + this.deleteTrack)
        const formData = new FormData();
        formData.append('track', this.deleteTrack)
        await Axios.request({
          url: api.prefixURL + api.backendURL + api.deletePeopleByTrack,
          method: 'POST',
          data: formData,
        }).then(res => {
          this.tableData = res.data.data
          console.log(res.data)
          //结果集处理
          if (res.data.status == 500) {
            this.$message.error('删除失败！');
          } else if (res.data.status == 200) {
            this.$message.success('删除成功！');
          }
        })
        // ————————————延时————————————
        setTimeout(() => {
          this.alert_visible = false;
          this.confirmLoading = false;
        }, 1000);
      } else {
        this.$message.error("请正确填写")
      }
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.alert_visible = false;
    },
    changeDeleteInputConfirm(e) {
      this.changeDeleteInputConfirmText = e;
      console.log(this.changeDeleteInputConfirmText)
    },
    // ————————————删除弹窗警告区域——————————
    //表格方法
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },

    //查询全部
    async queryResultAll() {
      await Axios.request({
        url: api.prefixURL + api.backendURL + api.getPeopleAll,
        method: 'POST',
      }).then(res => {
        this.tableData = res.data.data
        console.log(res.data)
        //结果集处理
        if (res.data.status != 200) {
          this.$message.error('查询失败！');
        } else {
          this.$message.success('查询成功！');
        }
      })
    },
    //结果查询
    async queryResultByTrack(value) {
      if (value == '' || value == ' ') {
        this.queryResultAll()
      } else {
        const formData = new FormData();
        formData.append('track', value.trim())
        await Axios.request({
          url: api.prefixURL + api.backendURL + api.getPeopleByTrack,
          method: 'POST',
          data: formData,
        }).then(res => {
          this.tableData = res.data.data
          console.log(res.data)
          //结果集处理
          if (res.data.status != 200) {
            this.$message.error('查询失败！');
          } else {
            this.$message.success('查询成功！');
          }
        })
      }
    },
    //删除赛道
    async deleteResultByTrack(value) {
      //删除赛道
      if (value.trim() == null || value.trim() == "") {
        this.$message.error("请输入有效赛道名")
      } else {
        this.deleteTrack = value.trim()
        this.showModal()
      }
    },

    setTrack(value) {
      if (value.trim() == "" || value.trim() == null) {
        this.$message.error("请输入文字！");
      } else {
        this.track = value
        this.$message.success("保存成功！" + this.track);
        if (this.upload_disabled === true) {
          this.upload_disabled = false
        }
      }
    },

    //文件上传
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    async handleUpload() {
      const {fileList} = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('file', file);
        formData.append('track', this.track)
        formData.append('col_num', 9999)
      });
      this.uploading = true;

      // You can use any AJAX library you like
      console.log(formData)
      await Axios.request({
        url: api.prefixURL + api.backendURL + api.uploadExcel,
        method: 'POST',
        data: formData,
      }).then(res => {
        console.log('res.data=>', res.data.data);
        if (res.data.status == 200) {
          this.$notification.success({
            message: "文件上传成功！",
            description: "接下来将自动刷新页面，请勿操作！"
          })
          window.setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.$notification.success({
            message: "文件上传失败！请刷新页面重新填写！",
            description: res.data.msg
          })
        }
      })
      this.uploading = false;
    },
    //初始化查询标题
    async init() {
      //组装参数
      let requestParam = new FormData()
      requestParam.append("title_id", "title_name")
      await Axios.request({
        method: 'GET',
        url: api.prefixURL + api.frontURL + api.getTitleName,
        data: requestParam,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log('res.data=>', res.data.data);
        this.current_title = res.data.data
      })
    },
    async getVote() {
      //组装参数
      let requestParam = new FormData()
      requestParam.append("vote_id", "vote_number")
      await Axios.request({
        method: 'GET',
        url: api.prefixURL + api.frontURL + api.getVoteNumber,
        data: requestParam,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log('res.data=>', res.data.data);
        this.current_vote = res.data.data
      })
    },
    //设置标题
    async setTitle(value) {
      value = value.trim()
      console.log(value);
      this.default_title_name = {
        "id": "title_name",
        "name": value
      };
      await Axios.request({
        method: 'POST',
        url: api.prefixURL + api.backendURL + api.setTitleName,
        data: this.default_title_name,
      }).then(res => {
        console.log('res.data=>', res.data.data);
        if (res.data.status == 200) {
          this.$message.success(res.data.data);
        } else {
          this.$message.error(res.data.data);
        }
        this.init();
      })
    },
    //设置标题
    async setVote(value) {
      value = value.trim()
      console.log(value);
      this.default_vote = {
        "id": "vote_number",
        "limitMax": value
      };
      await Axios.request({
        method: 'POST',
        url: api.prefixURL + api.backendURL + api.setVoteNumber,
        data: this.default_vote,
      }).then(res => {
        console.log('res.data=>', res.data.data);
        if (res.data.status == 200) {
          this.$message.success(res.data.data);
        } else {
          this.$message.error(res.data.data);
        }
        this.init();
        this.getVote();
      })
    },
  },
};
</script>
<style>


</style>
