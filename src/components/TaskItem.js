export default function TaskItem({ title }) {
  return (
    <div className="flex h-10 w-full items-center gap-2 px-2">
      <div className="h-6 w-6 rounded-md border-2 border-gray-300"></div>
      <p className="font-medium text-gray-500">{title}</p>
    </div>
  );
}
