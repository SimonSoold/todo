interface HamburgerMenuProps {
  menuItems?: MenuItem[]
  disabled: boolean
}
interface MenuItem {
  children: any
  handleClick: () => void
  condition: boolean
}
export const closeHamburgerMenu = () => document.getElementById("hamburger")?.removeAttribute("open");
export const HamburgerMenu = ({ menuItems, disabled }: HamburgerMenuProps) => {
  return (
    <details
      id="hamburger"
    >
        <summary style={{pointerEvents: disabled ? "none" : "auto"}}>
            ☰
        </summary>
        <ul>
          {
            menuItems
            ?
            menuItems.map(({children, handleClick, condition}:MenuItem, index: number) => condition ? <li key={index} onClick={handleClick}>{children}</li> : null)
            :
            null
          }
        </ul>
    </details>
  )
};
export default HamburgerMenu