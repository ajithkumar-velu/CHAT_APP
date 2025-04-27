export const SimpleDateMonthDay = (date) => {
	return new Date(date)
		.toDateString()
		.split(" ")
		.slice(0, 3)
		.reverse()
		.join("-");
};
export const simpleDate = (str)=>{
  const date = new Date(str)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth()+1).padStart(2, '0')
  const year  = date.getFullYear()
  return `${day}-${month}-${year}`
}
export const SimpleTime = (time) => {
	const date = new Date(time);
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
	const strTime = `${hours}:${minutesStr} ${ampm}`;
	return strTime;
};
export const SimpleDateAndTime = (dateTime) => {
	return (
		new Date(dateTime)
			.toDateString()
			.split(" ")
			.slice(1, 3)
			.reverse()
			.join("-") +
		"-" +
		new Date(dateTime).toDateString().split(" ").slice(-1) +
		" " +
		SimpleTime(dateTime)
	);
};

export const groupMessagesByDate = (messages) => {
    const groupedMessages = {};
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
  
    messages?.forEach((message) => {
      const messageDate = new Date(message.createdAt);
  
      let dateLabel;
      if (messageDate.toDateString() === today.toDateString()) {
        dateLabel = 'Today';
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        dateLabel = 'Yesterday';
      } else {
        dateLabel = messageDate.toLocaleDateString(); // Format as "MM/DD/YYYY" or locale
      }
  
      if (!groupedMessages[dateLabel]) {
        groupedMessages[dateLabel] = [];
      }
      groupedMessages[dateLabel].push(message);
    });
  
    return groupedMessages;
  };
  
  export function chatMessageTime(data) {
    return new Date(data).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}