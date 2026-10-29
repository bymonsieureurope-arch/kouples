import { getImageProps } from "next/image";
const sheets = {
  manager: {
    src: "/managers-portraits.png",
    width: 1983,
    height: 793,
    columns: 5,
    rows: 2,
  },
  couple: {
    src: "/couples-portraits.png",
    width: 1536,
    height: 1024,
    columns: 2,
    rows: 2,
  },
};
/** Each generated portrait is framed from a shared local sheet, without distorting faces. */
export function Portrait({
  kind,
  index,
  alt,
  className = "",
}: {
  kind: keyof typeof sheets;
  index: number;
  alt: string;
  className?: string;
}) {
  const sheet = sheets[kind],
    width = sheet.width / sheet.columns,
    height = sheet.height / sheet.rows;
  const source = getImageProps({
    src: sheet.src,
    alt: "",
    width: Math.round(sheet.width / 2),
    height: Math.round(sheet.height / 2),
    quality: 75,
  }).props.src;
  return (
    <svg
      className={"portrait " + className}
      viewBox={`${(index % sheet.columns) * width} ${Math.floor(index / sheet.columns) * height} ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
    >
      <image
        href={source}
        x="0"
        y="0"
        width={sheet.width}
        height={sheet.height}
      />
    </svg>
  );
}
