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
      <a
      className={[
        "flex",
        "aspect-square",
        "w-8",
        "items-center",
        "justify-center",
        "rounded-full",
        hover ? `hover:backdrop-brightness-95` : ``,
        disabled && number ? `backdrop-brightness-90` : ``,
        disabled ? "cursor-default" : "cursor-pointer"
      ].join(' ')}
        style={{ color: COLOR.textColor.primary, textDecoration: "none", fontSize: '14px' }}
        href={disabled ? "" : to}
        onClick={(event) => disabled && event.preventDefault()}
        >{ children }</a>
    </li>
  )
}  

export default PaginationItem
