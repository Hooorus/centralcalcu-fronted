<template>
  <div id="app">
    <div id="layout-basic">
      <a-layout-content>
        <h2>当前标题名称: {{ this.current_title }}</h2>
        <h2>当前最大投票数量: {{ this.scoreLimit }}</h2>
        <a-divider>评分区</a-divider>
        (0为未投，1为已投；对已投票的行点击投票会取消其投票)
        <br/>
        <br/>
        <a-select :option="track_options" @change="queryResultByTrack" size="large" style="width: 300px"
                  placeholder="请选择需要评分的赛道">
          <a-select-option :key="item.id" v-for="item in track_options" :value="item.trackName">
            {{ item.trackName }}
          </a-select-option>
        </a-select>
        <br/>
        <br/>
        <!--    旧版锁定功能-->
        <!--    <a-button type="primary" @click="queryResultByTrack">-->
        <!--      刷新数据-->
        <!--    </a-button>-->
        <a-table :data-source="tableData" :pagination=false :bordered=true :columns="columns">
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
          <!--      操作区-->
          <template slot="operation" slot-scope="text, record,index">
            <a-button type="primary" :disabled=vote_button_disabled @click="vote(index)">投票</a-button>
          </template>
        </a-table>
        <br/>
        <a-button type="primary" @click="showModal" :loading=btn_loading>提交投票</a-button>
        <a-modal
            title="确认提交？"
            :visible="confirmVisible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
        >
          <p>{{ ModalText }}</p>
        </a-modal>
      </a-layout-content>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import api from "@/api/index"

export default {
  name: "Fronted",
  data() {
    return {
      track_options: [],

      ModalText: '提交后无法修改',
      confirmVisible: false,
      confirmLoading: false,

      btn_loading: false,
      pageSize: 500,

      vote_button_disabled: false,

      current_title: "",
      scoreLimit: 0,

      tableData: [],
      searchText: '',
      searchInput: null,
      searchedColumn: '',

      resultData: "",
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
          title: '是否投票',
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
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          scopedSlots: {customRender: 'operation'},
        },
      ]
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.getVote();
  },
  methods: {
    //获取当前投票值
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
        console.log('vote_limit=>', res.data.data);
        this.scoreLimit = res.data.data
      })
    },
    //警告框
    showModal() {
      this.confirmVisible = true;
    },
    handleOk(e) {
      this.ModalText = '提交后无法修改';
      this.confirmLoading = true;
      this.submitResult();
      this.confirmVisible = false;
      this.confirmLoading = false;
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.confirmVisible = false;
    },

    //提交投票
    async submitResult() {
      this.btn_loading = true
      this.resultData = this.tableData
      await Axios.request({
        method: 'POST',
        url: api.prefixURL + api.frontURL + api.setPeopleScore,
        data: this.resultData,
      }).then(res => {
        console.log('res.data=>', res.data.data);
        if (res.data.status == 200) {
          this.$notification.success({
            message: "提交成功！",
            description: res.data.msg + "接下来将自动刷新页面，请勿操作！"
          })
          window.setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          this.$notification.success({
            message: "提交失败！请刷新页面重新填写！",
            description: res.data.msg
          })
        }
        this.btn_loading = false
        this.init();
      })
    },
    //投票
    vote(value) {
      console.log("投票成功!操作行：" + value)
      if (this.tableData[value].score == 0) {
        this.tableData[value].score += 1;
      } else {
        this.tableData[value].score = 0;
      }
      let sumScore = 0;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].score > 0) {
          sumScore++;
          if (sumScore === this.scoreLimit) {
            this.vote_button_disabled = true;
          }
        }
      }
      this.$message.success('投票成功，当前剩余：' + (this.scoreLimit - sumScore) + '票');
      console.log(this.tableData)
    },
    //结果查询
    async queryResultByTrack(value) {
      if (value == '' || value == ' ') {
        this.$message.error("请填写赛道名");
      } else {
        const formData = new FormData();
        formData.append('track', value.trim())
        await Axios.request({
          url: api.prefixURL + api.frontURL + api.getPeopleByTrack,
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
    // //数据查询
    // async queryResultByTrack() {
    //   const formData = new FormData();
    //   console.log(this.current_title);
    //   var str = this.current_title;
    //   formData.append('track', str)
    //   await Axios.request({
    //     url: "http://49.235.113.96:8099/rank_page/front/get_people_by_track",
    //     method: 'POST',
    //     data: formData,
    //   }).then(res => {
    //     console.log("str: " + str)
    //     this.tableData = res.data.data
    //     console.log(res.data.data)
    //     //结果集处理
    //     if (res.data.status != 200) {
    //       this.$message.error('查询失败！');
    //     } else {
    //       this.$message.success("查询成功！")
    //     }
    //   })
    // },
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
      });

      //查询赛道
      await Axios.request({
        method: "POST",
        url: api.prefixURL + api.frontURL + api.getTrackAll,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log("track.data=> ", res.data.data);
        this.track_options = res.data.data;
        console.log("track_options=> ", this.track_options)
      })
    },
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  margin-top: 0px;
}



</style>
