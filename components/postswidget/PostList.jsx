import Link from 'next/link'

/**
 * PostList
 * @param {*} props id, title, thumbnail, permalink
 */
export default function PostList(props) {
  return (
    <>
      <article id={'post-' + props.id} className={'PostList post-' + props.id}>
        <div className="postThumb">
          <div className="media">
            <Link href={props.permalink}>
              <a>
                <img
                  src={props.thumbnail}
                  alt={props.title}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/static/img/photo.svg'
                  }}
                  width="60"
                  height="60"
                  loading="lazy"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="postDetail">
          <h4>
            <Link href={props.permalink}>
              <a title={props.title}>{props.title}</a>
            </Link>
          </h4>
          {props.postdate != null && <div className="date">{props.postdate}</div>}
        </div>
      </article>

      <style jsx>{`
        .PostList {
          display: flex;
          margin-bottom: 25px;
        }
        .postThumb {
          min-width: 85px;
          max-width: 85px;
          margin-right: 15px;
        }
        .postDetail {
          h4 {
            margin: 0;
            font-size: 16px;
            line-height: 20px;
          }
        }
        .media {
          width: 100%;
          height: 60px;
          overflow: hidden;
          border-radius: 7px;
          background: #e0e0e0;
          img {
            object-fit: cover;
            height: 100%;
            width: 100%;
          }
        }
        .date {
          font-size: 12px;
          color: #6d6d6d;
          margin-top: 5px;
        }
      `}</style>
    </>
  )
}
