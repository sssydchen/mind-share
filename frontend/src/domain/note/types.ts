/**
 * 笔记评论
 */
export interface NoteComment {
  commentId: number
  noteId: number
  userId: number
  parentId?: number
  content: string
  likeCount?: number
  replyCount?: number
  createdAt: string
  updatedAt: string
}
