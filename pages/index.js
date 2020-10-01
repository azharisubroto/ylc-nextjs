
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import { spacing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import HorizontalScroll from '@/components/HorizontalScroll'
import HeroCard from '@/components/HeroCard'


const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}))

const Home = (data) => {
  const classes = useStyles()
  const posts = data.data;

  return (
    <>
      <Head>
          <title>Your Life Choices</title>
      </Head>

      <CssBaseline />

      <main id="site-content">

          <Box pt={3}>
            <HorizontalScroll>
              {posts.length > 0 ? posts.map(post => (
              <article className="item" key={'slider-'+post.id}>
                <HeroCard
                  thumbnail={post.featured_img}
                  title={post.title}
                />
              </article>
              )) : ''}
            </HorizontalScroll>
          </Box>

          <style jsx>{`
            .item {
              flex: 0 0 auto;
              padding: 0 15px;
            }
          `}</style>
          
          {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        </main>
    </>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch('https://azhdev.com/wp-json/ylc/v1/posts?per_page=10')
  const data = await res.json()

  // Pass data to the page via props
  return { 
    props: { data },
    revalidate: 300,
  }
}

export default Home