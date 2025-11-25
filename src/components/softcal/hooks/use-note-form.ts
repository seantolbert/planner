import { useMemo, useState } from "react";

const defaultLists = ["Inbox", "Work", "Personal"];

export function useNoteForm(initialLists: string[] = defaultLists) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [list, setList] = useState(initialLists[0] ?? "Inbox");
  const [listOptions, setListOptions] = useState<string[]>(
    () => [...initialLists]
  );
  const [showListModal, setShowListModal] = useState(false);
  const [newListName, setNewListName] = useState("");

  const openListModal = () => setShowListModal(true);
  const closeListModal = () => setShowListModal(false);

  const handleAddList = () => {
    const name = newListName.trim();
    if (!name) return;
    setListOptions((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setList(name);
    setNewListName("");
    closeListModal();
  };

  const state = useMemo(
    () => ({
      title,
      content,
      link,
      list,
      listOptions,
      showListModal,
      newListName,
    }),
    [content, link, list, listOptions, newListName, showListModal, title]
  );

  const actions = {
    setTitle,
    setContent,
    setLink,
    setList,
    openListModal,
    closeListModal,
    setNewListName,
    handleAddList,
  };

  return { state, actions };
}
