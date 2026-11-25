/* eslint-disable @next/next/no-img-element -- 구글/카카오/Supabase 등 외부 도메인 이미지라 일반 img 사용 */
export default function Avatar({
  src,
  name,
  size = 32,
}: {
  src?: string | null;
  name?: string | null;
  size?: number;
}) {
  const style = { width: size, height: size, fontSize: size * 0.42 };
  if (src) {
    return (
      <img
        src={src}
        alt=""
        referrerPolicy="no-referrer"
        style={style}
        className="shrink-0 rounded-full bg-muted object-cover"
      />
    );
  }
  return (
    <span
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white"
      aria-hidden
    >
      {(name?.trim()[0] ?? "?").toUpperCase()}
    </span>
  );
}
