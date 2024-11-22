export function containerStyle(mobile) {
    const style = {
        margin: 'auto',
        marginTop:'40px',
        marginBottom:'40px',
        borderRadius:"25px",
        padding: '10px',
        border: '2px solid #2b3236',
        width: mobile?'95vw':'60vw',
        backgroundColor:'#0f1113'
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