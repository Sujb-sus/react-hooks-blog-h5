export default function SvgIcon(prop) {
  const iconName = `#${prop.name}`;
  return (
    <>
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={iconName}></use>
      </svg>
    </>
  );
}
