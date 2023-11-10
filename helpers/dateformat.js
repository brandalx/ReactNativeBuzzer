export default function formatFirebaseTimestamp(timestamp) {
  const date = new Date(
    timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1000000
  );

  function formatDate(d) {
    return (
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      d.getDate().toString().padStart(2, "0")
    );
  }

  function formatTime(d) {
    return (
      d.getHours().toString().padStart(2, "0") +
      ":" +
      d.getMinutes().toString().padStart(2, "0")
    );
  }

  // +
  //     ":" +
  //     d.getSeconds().toString().padStart(2, "0")

  const today = new Date();
  const dateStr = formatDate(date);
  const todayStr = formatDate(today);

  if (dateStr === todayStr) {
    return formatTime(date);
  } else {
    return dateStr + " " + formatTime(date);
  }
}
