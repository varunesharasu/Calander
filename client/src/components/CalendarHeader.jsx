const CalendarHeader = ({ date, onPrev, onNext }) => (
  <div className="flex justify-between items-center">
    <button onClick={onPrev} className="text-primary font-bold text-lg">&lt;</button>
    <h2 className="text-xl font-bold text-lightText">{date.format("MMMM YYYY")}</h2>
    <button onClick={onNext} className="text-primary font-bold text-lg">&gt;</button>
  </div>
);

export default CalendarHeader;
