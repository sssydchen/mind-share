import { useState, useEffect } from 'react'
import { Avatar, Button, Input, List, message } from 'antd'
import {
  createComment,
  deleteComment,
  getComments,
} from '@/request/api/comment'
import { NoteComment } from '@/domain/note/types'
import { useUser } from '@/domain/user/hooks/useUser'
import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'

interface NoteCommentsProps {
  noteId: number
}

export function NoteComments({ noteId }: NoteCommentsProps) {
  const [comments, setComments] = useState<NoteComment[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const currentUser = useUser()

  // 加载评论列表
  const loadComments = async () => {
    try {
      const response = await getComments({ noteId })
      setComments(response.data.data ?? [])
    } catch (error) {
      message.error('Failed to load comments')
    }
  }

  // 提交评论
  const handleSubmit = async () => {
    if (!currentUser) {
      message.warning('Please sign in first')
      return
    }

    if (!content.trim()) {
      message.warning('Enter a comment')
      return
    }

    setLoading(true)
    try {
      await createComment({ noteId, content: content.trim() })
      message.success('Comment posted')
      setContent('')
      loadComments()
    } catch (error) {
      message.error('Failed to post comment')
    } finally {
      setLoading(false)
    }
  }

  // 删除评论
  const handleDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId)
      message.success('Deleted successfully')
      loadComments()
    } catch (error) {
      message.error('Delete failed')
    }
  }

  useEffect(() => {
    loadComments()
  }, [noteId])

  return (
    <div className="note-comments">
      <div className="comment-input">
        <Input.TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          maxLength={500}
          showCount
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{ marginTop: 8, float: 'right' }}
        >
          Post Comment
        </Button>
      </div>

      <List
        style={{ clear: 'both', marginTop: 16 }}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item
            actions={[
              comment.userId === Number(currentUser?.userId) && (
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(comment.commentId)}
                >
                  Delete
                </Button>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={currentUser?.avatarUrl} />}
              title={currentUser?.username || 'User'}
              description={
                <div>
                  <div>{comment.content}</div>
                  <div className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: enUS,
                    })}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}
