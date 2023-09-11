import CommentItem from "./CommentItem"

interface CommentFeedProps {
    comment? : Record<string, any>[]
}

const CommentFeed : React.FC<CommentFeedProps> = ({comment = []}) => {
    return (
        <>
            {comment.map((comment) => (
                <CommentItem key={comment.id} data={comment}  />
            ))}
        </>
    )
}

export default CommentFeed