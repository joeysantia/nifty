export function getSubtotal(items) {
    return items.reduce((prev, cur) => prev + (cur.quantity * cur.price), 0)
}

export function getTotal(items) {
    return items.reduce((prev, cur) => prev + (cur.quantity * cur.price + (cur.shipping || 0)), 0)
}