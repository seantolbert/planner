import { useMemo, useState } from "react";

export function useEventForm() {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [notes, setNotes] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [color, setColor] = useState("#7cc5ff");
  const [link, setLink] = useState("");

  const state = useMemo(
    () => ({
      title,
      start,
      end,
      notes,
      allDay,
      color,
      link,
    }),
    [allDay, color, end, link, notes, start, title]
  );

  const actions = {
    setTitle,
    setStart,
    setEnd,
    setNotes,
    setAllDay,
    setColor,
    setLink,
  };

  return { state, actions };
}
