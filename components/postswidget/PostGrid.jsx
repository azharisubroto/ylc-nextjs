import Link from 'next/link'

/**
 * PostGrid
 * @param {*} props id, title, thumbnail, permalink
 */

export default function PostGrid(props) {
  let thumbnail = props.thumbnail
  let catLink = props.categories.slug
  let catName = props.categories.name
  let maxWidth = props.maxWidth ? props.maxWidth : 270
  return (
    <>
      <article className={'post-grid post-' + props.id} style={{ maxWidth: maxWidth }}>
        <div className="post-grid--thumb">
          <Link href={catLink}>
            <a className="cat-badge">
              <span dangerouslySetInnerHTML={{ __html: catName }} />
            </a>
          </Link>
          {props.thumbnail != null && (
            <Link href={props.permalink}>
              <a>
                <img
                  src={thumbnail}
                  alt={props.title}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/static/img/photo.svg'
                  }}
                  width="270"
                  height="140"
                  loading="lazy"
                />
              </a>
            </Link>
          )}
        </div>
        <div className="postDetail">
          <h4>
            <Link href={props.permalink}>
              <a>{props.title}</a>
            </Link>
          </h4>
          <p>{props.blurb}</p>
        </div>
      </article>

      <style jsx>{`
        .post-grid {
          .post-grid--thumb {
            width: 100%;
            height: 140px;
            overflow: hidden;
            margin-bottom: 10px;
            overflow: hidden;
            background: #e0e0e0;
            border-radius: 8px;
            line-height: 0;
            position: relative;

            .cat-badge {
              position: absolute;
              top: 0;
              left: 0;
              height: 20px;
              line-height: 20px;
              background: #4f4f4f;
              color: #fff;
              display: inline-block;
              padding: 0 5px;
              font-size: 12px;
            }

            img {
              object-fit: cover !important;
              width: 100% !important;
              height: 100% !important;
            }
          }
          h4 {
            font-size: 18px;
            margin-top: 10px;
            line-height: 22px;
            margin-bottom: 10px;
          }
          p {
            margin-top: 0;
            font-size: 15px;
            line-height: 22px;
          }
          .postDetail {
            padding: 0 10px;
          }
        }
      `}</style>
    </>
  )
}
