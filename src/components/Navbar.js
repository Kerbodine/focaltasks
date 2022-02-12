export default function Navbar({ navbar }) {
  return (
    <div
      className={`${
        navbar ? `w-0 border-r-2 xs:w-[220px]` : "w-0 border-0"
      } content-box transition-width relative h-full overflow-hidden border-gray-200 bg-gray-50 duration-200 ease-in-out`}
    >
      <div className="h-full w-[220px]">
        <div className="box-content h-12 w-full border-b-2 border-gray-200"></div>
      </div>
    </div>
  );
}
