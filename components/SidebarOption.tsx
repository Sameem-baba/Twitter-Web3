import { Dispatch, SetStateAction } from 'react'
import { IconType } from 'react-icons'

const style = {
  wrapper: `w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#333c45] transition-all hover:duration-200 hover:ease-in-out`,
  iconContainer: `text-xl xl:mr-4`,
  textGeneral: `font-medium hidden xl:block`,
  textActive: `font-bold hidden xl:block`,
}

interface SidebarOptionProps {
  text: String
  Icon: IconType
  isActive?: Boolean
  setSelected?: Dispatch<SetStateAction<String>>
  redirect?: URL | string
}

const SidebarOption = ({
  text,
  Icon,
  isActive,
  setSelected,
  redirect,
}: SidebarOptionProps) => {
  const handleClick = (buttonText = text) => {
    if (buttonText !== 'More' && setSelected) {
      setSelected(buttonText)
    }
  }
  return (
    <div className={style.wrapper} onClick={() => handleClick(text)}>
      <div className={style.iconContainer}>
        <Icon />
      </div>
      <div className={`${isActive ? style.textActive : style.textGeneral}`}>
        {text}
      </div>
    </div>
  )
}

export default SidebarOption
