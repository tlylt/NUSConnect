import { nanoid } from 'nanoid'
import { renderMdToHtml, showCurrentDateTime, timeSince } from '../common/Util'
import { Post, updatePostLikes } from './ForumAPI'
import TextContainer from './TextContainer'
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa'
import { useState } from 'react'
import { toast } from 'react-toastify'

const PostMain = ({ post }: { post: Post }): JSX.Element => {
  const currentPost = post
  const tags = currentPost.tags
  const lastEdited = timeSince(currentPost.edited_date)
  const [upVotes, setUpVotes] = useState(currentPost.up_votes)
  const [liked, setLiked] = useState(false)

  return (
    <TextContainer>
      <a className="flex items-center border-b border-grey-200 flex-grow py-2 ">
        <div className="flex justify-between px-2 flex-grow text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-100">
          <span>{currentPost.author_id}</span>
          <span>
            {lastEdited} ago {currentPost.is_edited ? '(edited)' : ''}
          </span>
        </div>
      </a>
      <div className="px-6 py-4">
        <h2 className="text-xl font-medium text-indigo-500 dark:text-indigo-400 mb-2">
          {currentPost.title}
        </h2>
        <p className="leading-relaxed mb-6">
          {
            <span
              className="prose-sm lg:prose dark:text-white font-normal"
              dangerouslySetInnerHTML={{ __html: renderMdToHtml(currentPost.content) }}
            />
          }
        </p>
        <div className="flex items-center">
          <div className="flex flex-wrap justify-start items-center">
            {tags.map((tag) => (
              <div className="mr-2 mb-1">
                <div
                  key={nanoid()}
                  className="text-xs py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                  #{tag}
                </div>
              </div>
            ))}
          </div>
          <button
            disabled={liked}
            onClick={() => {
              toast.success('Liked!', {
                autoClose: 3000,
              })
              updatePostLikes(upVotes + 1, currentPost.id)
              setUpVotes(upVotes + 1)
              setLiked(true)
            }}
            className="text-gray-400 mr-3 inline-flex items-center ml-auto text-sm pr-3 py-1 border-r-2 border-gray-200">
            <FaRegThumbsUp color={`${liked ? 'black' : ''}`} className="w-4 h-4 mx-2" />
            {upVotes}
          </button>
          <span className="text-gray-400 inline-flex items-center text-sm">
            <FaRegComment className="w-4 h-4 mr-2" />6
          </span>
        </div>
      </div>
    </TextContainer>
  )
}

export default PostMain
