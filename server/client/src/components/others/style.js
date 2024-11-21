export function containerStyle(mobile) {
    const style = {
        margin: 'auto',
        padding: '10px',
        border: '2px solid red',
        width: mobile?'95vw':'80vw',
    }

    return style
}

export function heading() {
    const style = {
        margin: 'auto',
        textAlign: 'center',
        color: 'blue',
        padding: '15px'
    }

    return style
}