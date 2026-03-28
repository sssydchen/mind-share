import { ApiList } from '../../../request'

export const adminQuestionListApi: ApiList = {
  // Study Lists
  getQuestionList: ['GET', '/api/admin/questionlists/{questionListId}'],
  getQuestionLists: ['GET', '/api/admin/questionlists'],
  createQuestionList: ['POST', '/api/admin/questionlists'],
  deleteQuestionList: ['DELETE', '/api/admin/questionlists/{questionListId}'],
  updateQuestionList: ['PATCH', '/api/admin/questionlists/{questionListId}'],

  // Study Lists项
  getQuestionListItems: [
    'GET',
    '/api/admin/questionlist-items/{questionListId}',
  ],
  createQuestionListItem: ['POST', '/api/admin/questionlist-items'],
  deleteQuestionListItem: [
    'DELETE',
    '/api/admin/questionlist-items/{questionListId}/{questionId}',
  ],

  // 排序
  sortQuestionListItems: ['PATCH', '/api/admin/questionlist-items/sort'],
}

export const questionListApi: ApiList = {
  // Study Lists
  getQuestionListItems: ['GET', '/api/questionlist-items'],
}
