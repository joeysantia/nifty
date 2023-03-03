export default function popupListener(popup, target, callback) {
    if (!popup.contains(target)) {
        callback()
    }
}