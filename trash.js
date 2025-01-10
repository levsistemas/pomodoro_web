function laught(){
    if (min > 59) {
        hs++
        min = 0
        if (hs >= 1 && hs <= 10) {
            if (min <= 9) {
                if (seg <= 9) {
                    TIMER.textContent = `0${hs}:0${min}:0${seg}`
                    console.log("HOLA_1")
                } else {
                    TIMER.textContent = `0${hs}:0${min}:${seg}`
                    console.log("HOLA_2")
                }
            } else {
                if (seg <= 9) {
                    TIMER.textContent = `0${hs}:${min}:0${seg}`
                    console.log("HOLA_3")
                } else {
                    TIMER.textContent = `0${hs}:${min}:${seg}`
                    console.log("HOLA_4")
                }
            }
        } else {
            if (min <= 9) {
                if (seg <= 9) {
                    TIMER.textContent = `${hs}:0${min}:0${seg}`
                } else {
                    TIMER.textContent = `${hs}:0${min}:${seg}`
                }
            } else {
                if (seg <= 9) {
                    TIMER.textContent = `${hs}:${min}:0${seg}`
                } else {
                    TIMER.textContent = `${hs}:${min}:${seg}`
                }
            }
            if (seg <= 9) {
                TIMER.textContent = `${hs}:0${min}:0${seg}`
            } else {
                TIMER.textContent = `${hs}:0${min}:${seg}`
            }
        }

        if (min <= 9) {
            if (seg <= 9) {
                TIMER.textContent = `0${hs}:0${min}:0${seg}`
                console.log("HOLA_5")
            } else {
                TIMER.textContent = `0${hs}:0${min}:${seg}`
                console.log("HOLA_6")
            }
        } else {
            if (seg <= 9) {
                TIMER.textContent = `0${hs}:${min}:0${seg}`
                console.log("HOLA_7")
            } else {
                TIMER.textContent = `0${hs}:${min}:${seg}`
                console.log("HOLA_8")
            }
        }
        if (seg <= 9) {
            TIMER.textContent = `0${hs}:0${min}:0${seg}`
            console.log("HOLA_9")
        } else {
            TIMER.textContent = `0${hs}:0${min}:${seg}`
            console.log("HOLA_10")
        }
    }
}