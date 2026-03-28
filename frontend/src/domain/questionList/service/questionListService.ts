import { httpClient } from '../../../request'
import {
  adminQuestionListApi,
  questionListApi,
} from '../api/questionListApi.ts'
import {
  CreateOrUpDateQuestionListBody,
  QuestionListEntity,
  QuestionListItemQueryParams,
  QuestionListItemUserVO,
  QuestionListItemVO,
  SortQuestionListItemBody,
} from '../types/types.ts'

export const adminQuestionListService = {
  /**
   * 获取Study Lists服务
   */
  getQuestionListByIdService: (questionListId: number) => {
    return httpClient.request<QuestionListEntity>(
      adminQuestionListApi.getQuestionList,
      {
        pathParams: [questionListId],
      },
    )
  },

  /**
   * 获取Study Lists列表服务
   */
  getQuestionListService: () => {
    return httpClient.request<QuestionListEntity[]>(
      adminQuestionListApi.getQuestionLists,
    )
  },

  /**
   * 创建Study Lists服务
   */
  createQuestionListService: (params: CreateOrUpDateQuestionListBody) => {
    return httpClient.request<{
      questionListId: number
    }>(adminQuestionListApi.createQuestionList, {
      body: params,
    })
  },

  /**
   * 删除Study Lists服务
   */
  deleteQuestionListService: (questionListId: number) => {
    return httpClient.request<{
      questionListId: number
    }>(adminQuestionListApi.deleteQuestionList, {
      pathParams: [questionListId],
    })
  },

  /**
   * 更新Study Lists信息服务
   */
  updateQuestionListService: (
    questionListId: number,
    params: CreateOrUpDateQuestionListBody,
  ) => {
    return httpClient.request<null>(adminQuestionListApi.updateQuestionList, {
      pathParams: [questionListId],
      body: params,
    })
  },

  /**
   * 获取Study Lists项列表服务
   */
  getQuestionListItemService: (questionListId: number) => {
    return httpClient.request<QuestionListItemVO[]>(
      adminQuestionListApi.getQuestionListItems,
      {
        pathParams: [questionListId],
      },
    )
  },

  /**
   * 创建Study Lists项
   */
  createQuestionListItemService: (
    questionListId: number,
    questionId: number,
  ) => {
    return httpClient.request<{
      rank: number
    }>(adminQuestionListApi.createQuestionListItem, {
      body: {
        questionListId,
        questionId,
      },
    })
  },

  /**
   * 删除Study Lists项
   */
  deleteQuestionListItemService: (
    questionListId: number,
    questionId: number,
  ) => {
    return httpClient.request(adminQuestionListApi.deleteQuestionListItem, {
      pathParams: [questionListId, questionId],
    })
  },

  /**
   * Study Lists项排序
   */
  sortQuestionListItemService: (body: SortQuestionListItemBody) => {
    return httpClient.request(adminQuestionListApi.sortQuestionListItems, {
      body: body,
    })
  },
}

export const userQuestionListService = {
  /**
   * 获取Study Lists项列表
   */
  getQuestionListByIdService: (query: QuestionListItemQueryParams) => {
    return httpClient.request<QuestionListItemUserVO[]>(
      questionListApi.getQuestionListItems,
      {
        queryParams: query,
      },
    )
  },
}
