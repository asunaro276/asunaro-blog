import { COLOR } from "/constants";
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
        <p style={{ color: COLOR.text.secondary }}>
          {convertDateFormat(props.publishedAt)}
        </p>
      </div>
      <div className="mt-10 mb-4 flex">
        <p className="font-title font-bold text-xl md:text-2xl" style={{ color: COLOR.text.primary }}>
          {props.title}
        </p>
      </div>
      <div
        className="mb-10 space-y-2 gap-2"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        <a href={`/category/${props.categoryOfPost._id}`}>
          <button
            className="mr-2 border py-[4px] px-[10px] rounded text-xs hover:brightness-[0.3] transition"
            style={{ textTransform: "none", display: "flex", color: COLOR.text.secondary, borderColor: COLOR.text.secondary + '60' }}
          >
            {props.categoryOfPost.displayedName}
          </button>
        </a>
        {
          props.tagsOfPost.map((tag, index) => (
            <a
              href={`/tag/${tag._id}`}
              className="text-sm hover:brightness-[0.4] transition"
              style={{ textTransform: "none", display: "flex", marginTop: '0px', color: COLOR.text.secondary }}
              key={index}
            >
              <span className="material-icons" style={{ fontSize: '18px' }}>local_offer</span>
              {tag.tag}
            </a>
          ))
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={props.imageUrl} alt={props.imageAlt} />
      </div>
    </div>
  )
}

export default Caption
