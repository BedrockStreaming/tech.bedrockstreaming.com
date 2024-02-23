import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <time className={"uppercase"} dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;
