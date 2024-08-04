import { COLOR } from "/constants";

type Props = {
  to: string
  children: any
  disabled?: boolean
  hover?: boolean
  number?: boolean
};

const PaginationItem = ({ to, disabled = false, hover = false, number = false, children }: Props) => {
  return (
    <li>
      {
        disabled ? (
          <span
            className={[
              "flex",
              "aspect-square",
              "w-8",
              "items-center",
              "justify-center",
              "rounded-full",
              number ? `backdrop-brightness-90` : ``,
            ].join(' ')}
            style={{ color: COLOR.textColor.primary, textDecoration: "none", fontSize: '14px' }}
          >
            { children }        
          </span>
        ) : (
          <a
          className={[
            "flex",
            "aspect-square",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "cursor-pointer",
            hover ? `hover:backdrop-brightness-95` : ``,
          ].join(' ')}
            style={{ color: COLOR.textColor.primary, textDecoration: "none", fontSize: '14px' }}
            href={disabled ? "" : to}
          >
            { children }
          </a>
        )
      }
    </li>
  )
}  

export default PaginationItem
