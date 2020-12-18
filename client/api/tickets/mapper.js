module.exports = (ticket, meeting = ticket.meeting) => ({
    id: ticket.id,
    title: ticket.title,
    plan: ticket.plan,
    price: ticket.price,
    meeting: meeting ? {
        id: meeting.id,
        title: meeting.title
    } : undefined,
    isActive: ticket.isActive
});