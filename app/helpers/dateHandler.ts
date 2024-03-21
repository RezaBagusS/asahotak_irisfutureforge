export const formatDate = (date: Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }