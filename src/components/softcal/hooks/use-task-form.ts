import { useMemo, useState } from "react";

export function useTaskForm() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("one-off");
  const [noteRef, setNoteRef] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [eventRef, setEventRef] = useState("");

  const state = useMemo(
    () => ({
      title,
      notes,
      frequency,
      noteRef,
      orderRef,
      eventRef,
    }),
    [eventRef, frequency, noteRef, notes, orderRef, title]
  );

  const actions = {
    setTitle,
    setNotes,
    setFrequency,
    setNoteRef,
    setOrderRef,
    setEventRef,
  };

  return { state, actions };
}
