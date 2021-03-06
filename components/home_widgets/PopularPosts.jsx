import useSWR from 'swr'
import PostList from '../postswidget/PostList'
import Skeleton from '@material-ui/lab/Skeleton'
import Box from '@material-ui/core/Box'

export default function PopularPosts(props) {
  let per_page = props.per_page ? props.per_page : '4'
  let paged = props.paged ? props.paged : '1'

  const { data, error } = useSWR(`/api/popularposts?per_page=${per_page}&page=${paged}`)

  if (error) return <div>failed to load</div>
  if (!data)
    return (
      <>
        {Array.apply(null, { length: 4 }).map((e, i) => (
          <div style={{ width: '100%' }} key={i}>
            <Box display="flex" mb="20px" flexWrap="nowrap">
              <Box pr={2}>
                <Skeleton animation="wave" variant="rect" width={86} height={60} />
              </Box>
              <Box width="100%">
                <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={15} width="80%" style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={15} width="80%" />
              </Box>
            </Box>
          </div>
        ))}
      </>
    )
  return (
    <>
      {data.length > 0 &&
        data.map((post) => {
          const img =
            post.featured_img != ''
              ? post.featured_img
              : 'https://cdn.statically.io/img/' +
                process.env.S3_URL +
                post.ylc_news_data.featured_image
          return (
            <PostList
              id={post.id}
              title={post.title}
              thumbnail={img + '?h=60&q=50'}
              permalink={post.permalink}
              key={'PopularPost-' + post.id}
            />
          )
        })}
    </>
  )
}
