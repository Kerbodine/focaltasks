export default function Shortcut({ shortcut }) {
  return (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) && (
      <span
        className={`rounded-md bg-gray-200 px-1 py-0.5 text-xs font-semibold text-gray-600 group-hover:bg-transparent group-hover:text-white`}
      >
        {shortcut}
      </span>
    )
  );
}
