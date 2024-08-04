import { convertDateFormat } from "/libs/convertDateFormat";
import type { CategoryItem, TagItem } from "/types";

type Props = {
  title: string;
  publishedAt: string;
  tagsOfPost: TagItem[];
  categoryOfPost: CategoryItem;
  imageUrl: string;
  imageAlt: string;
};

const Caption = (props: Props) => {
  return (
    <div>
      <div className="mb-10 flex justify-center">
        <p color="text.secondary">
          {convertDateFormat(props.publishedAt)}
        </p>
      </div>
      <div className="mt-10 mb-4 flex justify-center">
        <p className="font-title font-bold text-slate-600">
          {props.title}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div
            className="mb-10 space-y-2"
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
          >
            <a href={`/category/${props.categoryOfPost._id}`}>
              <button
                className="mr-2"
                style={{ textTransform: "none", display: "flex" }}
              >
                {props.categoryOfPost.displayedName}
              </button>
            </a>
            {
              props.tagsOfPost.map((tag, index) => (
                <a
                  href={`/tag/${tag._id}`}
                  className="mr-2 text-sm"
                  style={{ textTransform: "none", display: "flex" }}
                  key={index}
                >
                  <span className="material-icons">local_offer</span>
                  {tag.tag}
                </a>
              ))
            }
          </div>
          <img src={props.imageUrl} alt={props.imageAlt} />
        </div>
      </div>
    </div>
  )
}

export default Caption
