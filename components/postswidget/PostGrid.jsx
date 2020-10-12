
import Link from 'next/link'

/**
 * PostGrid
 * @param {*} props id, title, thumbnail, permalink
 */
export default function PostGrid(props) {
    let thumbnail = `${props.thumbnail}&h=140`
    let catLink = props.categories.slug
    let catName = props.categories.name
    return (
        <>
            <article className={'post-grid post-'+props.id}>
                <div className="post-grid--thumb">
                    <Link href={catLink}><a className="cat-badge">{catName}</a></Link>
                    <Link href={props.permalink}><a><img src={thumbnail} alt={props.title} width="60" height="60" loading="lazy"/></a></Link>
                </div>
                <div className="postDetail">
                    <h4><Link href={props.permalink}><a>{props.title}</a></Link></h4>
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
                            background: #4F4F4F;
                            color: #fff;
                            display: inline-block;
                            padding: 0 5px;
                        }
                        
                        img {
                            object-fit: cover!important;
                            width: 100%!important;
                            height: 100%!important;
                        }
                    }
                    h4 {
                        font-size: 16px;
                        margin-top: 10px;
                    }
                }
            `}</style>
        </>
    )
}