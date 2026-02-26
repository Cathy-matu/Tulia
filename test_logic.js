const m = { start: "09:00", date: "2026-02-26", title: "Test" };
const hours = Array.from({ length: 14 }, (_, i) => i + 7);
const viewDate = "2026-02-26";
const dayMeetings = [m].filter(m => m.date === viewDate).sort((a, b) => a.start.localeCompare(b.start));
console.log("dayMeetings:", dayMeetings);
hours.forEach(hour => {
    const hourMeetings = dayMeetings.filter(m => parseInt(m.start) === hour);
    if (hourMeetings.length > 0) {
        console.log(`Hour ${hour} has`, hourMeetings);
    }
});
