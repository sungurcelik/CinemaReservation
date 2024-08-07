const container = document.querySelector('.container')

const infoText = document.querySelector('.infoText')
const movieList = document.querySelector('#movie')
const seatCount = document.getElementById('count')
const totalAmount = document.getElementById('amount')

const seats = document.querySelectorAll('.seat:not(.reserved)')

const saveToDb = (index) => {
    localStorage.setItem('seatsIndex', JSON.stringify(index))
    //Movies data save
    localStorage.setItem('movieIndex', JSON.stringify(movieList.selectedIndex))
}

const getFromDb = () => {
    const dbSelectedSeats = JSON.parse(localStorage.getItem('seatsIndex'))
    if (dbSelectedSeats != null) {
        seats.forEach((seat, index) => {
            if (dbSelectedSeats.includes(index)) {
                seat.classList.add('selected')
            }
        })
    }
    const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'))
    movieList.selectedIndex = dbSelectedMovie
}

getFromDb()

const createIndex = () => {
    let allSeatsArray = []
    seats.forEach((seat) => {
        allSeatsArray.push(seat)
    })

    const allSelectedSeatsArray = []
    const allSelectedSeats = container.querySelectorAll('.seat.selected')

    allSelectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat)
    })

    const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
        return allSeatsArray.indexOf(selectedSeat)
    })
    saveToDb(selectedSeatsIndex)
}

const calculateTotal = () => {
    createIndex()
    let selectedSeatsCount = container.querySelectorAll('.seat.selected').length

    seatCount.innerText = selectedSeatsCount
    totalAmount.innerText = selectedSeatsCount * movieList.value

    if (selectedSeatsCount) {
        // infoText.style.display = 'block'
        infoText.classList.add('open')
    } else {
        // infoText.style.display = 'none'
        infoText.classList.remove('open')
    }
}
calculateTotal()
container.addEventListener('click', (e) => {
    const clickedSeat = e.target.offsetParent

    if (clickedSeat.classList.contains('seat')) {
        clickedSeat.classList.toggle('selected')
    }
    calculateTotal()
})

movieList.addEventListener('change', () => {
    calculateTotal()
})