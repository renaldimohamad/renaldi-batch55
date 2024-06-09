class Testimonials {
    constructor(image, author, contens) {
        this.image = image
        this.author = author
        this.contens = contens
    }

    html() {
         return `
        <div class="container-card">
        <img src="${this.image}" alt="">
        <p class="content">${this.contens}</p>
        <p class="author">-${this.author}</p>
        </div>
    </div>`
    }
}

const testimonial1 = new Testimonials("https://images.pexels.com/photos/7545185/pexels-photo-7545185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load","Every page is a new journey", "Antonio Elz")
const testimonial2 = new Testimonials("https://images.pexels.com/photos/8929332/pexels-photo-8929332.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", "Bury yourself in the melody,", "Agatha Christie")
const testimonial3 = new Testimonials("https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "digital world, one click at a time", "Surya Elidanto")

const testimonial = [testimonial1, testimonial2, testimonial3]
console.log(testimonial);

let testimonialHTML = ''
for(let index = 0; index < testimonial.length; index++) {
    testimonialHTML += testimonial[index].html()
}

document.getElementById('testimonials').innerHTML = testimonialHTML

