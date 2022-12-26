<script setup lang="ts">
  import { getCloudDiskList, delCloudDisk } from '@/apis/cloud'
  import type { TableColumnCtx } from 'element-plus'

  const total = ref<number>(0)
  const tableData = ref<CloudMusicInfo[]>([])
  const hasMore = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const deleteLoading = ref<boolean>(false)
  const current = ref<number>(1)
  const pageSize = ref<number>(30)
  const selectMusic = ref<CloudMusicInfo[]>([])
  const dialogTableVisible = ref<boolean>(false)

  const handleDelete = async () => {
    try {
      await ElMessageBox.confirm(`确定删除选中的云盘歌曲吗？`)
      deleteLoading.value = true
      const deleteList = selectMusic.value.map(music => music.songId).join(',')

      const { succIds, failIds } = await delCloudDisk('' + deleteList)
      const isSuccess = !failIds.length
      const message: string = isSuccess ? '删除成功' : !!succIds.length ? '部分歌曲删除失败' : '删除失败'
      ElMessage({ type: isSuccess ? 'success' : 'error', message })
      getList()
    } catch (error) {
    } finally {
      deleteLoading.value = false
    }
  }

  const formatter = (row: CloudMusicInfo, column: TableColumnCtx<any>, cellValue: any, index: number) => {
    const { property } = column
    switch (property) {
      case 'addTime':
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
      default:
        return cellValue.includes('未知') ? '未知' : cellValue || '未知'
    }
  }

  const getList = async () => {
    try {
      loading.value = true
      const res = await getCloudDiskList(pageSize.value, (current.value - 1) * pageSize.value)
      total.value = res.count
      tableData.value = res.data
      hasMore.value = res.hasMore
    } catch (error) {
    } finally {
      loading.value = false
      dialogTableVisible.value = false
    }
  }

  const handlePagingChange = (type: string, value: number) => {
    switch (type) {
      case 'size':
        pageSize.value = value
        break
      case 'current':
        current.value = value
        break
    }
    getList()
  }

  const handleSelectMusic = (selected: CloudMusicInfo[]) => {
    selectMusic.value = selected
  }

  const finished = () => {
    getList()
  }

  getList()
</script>

<template>
  <div class="cloud">
    <main>
      <!-- 按钮 -->
      <section class="buttons">
        <el-button type="primary" size="default" @click="getList()" :disabled="loading || deleteLoading">
          刷新云盘歌曲
        </el-button>
        <el-button
          type="success"
          size="default"
          @click="dialogTableVisible = true"
          :disabled="loading || deleteLoading"
        >
          上传歌曲到云盘
        </el-button>
        <el-button
          :disabled="!total || !selectMusic.length || loading"
          :loading="deleteLoading"
          type="danger"
          size="default"
          @click="handleDelete"
        >
          删除选中云盘歌曲
        </el-button>

        <Setting class="inline-block ml-auto" @refresh="getList" />
      </section>

      <!-- 列表 -->
      <el-table
        type="selection"
        :data="tableData"
        style="width: 100%"
        height="100%"
        stripe
        border
        v-loading="loading"
        @selection-change="handleSelectMusic"
      >
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column show-overflow-tooltip label="序号" type="index" width="60px" align="center" />
        <el-table-column
          show-overflow-tooltip
          label="歌名"
          min-width="150px"
          prop="songName"
          :formatter="formatter"
          sortable
        />
        <el-table-column
          show-overflow-tooltip
          label="歌手"
          prop="artist"
          :formatter="formatter"
          sortable
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="专辑"
          prop="album"
          :formatter="formatter"
          sortable
          align="center"
        />
        <el-table-column
          show-overflow-tooltip
          label="添加时间"
          prop="addTime"
          width="150px"
          :formatter="formatter"
          sortable
          align="center"
        />
      </el-table>

      <el-dialog v-model="dialogTableVisible" title="上传歌曲" @closed="getList">
        <Upload @finished="finished" />
      </el-dialog>

      <!-- 分页 -->
      <section class="paging">
        <el-pagination
          v-model:current-page="current"
          v-model:page-size="pageSize"
          :page-sizes="[30, 50, 100, 500, 1000]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handlePagingChange('size', $event)"
          @current-change="handlePagingChange('current', $event)"
        />
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .cloud {
    > main {
      @apply px-2 w-full h-screen flex flex-col;

      .buttons {
        @apply py-2 flex items-center;
      }

      .el-table {
        @apply flex-grow  rounded-md;
      }

      .paging {
        @apply py-2 flex justify-center items-center;
      }
    }
  }
</style>
