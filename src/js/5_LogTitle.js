function handleButtonLog(ev) {
	ev.preventDefault();
	for (const eachResult of data) {
		console.log(eachResult.title);
	}
}

buttonLog.addEventListener("click", handleButtonLog);
