import Link from "next/link";

function NewsItem({ key, title, link, content, date }) {
  return (
    <Link
      href={link}
      className="bg-white rounded-2xl p-2 w-[300px] h-[350px] shadow border-t-4 border-primary-500"
    >
      <div className="text-xl font-extrabold p-3">{title}</div>
      <div className="p-3">{date.slice(0, 16)}</div>
      <div className="p-3">{content}</div>
    </Link>
  );
}

export default NewsItem;
