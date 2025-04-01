import React from 'react'

function Alert(props) {
    const changeAlertType = (word) => {
        if (word === "success") {
            return "Info: "
        } else if (word === "danger") {
            return "Error: "
        }
    }

    return (
        <div style={{ height: '70px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{changeAlertType(props.alert.type)}</strong>{props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert