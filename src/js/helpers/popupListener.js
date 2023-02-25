export default function popupListener(popup, e, callback) {
    if (!popup.contains(e)) {
        callback()
    }
}