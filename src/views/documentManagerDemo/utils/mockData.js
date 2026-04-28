// Mock 数据生成器

const categories = [
  { id: 'c1', name: '产品文档' },
  { id: 'c2', name: '技术文档' },
  { id: 'c3', name: '需求文档' },
  { id: 'c4', name: '运维文档' },
  { id: 'c5', name: '测试文档' },
  { id: 'c6', name: '用户手册' }
]

const tagOptions = [
  { name: '全部', value: 'all', color: 'default' },
  { name: 'PDF', value: 'pdf', color: 'red' },
  { name: 'Word', value: 'docx', color: 'blue' },
  { name: 'Excel', value: 'xlsx', color: 'green' },
  { name: 'PPT', value: 'pptx', color: 'orange' },
  { name: '图片', value: 'image', color: 'purple' },
  { name: '压缩包', value: 'zip', color: 'magenta' }
]

const tagColors = ['red', 'blue', 'green', 'orange', 'purple', 'magenta', 'geekblue', 'gold']

function randomTags() {
  const count = Math.floor(Math.random() * 3) + 1
  const shuffled = [...tagColors].sort(() => 0.5 - Math.random())
  const result = []
  for (let i = 0; i < count; i++) {
    result.push({
      name: ['重要', '2024', '季度', '机密', '参考', '归档'][Math.floor(Math.random() * 6)],
      color: shuffled[i]
    })
  }
  return result
}

const mockDocuments = [
  {
    id: 'doc_001',
    name: '2024年产品路线图.pdf',
    type: 'pdf',
    size: 2048576,
    description: '2024年Q1-Q4产品路线图，包含核心功能规划和里程碑节点',
    category: '产品文档',
    tags: [{ name: '重要', color: 'red' }, { name: '2024', color: 'blue' }],
    liked: false,
    collected: true
  },
  {
    id: 'doc_002',
    name: '系统架构设计文档.docx',
    type: 'docx',
    size: 5242880,
    description: '微服务架构设计文档，包含模块划分、接口定义和技术选型',
    category: '技术文档',
    tags: [{ name: '机密', color: 'orange' }],
    liked: true,
    collected: false
  },
  {
    id: 'doc_003',
    name: 'Q1财务数据统计.xlsx',
    type: 'xlsx',
    size: 1048576,
    description: '2024年第一季度财务数据汇总，包含收入支出和利润分析',
    category: '运维文档',
    tags: [{ name: '机密', color: 'orange' }, { name: '季度', color: 'green' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_004',
    name: '用户需求调研报告.pptx',
    type: 'pptx',
    size: 8388608,
    description: '针对企业用户的调研报告，包含痛点分析和功能建议',
    category: '需求文档',
    tags: [{ name: '重要', color: 'red' }],
    liked: false,
    collected: true
  },
  {
    id: 'doc_005',
    name: '数据库设计规范.pdf',
    type: 'pdf',
    size: 1536000,
    description: 'MySQL数据库设计规范，包含命名约定、索引设计和优化建议',
    category: '技术文档',
    tags: [{ name: '参考', color: 'purple' }],
    liked: true,
    collected: true
  },
  {
    id: 'doc_006',
    name: 'API接口文档.docx',
    type: 'docx',
    size: 3145728,
    description: 'RESTful API接口文档，包含所有接口的请求响应格式',
    category: '技术文档',
    tags: [{ name: '参考', color: 'purple' }, { name: '归档', color: 'magenta' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_007',
    name: '产品功能清单.xlsx',
    type: 'xlsx',
    size: 716800,
    description: '所有已上线和规划中的功能清单，按模块分类',
    category: '产品文档',
    tags: [{ name: '2024', color: 'blue' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_008',
    name: '系统部署手册.pdf',
    type: 'pdf',
    size: 2621440,
    description: '生产环境部署手册，包含Docker、K8s和常见问题处理',
    category: '运维文档',
    tags: [{ name: '重要', color: 'red' }, { name: '归档', color: 'magenta' }],
    liked: true,
    collected: false
  },
  {
    id: 'doc_009',
    name: '测试用例汇总.xlsx',
    type: 'xlsx',
    size: 1843200,
    description: '全量测试用例汇总，覆盖功能测试和性能测试场景',
    category: '测试文档',
    tags: [{ name: '参考', color: 'purple' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_010',
    name: '新功能介绍.pptx',
    type: 'pptx',
    size: 12582912,
    description: 'V2.0新功能介绍PPT，包含20+新功能详细说明',
    category: '产品文档',
    tags: [{ name: '重要', color: 'red' }, { name: '2024', color: 'blue' }],
    liked: true,
    collected: true
  },
  {
    id: 'doc_011',
    name: '用户操作手册.pdf',
    type: 'pdf',
    size: 4194304,
    description: '终端用户操作手册，包含所有功能的图文说明',
    category: '用户手册',
    tags: [{ name: '归档', color: 'magenta' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_012',
    name: '项目周报_第12周.docx',
    type: 'docx',
    size: 512000,
    description: '2024年第12周项目进度周报，包含本周完成和下周计划',
    category: '需求文档',
    tags: [{ name: '季度', color: 'green' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_013',
    name: '服务器监控截图.png',
    type: 'image',
    size: 2048000,
    description: '生产服务器监控截图，包含CPU、内存和磁盘使用情况',
    category: '运维文档',
    tags: [{ name: '重要', color: 'red' }],
    liked: false,
    collected: false
  },
  {
    id: 'doc_014',
    name: '代码审查清单.xlsx',
    type: 'xlsx',
    size: 358400,
    description: 'Code Review检查清单，包含代码规范和安全漏洞检测项',
    category: '技术文档',
    tags: [{ name: '参考', color: 'purple' }],
    liked: true,
    collected: true
  },
  {
    id: 'doc_015',
    name: '项目资料汇总.zip',
    type: 'zip',
    size: 52428800,
    description: '全年项目资料打包，包含需求、设计、开发、测试所有文档',
    category: '需求文档',
    tags: [{ name: '重要', color: 'red' }, { name: '机密', color: 'orange' }],
    liked: false,
    collected: false
  }
]

function getMockData() {
  return {
    documents: mockDocuments,
    categories: categories,
    tagOptions: tagOptions
  }
}

function filterDocuments({ keyword, fullText, segment, searchType, tags, category, sortField, sortOrder, page, pageSize }) {
  let result = [...mockDocuments]

  // 关键词搜索
  if (keyword) {
    const kw = keyword.toLowerCase()
    if (searchType === 'description') {
      // 只搜索描述
      result = result.filter(doc => doc.description.toLowerCase().includes(kw))
    } else if (searchType === 'name') {
      // 只搜索名称
      result = result.filter(doc => doc.name.toLowerCase().includes(kw))
    } else {
      // 全部：搜索名称、描述、分类
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(kw) ||
        doc.description.toLowerCase().includes(kw) ||
        doc.category.toLowerCase().includes(kw)
      )
    }
  }

  // 标签筛选（多选）
  if (tags && Array.isArray(tags) && !tags.includes('all') && tags.length > 0) {
    result = result.filter(doc => tags.includes(doc.type))
  }

  // 分类筛选
  if (category) {
    result = result.filter(doc => doc.category === category)
  }

  // 排序
  if (sortField) {
    result.sort((a, b) => {
      let valA = a[sortField]
      let valB = b[sortField]

      if (sortField === 'size') {
        valA = a.size
        valB = b.size
      } else if (typeof valA === 'string') {
        valA = valA.toLowerCase()
        valB = valB.toLowerCase()
      }

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1
      } else {
        return valA < valB ? 1 : -1
      }
    })
  }

  // 分页
  const total = result.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = result.slice(start, end)

  return {
    list,
    total,
    page,
    pageSize
  }
}

export {
  getMockData,
  filterDocuments,
  categories,
  tagOptions
}
