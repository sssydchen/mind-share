import { QuestionDetail, QuestionSummary } from '../../question'
import { UserQuestionStatus } from '../../question/types/service.ts'

export enum QuestionListType {
  COMMON_TYPE = 1, // 普通Study Lists
  TRAINING_CAMP_TYPE = 2, // 训练营专属Study Lists
}

export enum QuestionListParentNode {
  COMMON = -1,
  TRAINING_CAMP = -2,
}

/**
 * Study Lists实体
 */
export interface QuestionListEntity {
  questionListId: number
  name: string
  type: QuestionListType
  description: string
  createdAt: string
  updatedAt: string
}

/**
 * Study Lists项实体
 */
export interface QuestionListItemEntity {
  questionListId: number
  questionId: number
  rank: number
  createdAt: string
  updatedAt: string
}

/**
 * Study Lists分类实体
 */
export interface QuestionListCategory {
  key: number
  title: string
  questionListId: number | undefined
  children: QuestionListCategory[] | undefined
}

/**
 * Study Lists项详情 VO
 */
export interface QuestionListItemVO {
  questionListId: number
  question: QuestionSummary
  rank: number
}

export interface QuestionListItemUserVO {
  questionListId: number
  question: QuestionDetail
  rank: number
  userQuestionStatus: UserQuestionStatus
}

/**
 * 创建Study Listsbody实体
 */
export interface CreateOrUpDateQuestionListBody {
  name: string
  description: string
  type: number
}

/**
 * Study Lists排序服务 body 实体
 */
export interface SortQuestionListItemBody {
  questionListId: number
  questionIds: number[]
}

/**
 * Study Lists项查询参数
 */
export interface QuestionListItemQueryParams {
  questionListId: number | undefined
  page: number
  pageSize: number
}

/**
 * 抽屉操作类型
 */
export type QuestionListOptType = 'create' | 'update'
