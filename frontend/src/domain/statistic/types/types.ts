/**
 * 统计信息接口，包含Login、Sign Up、笔记等统计数据
 */
export interface StatisticEntity {
  /**
   * 主键 ID
   */
  id: number

  /**
   * 当天Login次数
   */
  loginCount: number

  /**
   * 当天Sign Up人数
   */
  registerCount: number

  /**
   * 累计Sign Up总人数
   */
  totalRegisterCount: number

  /**
   * 当天笔记数量
   */
  noteCount: number

  /**
   * 当天提交的笔记数量
   */
  submitNoteCount: number

  /**
   * 累计笔记总数量
   */
  totalNoteCount: number

  /**
   * 统计日期
   */
  date: string // TypeScript 使用 string 表示日期时间
}
